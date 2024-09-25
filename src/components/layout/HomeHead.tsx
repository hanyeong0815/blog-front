import authUser from "@models/users/AuthUser";
import useAuth from "@store/auth/useAuth";
import {
  FunctionComponent as FC,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import blogLogo from "@assets/img/blog-log.svg";
import api from "@/api/AxiosInstance";
import domainDto from "@models/users/Domain";

interface HomeHeadProps {
  setIsSignIpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  authUser: authUser | null;
}

const HomeHead: FC<HomeHeadProps> = (props) => {
  const { setIsSignIpOpen, setIsLoginOpen, isAuthenticated, authUser } = props;
  const { domain } = useParams();
  const navi = useNavigate();
  const { logout } = useAuth();

  const [findDomain, setFindDomain] = useState<string | null>();

  useEffect(() => {}, [isAuthenticated, authUser]);

  useLayoutEffect(() => {
    if (!isAuthenticated) return;

    const domainUrl = `http://localhost:8090/domain/${authUser?.username}`;

    api
      .get(domainUrl)
      .then(({ data }) => data)
      .then((response: domainDto | null) => {
        setFindDomain(response?.domain ?? null);
      });
  }, []);

  return (
    <div className="flex flex-row justify-between bg-header-bg min-w-full font-bold">
      <div className="pl-7">
        <Link to="/home">
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
          {findDomain !== null ? (
            domain === findDomain ? (
              <Link
                to={`/${domain}/post`}
                className="px-4 py-1 border rounded-3xl bg-main"
              >
                포스트
              </Link>
            ) : (
              <Link
                to={`/${findDomain}`}
                className="px-4 py-1 border rounded-3xl bg-main"
              >
                내 블로그
              </Link>
            )
          ) : (
            <button className="px-4 py-1 border rounded-3xl bg-green-400">
              블로그 만들기
            </button>
          )}
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
