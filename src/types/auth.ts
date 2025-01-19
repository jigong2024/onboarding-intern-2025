// 요청 타입
export interface RegisterRequest {
  id: string;
  password: string;
  nickname: string;
}

export interface LoginRequest {
  id: string;
  password: string;
}

export interface UpdateProfileRequest {
  avatar?: File | null;
  nickname?: string;
}

// 응답 타입들
export interface RegisterResponse {
  message: string;
  success: true;
}

export interface LoginResponse {
  accessToken: string;
  userId: string;
  success: true;
  avatar: string | null;
  nickname: string;
}

export interface UserResponse {
  id: string;
  nickname: string;
  avatar: string | null;
  success: true;
}

export interface UpdateProfileResponse extends RegisterResponse {
  avatar: string;
  nickname: string;
}
