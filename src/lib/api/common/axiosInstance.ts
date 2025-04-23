import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { AUTH_WHITELIST } from "@/lib/api/auth/auth.type";
import Cookies from "js-cookie";
import { ApiErrorResponse } from "@/lib/api/common/error/error.type";
import { hasAccessToken } from "@/middleware";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
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
      console.log('요청: ', config.url, config.method);
      console.log('요청 쿠키: ', Cookies.get());

      // AUTH_WHITELIST는 헤더 추가X
      if (config.url && AUTH_WHITELIST.includes(config.url)) {
        return config;
      }

      // AccessToken 추가
      if (typeof window !== 'undefined') {
        const accessToken = Cookies.get('accessToken'); // 쿠기에서 accessToken 추출
        if (hasAccessToken(accessToken)) {
          config.headers['authorization'] = `Bearer ${accessToken}`;
        }
      }

      return config;
    },
    error => Promise.reject(error)
);

// 응답 인터셉터: 에러 핸들링
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

      if (!originalRequest || !error.response) {
        throw error;
      }

      // 401 에러 처리: 즉시 로그인 페이지로 리다이렉트
      if (error.response.status === 401 && !originalRequest._retry) {
        console.error('인증에 실패했습니다. 다시 로그인해주세요');
        if (typeof window !== 'undefined') {
          window.location.href = `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
        Cookies.remove('accessToken');
        throw error;
      }

      // 403 에러 처리: 엑세스 토큰 재발급 시도
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          console.log('엑세스 토큰 만료, 재발급 시도');
          const newAccessToken = await axiosInstance.post('/api/auth/refresh').then(() => Cookies.get('accessToken'));
          if (!hasAccessToken(newAccessToken)) {
            throw new Error('엑세스 토큰 재발급 실패');
          }
          console.log('엑세스 토큰 재발급 성공');
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);

        } catch (refreshError) {
          console.error('엑세스 토큰 재발급 중 오류 발생: ', refreshError);
          Cookies.remove('accessToken');
          if (typeof window !== 'undefined') {
            window.location.href = `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`;
          }
          throw refreshError;
        }
      }

      // 그 외 에러는 컴포넌트로 전달
      throw error;
    }
);

export default axiosInstance;