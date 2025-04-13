interface LoginRequest {
  username: string;
  password: string;
}

interface JoinRequest {
  username: string;
  password: string;
  nickname: string;
}

export const AUTH_WHITELIST: string[] = [
  '/api/auth/login',
  '/api/auth/join',
  '/api/auth/refresh',
]

export type {LoginRequest, JoinRequest};