import {apiRequest} from "@/api/common/common-api";

// 회원가입
export async function join(request: {
  username: string,
  password: string,
  nickname: string
}): Promise<void> {
  await apiRequest<void>('/api/auth/join', 'POST', request);
}

// 로그인
export async function login(request: {
  username: string;
  password: string;
}): Promise<void> {
  await apiRequest<void>('/api/auth/login', 'POST', request);
}

// 아이디 중복 확인
export async function validateUsername(username: string): Promise<boolean> {
  const response = await apiRequest<boolean>(
      `/api/auth/validate/username?username=${encodeURIComponent(username)}`
  );
  return response.data;
}

// 닉네임 중복 확인
export async function validateNickname(nickname: string): Promise<boolean> {
  const response = await apiRequest<boolean>(
      `/api/auth/validate/nickname?nickname=${encodeURIComponent(nickname)}`
  );
  return response.data;
}