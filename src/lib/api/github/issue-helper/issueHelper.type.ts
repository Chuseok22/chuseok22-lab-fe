interface issueHelperRequest {
  issueUrl: string;
  githubToken: string | null;
}

interface issueHelperResponse {
  branchName: string;
  commitMessage: string;
}

export type {issueHelperRequest, issueHelperResponse};