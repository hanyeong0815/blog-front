import authUser from "@models/users/AuthUser";
import loginRes from "@models/users/dto/LoginDto";
import ContextCallbackOption from "@models/users/dto/api/ContextCallbackOption";
import StorageManager from "@utils/common/storage";
import create from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  authUser: authUser | null;
  accessToken: string | null;
  isUnSignWarningOpen: boolean;

  setAuthUser: (loginRes: loginRes) => void;
  setJwtToken: (accessToken: string, refreshToken: string) => void;
  logout: (option?: ContextCallbackOption) => void;
  setIsUnSignWarningOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useAuth = create<AuthState>((set, get) => ({
  isAuthenticated:
    !!StorageManager.getItem("username") &&
    !!StorageManager.getItem("nickname"),
  authUser: {
    username: StorageManager.getItem("username") ?? null,
    nickname: StorageManager.getItem("nickname") ?? null,
  },
  accessToken: StorageManager.getItem("accessToken") ?? null,
  isUnSignWarningOpen: false,

  setAuthUser: (loginRes) => {
    StorageManager.setItem("username", loginRes.username);
    StorageManager.setItem("nickname", loginRes.nickname);
    StorageManager.setItem("accessToken", loginRes.jwtTokenPair.accessToken);
    StorageManager.setItem("refreshToken", loginRes.jwtTokenPair.refreshToken);

    set({
      authUser: {
        username: loginRes.username,
        nickname: loginRes.nickname,
      },
      isAuthenticated: true,
      accessToken: loginRes.jwtTokenPair.accessToken,
    });
  },
  setJwtToken(accessToken, refreshToken) {
    StorageManager.setItem("accessToken", accessToken);
    StorageManager.setItem("refreshToken", refreshToken);

    set({ accessToken: accessToken });
  },
  logout: (option) => {
    StorageManager.clearAllUnsticky();
    set({ isAuthenticated: false, authUser: null });
    option?.success && option.success(true);
  },
  setIsUnSignWarningOpen: (status: React.SetStateAction<boolean>) => {
    set((state) => ({
      isUnSignWarningOpen:
        typeof status === "function"
          ? status(state.isUnSignWarningOpen)
          : status,
    }));
  },
}));

export default useAuth;
