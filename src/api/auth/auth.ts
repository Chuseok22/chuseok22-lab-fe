import {AxiosResponse} from "axios";
import axiosInstance from "@/api/common/axiosInstance";
import {JoinRequest, LoginRequest} from "@/api/auth/auth.type";

// 로그인
export const login = async (request: LoginRequest): Promise<void> => {
  const response: AxiosResponse<void> = await axiosInstance.post(`/api/auth/login`, request);
  console.log(response);

  const authHeader = response.headers['authorization'];
  if (!authHeader) {
    throw new Error('응답 헤더에 Authorization 이 포함되어 있지 않습니다.');
  }

  // Bearer 접두어 확인 및 제거
  const tokenPrefix = 'Bearer ';
  if (!authHeader.startsWith(tokenPrefix)) {
    throw new Error('Authorization 헤더 형식이 올바르지 않습니다.');
  }

  const accessToken: string = authHeader.replace(tokenPrefix, '');
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    console.log('엑세스 토큰 저장 완료')
  } else {
    throw new Error('accessToken 저장 실패');
  }
}

// 아이디 중복 검증
export const validateUsername = async (username: string): Promise<boolean> => {
  const response = await axiosInstance.get(`/api/auth/validate/username?username=${username}`);
  return response.request;
}


// 닉네임 중복 검증
export const validateNickname = async (nickname:string): Promise<boolean> => {
  const response = await axiosInstance.get(`/api/auth/validate/nickname?nickname=${nickname}`);
  return response.request;
}

// 회원가입
export const join = async (request: JoinRequest):Promise<void> => {
  await axiosInstance.post(`/api/auth/join`, request);
}

// 엑세스 토큰 만료 시 재발급
export const refreshAccessToken = async (): Promise<string> => {
  const response = await axiosInstance.post('/api/auth/refresh');
  const newAccessToken = response.headers['authorization']?.replace('Bearer ', '');
  if (!newAccessToken) {
    throw new Error('AccessToken 재발급에 실패했습니다.');
  }
  return newAccessToken;
}