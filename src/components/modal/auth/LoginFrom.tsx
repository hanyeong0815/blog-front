import loginRes from "@models/users/dto/LoginDto";
import useAuth from "@store/auth/useAuth";
import axios from "axios";
import {
  FunctionComponent as FC,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface LoginFromProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginFrom: FC<LoginFromProps> = (props) => {
  const { setIsOpen, setIsSignUpOpen } = props;
  const { setAuthUser } = useAuth();

  const defaultButtonStyle = "px-3 py-4 text-3xl border-4 rounded-lg w-11/12";

  const [loginErrorSwitch, setLoginErrorSwitch] = useState<boolean | null>(
    null
  );
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(
    null
  );

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const pressEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter") {
      setLoginErrorSwitch(false);
      login();
    }
  };

  const login = useCallback(() => {
    if (!usernameRef.current || !passwordRef.current) {
      setLoginErrorSwitch(true);
      setLoginErrorMessage("아이디 혹은 비밀번호를 입력해주세요.");
      return;
    }

    const url = "http://localhost:8080/member/login";

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post(url, { username, password })
      .then(({ data }) => data)
      .then((loginRes: loginRes) => {
        setAuthUser(loginRes);
        setIsOpen(false);
      })
      .catch((err) => {
        setLoginErrorSwitch(true);
        setLoginErrorMessage("아이디 또는 비밀번호를 확인해주세요!");
      });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", pressEsc);
    return () => document.removeEventListener("keydown", pressEsc);
  }, []);

  return (
    <div className="p-8 flex flex-col gap-4 h-full items-center justify-center">
      <h1 className="text-4xl font-bold p-4">로그인</h1>
      <div className="flex flex-col gap-8 p-6 w-8/12 justify-center items-center">
        {loginErrorSwitch && (
          <p className="text-red-500 font-bold">{loginErrorMessage}</p>
        )}
        <input
          type="text"
          ref={usernameRef}
          autoFocus
          className={`${defaultButtonStyle}`}
          placeholder="ID"
          spellCheck={false}
        />
        <input
          type="password"
          ref={passwordRef}
          className={`${defaultButtonStyle}`}
          placeholder="PASSWORD"
          spellCheck={false}
        />
      </div>
      <div className="flex flex-col gap-3 w-8/12 p-4">
        <button
          onClick={() => {
            setLoginErrorSwitch(false);
            login();
          }}
          className="p-4 bg-blue-300 rounded-lg border-2 border-gray-400 font-bold text-xl"
        >
          로그인
        </button>
        <a
          href="#"
          onClick={() => {
            setIsOpen(false);
            setIsSignUpOpen(true);
          }}
          className="text-end text-gray-400 underline font-bold pr-2"
        >
          회원가입
        </a>
      </div>
    </div>
  );
};

export default LoginFrom;
