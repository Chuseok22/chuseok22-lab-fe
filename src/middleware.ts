import { NextRequest, NextResponse } from "next/server";
import { AUTH_PATHS, PUBLIC_PATHS } from "@/lib/api/auth/auth.type";

export function middleware(request: NextRequest) {
  const pathname: string = request.nextUrl.pathname;

  // 인증 상태 확인
  const accessToken: string | null | undefined = request.cookies.get('accessToken')?.value;

  // 이미 인증된 사용자는 로그인 & 회원가입 페이지 접근 불가
  if (hasAccessToken(accessToken) && AUTH_PATHS.includes(pathname)) {
    console.log("이미 로그인 된 사용자입니다.");
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }

  // 공개 경로는 인증 생략
  if (PUBLIC_PATHS.includes(pathname)) {
    console.log("공개 경로 접근");
    return NextResponse.next();
  } else { // 그 외 경로는 접근 시 인증 확인
    if (!accessToken) {
      console.log("로그인이 필요합니다.");
      const url = new URL('/auth/login', request.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

// 미들웨어 적용 경로
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}

function hasAccessToken(accessToken: string | null | undefined): boolean {
  if (typeof accessToken === "string") {
    return true;
  } else {
    return false;
  }
}