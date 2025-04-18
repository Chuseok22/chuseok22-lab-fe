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
  '/api/auth/login', // 로그인
  '/api/auth/join', // 회원가입
  '/api/auth/refresh', // 토큰 재발급
]

export const PUBLIC_PATHS: string[] = [
  '/', // 홈
  '/auth/login', // 로그인 페이지
  '/auth/join' // 회원가입 페이지
];

export const AUTH_PATHS: string[] = [
  '/auth/login', // 로그인 페이지
  '/auth/join' // 회원가입 페이지
];

export type {LoginRequest, JoinRequest};