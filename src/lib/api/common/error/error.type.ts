export interface ApiErrorResponse {
  errorCode: ErrorCode;
  errorMessage: string;
}

// ApiErrorResponse 타입가드
export const isApiErrorResponse = (
    data: unknown): data is ApiErrorResponse => {
  return (
      data !== null &&
      typeof data === 'object' &&
      'errorCode' in data &&
      typeof data.errorCode === 'string' &&
      'errorMessage' in data &&
      typeof data.errorMessage === 'string'
  );
}

// 에러 코드와 메시지 정의
export const ERROR_CODES = {
  // GLOBAL
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR' as const,
    message: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
  INVALID_REQUEST: {
    code: 'INVALID_REQUEST' as const,
    message: '잘못된 요청입니다. 입력값을 확인해주세요.',
  },
  ACCESS_DENIED: {
    code: 'ACCESS_DENIED' as const,
    message: '접근이 거부되었습니다.',
  },

  // AUTH
  INVALID_ACCESS_TOKEN: {
    code: 'INVALID_ACCESS_TOKEN' as const,
    message: '유효하지 않은 엑세스 토큰입니다. 다시 로그인해주세요',
  },
  INVALID_REFRESH_TOKEN: {
    code: 'INVALID_REFRESH_TOKEN' as const,
    message: '유효하지 않은 리프레시 토큰입니다. 다시 로그인해주세요.',
  },
  MISSING_AUTH_TOKEN: {
    code: 'MISSING_AUTH_TOKEN' as const,
    message: '토큰이 없습니다. 다시 로그인해주세요.',
  },
  EXPIRED_ACCESS_TOKEN: {
    code: 'EXPIRED_ACCESS_TOKEN' as const,
    message: '토큰이 만료되었습니다. 다시 로그인해주세요.',
  },
  EXPIRED_REFRESH_TOKEN: {
    code: 'EXPIRED_REFRESH_TOKEN' as const,
    message: '토큰 갱신이 만료되었습니다. 다시 로그인해주세요.',
  },
  DUPLICATE_USERNAME: {
    code: 'DUPLICATE_USERNAME' as const,
    message: '이미 사용 중인 아이디입니다.',
  },
  DUPLICATE_NICKNAME: {
    code: 'DUPLICATE_NICKNAME' as const,
    message: '이미 사용 중인 닉네임입니다.',
  },
  COOKIES_NOT_FOUND: {
    code: 'COOKIES_NOT_FOUND' as const,
    message: '쿠키가 없습니다. 다시 로그인해주세요.',
  },
  REFRESH_TOKEN_NOT_FOUND: {
    code: 'REFRESH_TOKEN_NOT_FOUND' as const,
    message: '토큰 갱신 정보를 찾을 수 없습니다. 다시 로그인해주세요.',
  },

  // MEMBER
  MEMBER_NOT_FOUND: {
    code: 'MEMBER_NOT_FOUND' as const,
    message: '사용자를 찾을 수 없습니다.',
  },

  // GITHUB
  GITHUB_ISSUE_PROCESSING_ERROR: {
    code: 'GITHUB_ISSUE_PROCESSING_ERROR' as const,
    message: '이슈 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
  GITHUB_ISSUE_PARSING_ERROR: {
    code: 'GITHUB_ISSUE_PARSING_ERROR' as const,
    message: '이슈 파싱 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
  GITHUB_ISSUE_SAVE_ERROR: {
    code: 'GITHUB_ISSUE_SAVE_ERROR' as const,
    message: '이슈 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
  GITHUB_ISSUE_INVALID_TITLE: {
    code: 'GITHUB_ISSUE_INVALID_TITLE' as const,
    message: 'GitHub 이슈 제목이 올바르지 않습니다.',
  },
  GITHUB_TOKEN_REQUIRED: {
    code: 'GITHUB_TOKEN_REQUIRED' as const,
    message: 'GitHub 토큰이 필요합니다',
  },
  INVALID_GITHUB_TOKEN: {
    code: 'INVALID_GITHUB_TOKEN' as const,
    message: '유효하지 않은 GitHub 토큰입니다.',
  },
  GITHUB_API_ERROR: {
    code: 'GITHUB_API_ERROR' as const,
    message: 'GitHub API 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
  },

  // WEB API
  INVALID_RESPONSE_BODY: {
    code: 'INVALID_RESPONSE_BODY' as const,
    message: '잘못된 응답입니다. 입력값을 확인해주세요.',
  },
} as const;

// 에러 코드 타입 추출
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES]['code'];

// 에러 메시지 매핑
export const errorMessages: Record<ErrorCode, string> = Object.values(ERROR_CODES).reduce(
    (acc, { code, message }) => ({
      ...acc,
      [code]: message,
    }),
    {} as Record<ErrorCode, string>
);