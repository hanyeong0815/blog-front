import authUser from "@models/users/AuthUser";
import useAuth from "@store/auth/useAuth";
import { FunctionComponent as FC, useEffect } from "react";
import { Link } from "react-router-dom";
import blogLogo from "@assets/img/blog-log.svg";

interface HomeHeadProps {
  setIsSignIpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  authUser: authUser | null;
}

const HomeHead: FC<HomeHeadProps> = (props) => {
  const { setIsSignIpOpen, setIsLoginOpen, isAuthenticated, authUser } = props;
  const { logout } = useAuth();

  useEffect(() => {}, [isAuthenticated, authUser]);

  return (
    <div className="flex flex-row justify-between bg-header-bg min-w-full font-bold">
      <div className="pl-7">
        <Link to="/">
          <img src={blogLogo} />
        </Link>
      </div>
      {!isAuthenticated && (
        <div className="flex flex-row gap-8 justify-center items-center pr-10">
          <Link
            to=""
            onClick={() => {
              setIsLoginOpen(true);
            }}
          >
            로그인
          </Link>
          <Link
            to=""
            onClick={() => {
              setIsSignIpOpen(true);
            }}
          >
            회원가입
          </Link>
        </div>
      )}
      {isAuthenticated && (
        <div className="flex flex-row gap-8 justify-center items-center pr-10">
          <p>{authUser?.nickname}</p>
          <Link
            to=""
            onClick={() => {
              logout();
            }}
          >
            로그아웃
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeHead;
