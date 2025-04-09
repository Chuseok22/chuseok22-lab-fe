const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T> {
  data: T;
  status: number;
}

interface ApiError {
  errorCode: string;
  errorMessage: string;
}

// 에러 핸들링
function handleApiError(error: ApiError): never {
  // 공통 예외 처리 로직
  console.error(`API Error: ${error.errorCode} - ${error.errorMessage}`);

  // 에러 코드에 따라 커스터마이징
  let userMessage = error.errorMessage;
  switch (error.errorCode) {
    case 'DUPLICATE_USERNAME':
      userMessage = '이미 사용 중인 아이디입니다.';
      break;
    case 'DUPLICATE_NICKNAME':
      userMessage = '이미 사용 중인 닉네임입니다.';
      break;
    default:
      userMessage = '알 수 없는 오류가 발생했습니다.';
  }

  // 에러 객체에 사용자 메시지 추가
  throw new Error(userMessage);
}

// 공통 fetch 함수
export async function apiRequest<T>(
    endpoint: string,
    method: string = 'GET',
    body?: unknown
): Promise<ApiResponse<T>> {
  if (typeof window === 'undefined') {
    throw new Error('API 호출은 클라이언트 환경에서만 가능합니다.');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    handleApiError(errorData); // 중앙에서 에러 처리
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    if (err instanceof Error) {
      data = null;
    }
  }

  return {data, status: response.status};
}