import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { refreshAccessToken } from "@/lib/api/auth/auth";
import { API_BASE_URL, CustomAxiosRequestConfig } from "@/lib/api/common/http/axios.type";

/**
 * 기본 client axios 인스턴스 생성
 */
const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키를 포함하여 요청 (RefreshToken 전송)
});

/**
 * 요청 인터셉터: Auth 화이트리스트 제외, Bearer 토큰 자동 추가
 */
axiosClient.interceptors.request.use(
    (config) => {
      const accessToken = Cookies.get('accessToken');
      if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config
    },
    error => Promise.reject(error)
);

/**
 * 응답 인터셉터
 */
axiosClient.interceptors.response.use(
    // 성공 시 바로 payload 리턴
    (response) => response,
    async (error) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      const status = error.response?.status;

      // 엑세스 토큰 만료 시
      if (status === 401 || status === 403) {
        // 재시도 전
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            // 토큰 재발급 API 호출
            const newAccessToken = await refreshAccessToken();

            // 요청 헤더 갱신 후 재시도
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosClient(originalRequest);
          } catch {
            // 로그인 페이지 이동
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            redirectToLoginClient();
          }
        }

        // 이미 재시도 한 경우 로그인 페이지 이동
        redirectToLoginClient();
      }
      // 401 이외의 에러는 throw
      return Promise.reject(error);
    }
)

// 로그인 페이지 리다이렉트 로직
function redirectToLoginClient() {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  const redirect = encodeURIComponent(window.location.pathname)
  window.location.href = `/auth/login?redirect=${redirect}`
}

export default axiosClient
