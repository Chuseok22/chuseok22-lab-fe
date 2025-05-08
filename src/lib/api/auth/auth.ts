import { AxiosResponse } from "axios";
import { JoinRequest, LoginRequest } from "@/lib/api/auth/auth.type";
import Cookies from "js-cookie";
import axiosClient from "@/lib/api/common/http/axiosClient";


// 로그인
export const login = async (
    request: LoginRequest
): Promise<void> => {
  const response: AxiosResponse<void> = await axiosClient.post(`/api/auth/login`, request);
  console.log(response);

  const accessToken: string | undefined = Cookies.get('accessToken');
  if (!accessToken) {
    throw new Error("엑세스 토큰 쿠키가 존재하지 않습니다.");
  }
  console.log('엑세스 토큰 저장 완료')
}

// 아이디 중복 검증
export const validateUsername = async (
    username: string
): Promise<boolean> => {
  return await axiosClient.get(`/api/auth/validate/username?username=${username}`);
}

// 닉네임 중복 검증
export const validateNickname = async (
    nickname: string
): Promise<boolean> => {
  return await axiosClient.get(`/api/auth/validate/nickname?nickname=${nickname}`);
}

// 회원가입
export const join = async (request: JoinRequest): Promise<void> => {
  await axiosClient.post(`/api/auth/join`, request);
}

// 엑세스 토큰 만료 시 재발급
export const refreshAccessToken = async (): Promise<string> => {
  await axiosClient.post('/api/auth/refresh');
  const newAccessToken = Cookies.get('accessToken');
  if (!newAccessToken) {
    console.error('엑세스 토큰 재발급에 실패했습니다')
    Cookies.remove('accessToken');
    throw new Error('에러 발생');
  }
  return newAccessToken;
}

// 로그아웃
export const logout = async () => {
  try {
    await axiosClient.post('/api/auth/logout');
  } catch (error) {
    console.log("로그아웃 API 요청중 오류 발생 ", error);
  }
}