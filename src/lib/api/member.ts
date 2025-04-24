import { MemberResponse } from "@/lib/api/member.type";
import axiosInstance from "@/lib/api/common/axiosInstance";

/**
 * 사용자 정보 API 요청
 */
const getMemberInfo = async (): Promise<MemberResponse> => {
  const response = await axiosInstance.get('/api/member');
  return response.data;
}

export { getMemberInfo };