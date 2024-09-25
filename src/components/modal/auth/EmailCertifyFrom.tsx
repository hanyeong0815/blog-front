import Modal from "@styles/modal";
import {
  FunctionComponent as FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import EmailCertiFyTimeOut from "./EmailCertifyTimeOut";
import axios from "axios";

interface EmailCertifyFromProps {
  email: string;
  setHasEmailCertify: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailCertifyFrom: FC<EmailCertifyFromProps> = (props) => {
  const { email, setIsOpen, setHasEmailCertify } = props;

  const certifyCodeRef = useRef<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 300초 = 5분
  const [isEmailCertifyTimeOutOpen, setIsEmailCertifyTimeOutOpen] =
    useState<boolean>(false);

  const codeRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const certify = useCallback(() => {
    if (codeRef.current?.value === null) return;

    const url = "http://localhost:8080/member/invitation-code/certify";
    const invitationCode = codeRef.current?.value;

    axios
      .post(url, { invitationCode, email })
      .then(({ data }) => data)
      .then((response: boolean) => {
        setHasEmailCertify(response);
        setIsOpen(false);
      })
      .catch((err) => {
        console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n");
      });
  }, []);

  useEffect(() => {
    // 1초마다 timeLeft를 1씩 감소시키는 타이머 설정
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      // 타이머가 0이 되면 클리어
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        setIsEmailCertifyTimeOutOpen(true);
      }
    }

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft]);

  // 분과 초를 계산
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full h-full flex flex-col gap-8 justify-center items-center">
      <Modal
        isOpen={isEmailCertifyTimeOutOpen}
        setIsOpen={setIsEmailCertifyTimeOutOpen}
        className="m-72"
      >
        <EmailCertiFyTimeOut
          setIsOpen={setIsEmailCertifyTimeOutOpen}
          setIsEmailSertifyOpen={setIsOpen}
        />
      </Modal>
      <h1 className="font-bold text-5xl items-start">이메일 이증</h1>
      <div className="flex flex-col gap-1">
        <input
          type="text"
          ref={codeRef}
          className="text-6xl p-4 rounded-lg border-2 text-center"
          spellCheck={false}
        />
        <p className="text-gray-400 pt-2">
          이메일이 오지 않은 경우&nbsp;
          <a className="text-blue-600 underline">[이곳]</a>을 눌러주요.
        </p>
        <p className="text-blue-700 underline">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </p>
      </div>
      <button
        onClick={certify}
        className="border-4 px-3 py-8 w-10/12 items-center text-6xl font-bold rounded-lg bg-sky-300"
      >
        이메일 인증
      </button>
    </div>
  );
};

export default EmailCertifyFrom;
