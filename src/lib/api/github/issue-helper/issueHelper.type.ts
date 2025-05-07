interface IssueHelperRequest {
  issueUrl: string;
  githubToken: string | null;
}

interface IssueHelperResponse {
  branchName: string;
  commitMessage: string;
}

export type {IssueHelperRequest, IssueHelperResponse};