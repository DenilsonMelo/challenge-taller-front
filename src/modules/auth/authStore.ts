import { create } from "zustand";
import { persist } from "zustand/middleware";
import AuthService from "@/modules/auth/Services/index";
import { deleteToken, getToken, saveToken } from "@/shared/lib/token";

interface User {
  id: string;
  name: string;
  mail: string;
  token: string;
  userType: "ADMIN" | "CLIENT";
  created_at: string;
  updated_at: string;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
  login: (credentials: Credentials) => Promise<User>;
  logout: () => void;
  user: User | null;
  userType: string | null;
  setUser: (user: User) => void;
  setUserType: (userType: string) => void;
}

interface Credentials {
  mail: string;
  password: string;
}

const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      token: getToken() ?? null,
      isAuthenticated: !!getToken(),
      error: null,
      userType: null,
      setUser: (user: User) => set({ user }),
      setUserType: (userType: string) => set({ userType }),

      login: async (credentials: Credentials): Promise<User> => {
        try {
          const response = await AuthService.login(credentials);

          const token: string = response.data.access_token;
          const user: User = response.data.user;

          saveToken(token);

          set({
            token,
            isAuthenticated: true,
            error: null,
            user,
            userType: user.userType || null,
          });

          return user;
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Erro ao fazer login",
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          userType: null,
          isAuthenticated: false,
        });

        deleteToken();
      },
    }),
    {
      name: "@taller/auth-storage",
    }
  ) as any
);

export default useAuthStore;
