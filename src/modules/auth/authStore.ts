import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  name: string;
  mail: string;
  userType: 'ADMIN' | 'CLIENT';
  isAdmin: boolean;
}

interface JwtPayload {
  mail: string;
  userType: 'ADMIN' | 'CLIENT';
  exp: number;
  iat: number;
}

interface AuthStore {
  user: User | null;
  access_token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (mail: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
  checkTokenExpiration: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      access_token: null,
      isAuthenticated: false,
      isAdmin: false,

      login: async (email: string, password: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Credenciais inválidas');
        }

        const data = await response.json();
        const { access_token, user } = data;

        set({
          user,
          access_token,
          isAuthenticated: true,
          isAdmin: user.isAdmin,
        });
      },

      logout: () => {
        set({
          user: null,
          access_token: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },

      setUser: (user: User, token: string) => {
        set({
          user,
          access_token: token,
          isAuthenticated: true,
          isAdmin: user.userType === 'ADMIN',
        });
      },

      checkTokenExpiration: () => {
        const { access_token } = get();
        if (access_token) {
          try {
            const decoded = jwtDecode<JwtPayload>(access_token);
            const currentTime = Date.now() / 1000;
            
            if (decoded.exp < currentTime) {
              get().logout();
            }
          } catch (error) {
            console.error('Token inválido ou expirado', error);
            get().logout();
          }
        }
      },
    }),
    {
      name: '@taller-auth-storage',
      partialize: (state) => ({
        user: state.user,
        access_token: state.access_token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
);