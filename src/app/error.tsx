'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AppError = ({error, reset}: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    // 오류 로깅 시스템에 오류 보고
    console.error(error);
  }, [error]);

  const router = useRouter();
  return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">오류가 발생했습니다</h1>
        <p className="mb-6 text-gray-600">불편을 드려 죄송합니다.<br/>문제가 계속되면 bjh59629@naver.com 으로 문의해주세요.</p>
        <div className="flex gap-4">
          <button onClick={reset} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            다시 시도
          </button>
          <button onClick={() => router.push('/')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            홈으로 이동
          </button>
        </div>
      </div>
  )
}

export default AppError;