import { IssueHelperRequest, IssueHelperResponse } from "@/lib/api/github/issue-helper/issueHelper.type";
import axiosClient from "@/lib/api/common/http/axiosClient";

/**
 * Issue Helper API 요청
 * @param request issueUrl, githubToken
 */
const processIssueHelper = async (
    request: IssueHelperRequest
): Promise<IssueHelperResponse> => {
    const response =
        await axiosClient.post<IssueHelperResponse>('/api/github/issue', request);
    return response.data;
}

export default processIssueHelper;