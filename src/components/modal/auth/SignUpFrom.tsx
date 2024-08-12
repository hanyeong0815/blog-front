import loginRes from "@models/users/dto/LoginDto";
import useAuth from "@store/auth/useAuth";
import Modal from "@styles/modal";
import axios from "axios";
import {
  FunctionComponent as FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdError } from "react-icons/md";
import EmailCertifyFrom from "./EmailCertifyFrom";

interface SignUpFromProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpFrom: FC<SignUpFromProps> = (props) => {
  const { setIsOpen } = props;
  const { setAuthUser } = useAuth();

  // style area
  const defaultDivStyle = "flex flex-col gap-2";
  const defaultTextBoxStyle = "w-3/12 h-9 border-2 rounded-md px-2";
  const defalutButtonStyle = "px-6 py-2 border border-black rounded-lg";
  const selectedButtonStyle = "bg-yellow-300 font-bold border-2";

  // useState area
  const [verifiedUsername, setVerifiedUsername] = useState<string>("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<
    string | null
  >(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);
  const [usernameSwitch, setUsernameSwitch] = useState<boolean | null>(null);
  const [passwordSwitch, setPasswordSwitch] = useState<boolean | null>(null);
  const [passwordCheckErrorSwitch, setPasswordCheckErrorSwitch] = useState<
    boolean | null
  >(null);
  const [genderSwitch, setGenderSwitch] = useState<boolean | null>(null);
  const [genderCheckSwitch, setGenderCheckSwitch] = useState<boolean>(false);
  const [backEmailActivate, setBackEmailActivate] = useState<boolean>(true);
  const [backEmailValue, setBackEmailValue] = useState<string>("");
  const [isEmailCertifyOpen, setIsEmailCertifyOpen] = useState<boolean>(false);
  const [hasEmailCertify, setHasEmailCertify] = useState<boolean>(false);

  // useRef area
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordCheckRef = useRef<HTMLInputElement | null>(null);
  const frontEmailRef = useRef<HTMLInputElement | null>(null);
  const backEmailRef = useRef<HTMLInputElement | null>(null);
  const selectBackEmailRef = useRef<HTMLSelectElement | null>(null);

  // function area
  const selectedValue = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectBackEmailRef.current?.value !== "self") {
      setBackEmailActivate(true);
    } else if (selectBackEmailRef.current.value === "self") {
      setBackEmailActivate(false);
    }

    if (evt.target.value === "select" || evt.target.value === "self") {
      setBackEmailValue("");
    } else {
      setBackEmailValue(evt.target.value);
    }
  };

  const passwordCheckFocusOut = (
    evt: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (passwordSwitch) {
      setPasswordErrorMessage("비밀번호를 확인해주세요.");
      setPasswordCheckErrorSwitch(true);
    } else if (passwordRef.current?.value !== evt.target.value) {
      setPasswordErrorMessage("패스워드가 일치하지 않습니다.");
      setPasswordCheckErrorSwitch(true);
    } else if (passwordRef.current?.value === evt.target.value) {
      setPasswordCheckErrorSwitch(false);
    }
  };

  const certify = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (usernameSwitch || passwordSwitch || passwordCheckErrorSwitch) {
      return;
    }
    if (genderSwitch === null) {
      setGenderCheckSwitch(true);
      return;
    }

    const url = "http://localhost:8080/member/invitation-code/send";
    const email =
      `${frontEmailRef.current?.value}@${backEmailRef.current?.value}`.trim();

    axios
      .post(url, { email })
      .then(({ data }) => data)
      .then((response: boolean) => {
        setIsEmailCertifyOpen(response);
      })
      .catch((err) => {
        console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n");
      });
  }, [genderSwitch]);

  useEffect(() => {
    if (!hasEmailCertify) {
      return;
    }

    const url = "http://localhost:8080/member";

    // variable area
    const username = usernameRef.current?.value.trim();
    const name = nameRef.current?.value;
    const genderType = genderSwitch ? "M" : "F";
    const nickname = nicknameRef.current?.value;
    const password = passwordRef.current?.value.trim();
    const email =
      `${frontEmailRef.current?.value}@${backEmailRef.current?.value}`.trim();
    const roles = ["USER"];

    if (
      username === null ||
      name === null ||
      password === null ||
      email === null
    ) {
      return;
    }

    axios
      .post(url, {
        username,
        name,
        nickname,
        genderType,
        password,
        email,
        roles,
      })
      .then(({ data }) => data)
      .then((signUpRes: loginRes) => {
        setAuthUser(signUpRes);
        setIsOpen(false);
      })
      .catch((err) => {
        console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n");
      });
  }, [hasEmailCertify]);

  return (
    <div>
      <Modal
        isOpen={isEmailCertifyOpen}
        setIsOpen={setIsEmailCertifyOpen}
        className="m-52"
      >
        <EmailCertifyFrom
          email={`${frontEmailRef.current?.value}@${backEmailRef.current?.value}`.trim()}
          setHasEmailCertify={setHasEmailCertify}
          setIsOpen={setIsEmailCertifyOpen}
        />
      </Modal>
      <h1 className="text-xl font-bold">회원가입</h1>
      <div className="flex flex-col pl-4 pt-8 gap-4 overflow-x-scroll">
        <div className={`${defaultDivStyle}`}>
          <p>아이디</p>
          <input
            type="text"
            ref={usernameRef}
            onBlur={async (evt) => {
              if (evt.target.value === "") return;

              const idExp = /[^a-z\d0-9{12,}]/g;
              const idRange = /^.{8,12}$/;
              if (idExp.test(evt.target.value)) {
                setUsernameErrorMessage(
                  "ID에 특수기호를 포함시킬 수 없습니다!!"
                );
                setUsernameSwitch(true);
              } else {
                if (evt.target.value !== verifiedUsername) {
                  const url = `http://localhost:8080/member/verify-username/${evt.target.value}`;
                  const verifyUsername = axios
                    .get(url)
                    .then(({ data }) => data)
                    .then((boo: boolean) => boo);

                  if (await verifyUsername) {
                    setUsernameSwitch(false);
                  } else {
                    setUsernameSwitch(true);
                    setUsernameErrorMessage("이미 사용중인 아이디입니다.");
                  }

                  setVerifiedUsername(evt.target.value);
                }
              }
              if (!idRange.test(evt.target.value)) {
                setUsernameErrorMessage(
                  "ID는 8글자 이상 12글자 이하로 작성해주세요!!"
                );
                setUsernameSwitch(true);
              }
            }}
            className={`${defaultTextBoxStyle}`}
            spellCheck={false}
          />
          {usernameSwitch && (
            <p className="flex flex-row text-red-500 items-center">
              <MdError />
              &nbsp;{usernameErrorMessage}
            </p>
          )}
        </div>
        <div className={`${defaultDivStyle}`}>
          <p>이름</p>
          <input
            type="text"
            className={`${defaultTextBoxStyle} w-2/12`}
            ref={nameRef}
            spellCheck={false}
          />
        </div>
        <div className={`${defaultDivStyle}`}>
          <p>닉네임</p>
          <input
            type="text"
            ref={nicknameRef}
            className={`${defaultTextBoxStyle} w-2/12`}
            spellCheck={false}
          />
        </div>
        <div className={`${defaultDivStyle}`}>
          <p>성별</p>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => {
                setGenderCheckSwitch(false);
                setGenderSwitch(true);
              }}
              className={`${defalutButtonStyle} ${
                genderCheckSwitch
                  ? "border-2 border-red-500"
                  : genderSwitch != null
                  ? genderSwitch
                    ? selectedButtonStyle
                    : ""
                  : ""
              }`}
            >
              남
            </button>
            <button
              onClick={() => {
                setGenderCheckSwitch(false);
                setGenderSwitch(false);
              }}
              className={`${defalutButtonStyle} ${
                genderCheckSwitch
                  ? "border-2 border-red-500"
                  : genderSwitch != null
                  ? genderSwitch
                    ? ""
                    : selectedButtonStyle
                  : ""
              }`}
            >
              여
            </button>
          </div>
          {genderCheckSwitch && (
            <p className="flex flex-row text-red-500 items-center">
              <MdError />
              &nbsp;성별을 선택하여주세요!!!
            </p>
          )}
        </div>
        <div className={`${defaultDivStyle}`}>
          <div className={`${defaultDivStyle}`}>
            <div className={`${defaultDivStyle}`}>
              <p>비밀번호</p>
              <input
                type="password"
                ref={passwordRef}
                required={true}
                onBlur={(evt) => {
                  if (evt.target.value === "") return;

                  const passwordExp = /[A-Za-z\d$@$!%*#?&]/g;
                  const passwordRange = /^.{10,}$/;
                  if (passwordExp.test(evt.target.value)) {
                    setPasswordSwitch(false);
                  } else {
                    setPasswordSwitch(true);
                  }
                  if (!passwordRange.test(evt.target.value)) {
                    setPasswordSwitch(true);
                  }
                }}
                className={`${defaultTextBoxStyle} ${
                  passwordSwitch !== null
                    ? passwordSwitch
                      ? "border-red-600"
                      : "border-green-400"
                    : ""
                }`}
                spellCheck={false}
              />
            </div>
            <div className={`${defaultDivStyle}`}>
              <p>비밀번호 확인</p>
              <div className="flex flex-row gap-2">
                <input
                  type="password"
                  ref={passwordCheckRef}
                  onBlur={passwordCheckFocusOut}
                  className={`${defaultTextBoxStyle} ${
                    passwordCheckErrorSwitch !== null
                      ? passwordCheckErrorSwitch
                        ? "border-red-600"
                        : "border-green-400"
                      : ""
                  }`}
                  spellCheck={false}
                />
                {passwordCheckErrorSwitch && (
                  <p className="flex flex-row text-red-500 items-center">
                    <MdError />
                    &nbsp;{passwordErrorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`${defaultDivStyle}`}>
          <p>이메일</p>
          <div className="flex flex-row gap-2">
            <input
              type="text"
              ref={frontEmailRef}
              className={`${defaultTextBoxStyle} w-2/12`}
              spellCheck={false}
            />
            <p className="items-center">@</p>
            <input
              type="text"
              ref={backEmailRef}
              value={backEmailValue}
              disabled={backEmailActivate}
              onChange={(e) => {
                setBackEmailValue(e.target.value);
              }}
              className={`${defaultTextBoxStyle} w-2/12 ${
                backEmailActivate ? "bg-gray-200" : ""
              }`}
              spellCheck={false}
            />
            <select
              ref={selectBackEmailRef}
              onChange={selectedValue}
              className="w-32 border-2 rounded-md px-2"
            >
              <option value="select">선택하기</option>
              <option value="naver.com">네이버</option>
              <option value="gmail.com">구글</option>
              <option value="kakao.com">카카오</option>
              <option value="self">직접입력</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-center pt-10">
        <button
          onClick={certify}
          className="border-2 bg-blue-300 p-3 rounded-lg"
        >
          회원가입
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="border-2 bg-gray-300 p-3 rounded-lg"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default SignUpFrom;
