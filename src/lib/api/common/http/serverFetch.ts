import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api/common/http/axios.type";

export async function serverFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
  // 서버 컨텍스트에서만 동기적으로 작동
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
  .getAll()
  .map((cookie) => `${cookie.name}=${cookie.value}`)
  .join('; ');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader ? {Cookie: cookieHeader} : {}),
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(`SSR 요청 실패 (${response.status}): ${msg}`);
  }
  return response.json();
}