import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UserResponse,
} from "../types/auth";
import { authInstance } from "./axios";

export const authApi = {
  // 회원가입
  register: (data: RegisterRequest) =>
    authInstance.post<RegisterResponse>("/register", data),

  // 로그인
  login: (data: LoginRequest, expiresIn?: string) =>
    authInstance.post<LoginResponse>(
      `/login${expiresIn ? `?expiresIn=${expiresIn}` : ""}`,
      data
    ),

  // 회원정보 조회
  getProfile: (token: string) =>
    authInstance.get<UserResponse>("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // 프로필 변경
  updateProfile: (token: string, data: UpdateProfileRequest) => {
    const formData = new FormData();
    if (data.avatar) formData.append("avatar", data.avatar);
    if (data.nickname) formData.append("nickname", data.nickname);

    return authInstance.patch<UpdateProfileResponse>("/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
