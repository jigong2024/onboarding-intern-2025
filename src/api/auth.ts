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

// export const authApi = {
//   // 회원가입
//   register: (data: RegisterRequest) =>
//     authInstance.post<RegisterResponse>("/register", data),

//   // 로그인
//   login: (data: LoginRequest, expiresIn?: string) =>
//     authInstance.post<LoginResponse>(
//       `/login${expiresIn ? `?expiresIn=${expiresIn}` : ""}`,
//       data
//     ),

//   // 회원정보 조회
//   getProfile: (token: string) =>
//     authInstance.get<UserResponse>("/user", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }),

//   // 프로필 변경
//   updateProfile: (token: string, data: UpdateProfileRequest) => {
//     const formData = new FormData();
//     if (data.avatar) formData.append("avatar", data.avatar);
//     if (data.nickname) formData.append("nickname", data.nickname);

//     return authInstance.patch<UpdateProfileResponse>("/profile", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
// };

export const authApi = {
  // 회원가입
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const checkUser = await authInstance.get(`/users?id=${data.id}`);
    if (checkUser.data.length > 0) {
      throw new Error("이미 존재하는 아이디입니다.");
    }

    // 새 사용자 추가
    await authInstance.post(`/users`, {
      id: data.id,
      password: data.password,
      nickname: data.nickname,
      avatar: null,
    });

    return {
      message: "회원가입 완료",
      success: true,
    };
  },

  // 로그인
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await authInstance.get(`/users?id=${data.id}`);
    const user = response.data[0];

    // 사용자 존재 확인
    if (!user) {
      throw new Error("Invalid id");
    }

    // 비밀번호 일치 확인
    if (user.password !== data.password) {
      throw new Error("Password mismatch");
    }

    // 임시 토큰 생성
    const token = btoa(
      JSON.stringify({ id: user.id, exp: Date.now() + 3600000 })
    );

    return {
      accessToken: token,
      userId: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
      success: true,
    };
  },

  // 회원정보 조회
  getProfile: async (token: string): Promise<UserResponse> => {
    const tokenData = JSON.parse(atob(token));

    const response = await authInstance.get(`/users?id=${tokenData.id}`);
    const user = response.data[0];

    if (!user) {
      throw new Error("User information not found");
    }

    return {
      id: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
      success: true,
    };
  },

  // 프로필 업데이트
  updateProfile: async (
    token: string,
    data: UpdateProfileRequest
  ): Promise<UpdateProfileResponse> => {
    const tokenData = JSON.parse(atob(token));

    const userResponse = await authInstance.get(`/users?id=${tokenData.id}`);
    const existingUser = userResponse.data[0];

    if (!existingUser) {
      throw new Error("User information not found");
    }

    let avatarUrl = existingUser.avatar;
    if (data.avatar) {
      // 실제 파일 업로드는 JSON 서버에서 복잡하므로 임시 처리
      avatarUrl = URL.createObjectURL(data.avatar);
    }

    // 프로필 업데이트
    const updatedUser = {
      ...existingUser,
      nickname: data.nickname || existingUser.nickname,
      avatar: avatarUrl,
    };

    const updateResponse = await authInstance.put(
      `/users/${existingUser.id}`,
      updatedUser
    );

    return {
      message: "프로필 업데이트 완료",
      success: true,
      nickname: updateResponse.data.nickname,
      avatar: updateResponse.data.avatar,
    };
  },
};
