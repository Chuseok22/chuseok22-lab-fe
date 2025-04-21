import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { AUTH_WHITELIST } from "@/lib/api/auth/auth.type";
import Cookies from "js-cookie";
import { ApiErrorResponse } from "@/lib/api/common/error/error.type";

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

      // AUTH_WHITELIST는 헤더 추가X
      if (config.url && AUTH_WHITELIST.includes(config.url)) {
        return config;
      }

      // AccessToken 추가
      if (typeof window !== 'undefined') {
        const accessToken = Cookies.get('accessToken'); // 쿠기에서 accessToken 추출
        if (accessToken) {
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

      // 401 에러 처리
      if (error.response.status === 401 && !originalRequest._retry) {

        if (error.response.data.errorCode === 'INVALID_REFRESH_TOKEN') {
          console.error("리프래시 토큰이 유효하지 않아 로그인 페이지로 이동합니다.");
          window.location.href = `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
        originalRequest._retry = true;
        try {
          localStorage.removeItem('accessToken'); // 로컬 스토리지 삭제
          await axiosInstance.post('/api/auth/refresh'); // api요청
          const newAccessToken: string | null | undefined = Cookies.get('accessToken');
          if (typeof newAccessToken !== "string") {
            console.error('엑세스 토큰 재발급에 실패하여 로그인 페이지로 이동합니다.');
            window.location.href = `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`;
          } else {
            localStorage.setItem('accessToken', newAccessToken);
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = newAccessToken;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error('토큰 재발급 중 오류 발생: ', refreshError);
          Cookies.remove('accessToken');
          window.location.href = `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
      }

      // 그 외 에러는 컴포넌트로 전달
      throw error;
    }
);

export default axiosInstance;