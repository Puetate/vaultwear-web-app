import { Session } from "@/@types/session.type";
import { router } from "@/main";
import { create } from "zustand";
import { getMeService } from "./@services/getMe.service";
import { refreshTokenService } from "./@services/refreshToken.service";
import { singOutService } from "./@services/singOut.service";

interface SessionStore {
  isLogOut: boolean;
  session: Session | null;
  setSession: (session: Session | null) => void;
  refreshTokenSession: () => Promise<{
    accessToken: string | null;
  }>;
  refreshSession: () => Promise<Session | null>;
  logOut: () => void;
}

const initialState: SessionStore = {
  isLogOut: false,
  session: null,
  setSession: () => {},
  refreshTokenSession: async () => ({ accessToken: "" }),
  logOut: () => {},
  refreshSession: async () => null
};

export const useSessionStore = create<SessionStore>((set, get) => ({
  ...initialState,
  setSession: (session) => {
    set({ session });
    if (session) {
      set({ isLogOut: false });
    } else {
      set({ isLogOut: true });
    }
  },
  refreshTokenSession: async () => {
    try {
      const { accessToken } = await refreshTokenService();
      if (!accessToken) {
        set({ session: null });
        return { accessToken: null };
      }
      set((state) => {
        const currentSession = state.session;
        if (currentSession) {
          return {
            session: {
              ...currentSession,
              accessToken
            }
          };
        } else {
          return {
            session: {
              user: null,
              accessToken
            }
          };
        }
      });
      return { accessToken };
    } catch (error) {
      get().setSession(null);
      return { accessToken: null };
    }
  },
  logOut: async () => {
    await singOutService();
    router.navigate({
      to: "/login"
    });
    get().setSession(null);
  },
  refreshSession: async () => {
    try {
      const session = await getMeService();
      set({ session: session });
      return session;
    } catch (error) {
      get().setSession(null);
      return null;
    }
  }
}));
