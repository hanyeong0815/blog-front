import { FunctionComponent as FC } from "react";

interface UnSginWarningPageProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignInOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UnSginWarningPage: FC<UnSginWarningPageProps> = (props) => {
  const { setIsOpen, setIsSignInOpen } = props;

  return (
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      <p className="text-6xl font-bold text-center">
        로그인 후 이용가능합니다.
      </p>
      <button
        onClick={() => {
          setIsOpen(false);
          setIsSignInOpen(true);
        }}
        className="border-4 font-bold text-4xl p-4 w-10/12 rounded-xl bg-blue-300"
      >
        로그인하기
      </button>
    </div>
  );
};

export default UnSginWarningPage;
