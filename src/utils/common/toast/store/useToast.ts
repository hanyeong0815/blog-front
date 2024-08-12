import create from "zustand";

interface ToastState {
  isOpen: boolean;
  children: React.ReactNode;
  currentTimeout: NodeJS.Timeout | null;
  open: (children: React.ReactNode, duration?: number) => void;
}

const useToast = create<ToastState>((set, get) => ({
  isOpen: false,
  children: "This is test",
  currentTimeout: null,
  open: (children, duration) => {
    const state = get();
    if (!!state.currentTimeout) {
      clearTimeout(state.currentTimeout);
    }

    if (duration == null) {
      duration = 1000;
    }

    set({ children, isOpen: true });

    const currentTimeout = setTimeout(() => {
      set({ children: "", isOpen: false });
    }, duration);

    set({ currentTimeout });
  },
}));

export default useToast;
