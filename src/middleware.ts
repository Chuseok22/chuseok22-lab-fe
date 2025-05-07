import { NextRequest, NextResponse } from "next/server";
import { AUTH_PATHS, PUBLIC_PATHS } from "@/lib/api/auth/auth.type";

export const config = {
  matcher: [
    // /api/, _next 관련 경로, favicon, fonts, images, svg 파일 제외
    '/((?!api/|_next/|favicon\\.ico|fonts/|images/|.*\\.svg$).*)',
  ]
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const {pathname} = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value
  const isAuthRoute = AUTH_PATHS.includes(pathname)
  const isPublicRoute = PUBLIC_PATHS.includes(pathname)

  console.log('middleware.ts 실행');

  // 이미 인증된 사용자는 로그인/회원가입 페이지 접근 불가
  if (accessToken && isAuthRoute) {
    console.log("이미 로그인 된 사용자입니다.");
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 공개 경로는 인증 생략
  if (isPublicRoute) {
    console.log('공개경로 접근');
    return NextResponse.next();
  }

  // 그 외 경로는 인증 확인
  if (!accessToken) {
    console.log('인증된 사용자가 아님');
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/auth/login';
    return NextResponse.redirect(loginUrl);
  }
  console.log('인증된 사용자기에 패스');

  return NextResponse.next();
}