import { AxiosResponse } from "axios";
import axiosInstance from "@/lib/api/common/axiosInstance";
import { JoinRequest, LoginRequest } from "@/lib/api/auth/auth.type";
import Cookies from "js-cookie";
import { hasAccessToken } from "@/middleware";

// 로그인
export const login = async (
    request: LoginRequest
): Promise<void> => {
  const response: AxiosResponse<void> = await axiosInstance.post(`/api/auth/login`, request);
  console.log(response);

  const accessToken: string | undefined = Cookies.get('accessToken');
  if (!hasAccessToken(accessToken)) {
    throw new Error("엑세스 토큰 쿠키가 존재하지 않습니다.");
  }
  console.log('엑세스 토큰 저장 완료')
}

// 아이디 중복 검증
export const validateUsername = async (
    username: string
): Promise<boolean> => {
  const response = await axiosInstance.get(`/api/auth/validate/username?username=${username}`);
  return response.request;
}


// 닉네임 중복 검증
export const validateNickname = async (
    nickname: string
): Promise<boolean> => {
  const response = await axiosInstance.get(`/api/auth/validate/nickname?nickname=${nickname}`);
  return response.request;
}

// 회원가입
export const join = async (request: JoinRequest): Promise<void> => {
  await axiosInstance.post(`/api/auth/join`, request);
}

// 엑세스 토큰 만료 시 재발급
export const refreshAccessToken = async (): Promise<string | undefined> => {
  await axiosInstance.post('/api/auth/refresh');
  const newAccessToken: string | undefined = Cookies.get('accessToken');
  if (!hasAccessToken(newAccessToken)) {
    console.error('엑세스 토큰 재발급에 실패했습니다')
    Cookies.remove('accessToken');
    if (typeof window !== 'undefined') {
      window.location.href = `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`;
    }
  }
  return newAccessToken;
}