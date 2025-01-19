import { create } from "zustand";

interface User {
  id: string;
  nickname: string;
  avatar: string | null;
}

interface AuthState {
  token: string | null;
  user: User | null;
  // 로그인 성공시 호출
  setAuth: (token: string, user: User) => void;
  // 로그아웃시 호출
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));
