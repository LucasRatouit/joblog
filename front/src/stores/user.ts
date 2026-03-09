import { create } from "zustand";
import { isLoggedIn } from "../api/services/user";

interface UserState {
  user: { email: string } | null;
  getUser: () => Promise<void>;
  setUser: (user: { email: string } | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  getUser: async () => {
    try {
      const response = await isLoggedIn();
      // Le backend renvoie { message: "Token valide", user: { token: { id, email } } }
      if (response && response.user && response.user.token) {
        set({ user: { email: response.user.token.email } });
      } else {
        set({ user: null });
      }
    } catch (error) {
      set({ user: null });
    }
  },
  setUser: (user) => set({ user }),
}));
