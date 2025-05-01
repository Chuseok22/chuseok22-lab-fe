import { AxiosRequestConfig } from "axios";

const API_BASE_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL

/**
 * 재요청 필드
 */
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export { API_BASE_URL }