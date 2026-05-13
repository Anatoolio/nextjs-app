import { Session } from "next-auth";
import { create } from "zustand";

type SessionStatus = "authenticated" | "unauthenticated" | "loading";

interface AuthState {
  isAuth: boolean;
  status: SessionStatus;
  session: Session | null;
  setAuthState: (session: Session | null, status: SessionStatus) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  status: "loading",
  session: null,
  setAuthState: (session, status) =>
    set({
      isAuth: status === "authenticated",
      session,
      status,
    }),
}));
