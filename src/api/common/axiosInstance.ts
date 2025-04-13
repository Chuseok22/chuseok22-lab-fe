import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from "axios";
import {AUTH_WHITELIST} from "@/api/auth/auth.type";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean; // 재시도 플래그
}

// API 기본 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키를 포함하여 요청 (RefreshToken 전송)
});

// 요청 인터셉터: AccessToken을 헤더에 추가
axiosInstance.interceptors.request.use(
    config => {

      // AUTH_WHITELIST는 헤더 추가X
      if (config.url && AUTH_WHITELIST.includes(config.url)) {
        return config;
      }

      // AccessToken 추가
      if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers['authorization'] = `Bearer ${accessToken}`;
        }
      }

      return config;
    },
    error => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 발생 시 토큰 재발급 요청 (reissue)
axiosInstance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {

      // config 존재하는지 확인
      if (!error.config) {
        return Promise.reject(error);
      }

      // config를 확장된 타입으로 캐스팅
      const originalRequest = error.config as CustomAxiosRequestConfig; // 원래 요청 저장

      // 401 에러 && 재시도 플래그가 없는 경우
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 재시도 플래그 설정

        try {
          // 토큰 재발급 요청
          const response = await axiosInstance.post('/api/auth/refresh');
          const newAccessToken = response.headers['authorization']?.replace('Bearer ', '');

          if (newAccessToken) {
            // 새로운 AccessTokne 저장
            localStorage.setItem('accessToken', newAccessToken);
            // 원래 요청의 Authorization 헤더 업데이트
            if (!originalRequest.headers) {
              originalRequest.headers = {};
            }
            originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
            // 원래 요청 재시도
            return axiosInstance(originalRequest);
          }
        } catch (refreshError){
          // 토큰 재발급 실패 시
          console.error('Token 재발급 실패: ', refreshError);
          localStorage.removeItem('accessToken'); // accessToken 제거
          window.location.href = '/auth/login'; // 로그인 페이지 redirect
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
)

export default axiosInstance;