import { NextRequest, NextResponse } from "next/server";
import { AUTH_PATHS, PUBLIC_PATHS } from "@/lib/api/auth/auth.type";

// middleware.ts 제외 경로
const EXCLUDED_PATHS = [
  '/api',
  '/_next/static',
  '/_next/image',
  '/favicon.ico',
  '/fonts',
  '/images',
]

// 제외할 파일 확장자 정규식
const EXCLUDED_EXTENSIONS = /\.(svg|png|jpg|jpeg|gif|webp)$/;

export async function middleware(request: NextRequest) {
  const pathname: string = request.nextUrl.pathname;

  // 제외할 경로와 파일 확장자 체크
  const isExcludedPath = EXCLUDED_PATHS.some(path => pathname.startsWith(path));
  const isExcludedExtension = EXCLUDED_EXTENSIONS.test(pathname);

  if (isExcludedPath || isExcludedExtension) {
    return NextResponse.next();
  }

  // 인증 상태 확인
  const accessToken: string | null | undefined = request.cookies.get('accessToken')?.value;
  console.log(accessToken);

  // 이미 인증된 사용자는 로그인 & 회원가입 페이지 접근 불가
  if (hasAccessToken(accessToken) && AUTH_PATHS.includes(pathname)) {
    console.log("이미 로그인 된 사용자입니다.");
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 공개 경로는 인증 생략
  if (PUBLIC_PATHS.includes(pathname)) {
    console.log("공개 경로 접근");
    return NextResponse.next();
  }

  // 그 외 경로는 인증 확인
  if (!hasAccessToken(accessToken)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export function hasAccessToken(accessToken: string | null | undefined): boolean {
  return typeof accessToken === "string" && accessToken.length > 0;
}