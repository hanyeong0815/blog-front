import { FunctionComponent as FC } from "react";

interface EmailCertifyTimeOutPorps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEmailSertifyOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailCertiFyTimeOut: FC<EmailCertifyTimeOutPorps> = (props) => {
  const { setIsOpen, setIsEmailSertifyOpen } = props;

  return (
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      <p className="text-6xl font-bold text-center">
        이메일 인증 시간이
        <br /> 초과되었습니다
      </p>
      <button
        onClick={() => {
          setIsOpen(false);
          setIsEmailSertifyOpen(false);
        }}
        className="border-4 font-bold text-4xl p-4 w-10/12 rounded-xl bg-blue-300"
      >
        돌아가기
      </button>
    </div>
  );
};

export default EmailCertiFyTimeOut;
