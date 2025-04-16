import {issueHelperRequest, issueHelperResponse} from "@/api/github/issue-helper/issueHelper.type";
import axiosInstance from "@/api/common/axiosInstance";

/**
 * Issue Helper API 요청
 * @param request issueUrl, githubToken
 */
export const processIssueHelper = async (
    request: issueHelperRequest
): Promise<issueHelperResponse> => {
  const response =
      await axiosInstance.post<issueHelperResponse>('/api/github/issue', request);
  return response.data;
}