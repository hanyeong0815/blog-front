import LoginFrom from "@components/modal/auth/LoginFrom";
import SignUpFrom from "@components/modal/auth/SignUpFrom";
import Modal from "@styles/modal";
import { FunctionComponent as FC, useLayoutEffect, useState } from "react";
import HomeHead from "./HomeHead";
import useAuth from "@store/auth/useAuth";
import UnSginWarningPage from "@components/modal/auth/UnSginWarningPage";
import api from "@/api/AxiosInstance";
import CreateDomainModal from "@components/modal/domain/CreateDomainModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const {
    isAuthenticated,
    authUser,
    isUnSignWarningOpen,
    logout,
    setIsUnSignWarningOpen,
  } = useAuth();

  const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isDomainCreateOpen, setIsDomainCreateOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (isAuthenticated) {
      const url = "http://localhost:8080/member/is-auth";
      api
        .get(url)
        .then(({ data }) => data)
        .then((response: boolean) => {
          if (!response) {
            logout;
          }
        });
    }
  }, []);

  return (
    <div>
      <Modal isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen}>
        <SignUpFrom setIsOpen={setIsSignUpOpen} />
      </Modal>
      <Modal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen}>
        <LoginFrom
          setIsOpen={setIsLoginOpen}
          setIsSignUpOpen={setIsSignUpOpen}
        />
      </Modal>
      <Modal
        isOpen={isUnSignWarningOpen}
        setIsOpen={setIsUnSignWarningOpen}
        className="m-72"
      >
        <UnSginWarningPage
          setIsOpen={setIsUnSignWarningOpen}
          setIsSignInOpen={setIsLoginOpen}
        />
      </Modal>
      <Modal
        isOpen={isDomainCreateOpen}
        setIsOpen={setIsDomainCreateOpen}
        className="m-80"
      >
        <CreateDomainModal setIsOpen={setIsDomainCreateOpen} />
      </Modal>
      <HomeHead
        setIsLoginOpen={setIsLoginOpen}
        setIsSignIpOpen={setIsSignUpOpen}
        setIsDomainCreateOpen={setIsDomainCreateOpen}
        isAuthenticated={isAuthenticated}
        authUser={authUser}
      />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
