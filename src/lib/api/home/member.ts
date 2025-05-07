import { serverFetch } from "@/lib/api/common/http/serverFetch";
import { MemberResponse } from "@/lib/api/home/member.type";

/**
 * 사용자 정보 API 요청
 */
const getMemberInfo = async (): Promise<MemberResponse> => {
  return await serverFetch('/api/member');
}

export { getMemberInfo };