'use client'

import React, { FormEvent, useState } from "react";
import { IssueHelperRequest, IssueHelperResponse } from "@/lib/api/github/issue-helper/issueHelper.type";
import Link from "next/link";
import SubmitButton from "@/components/github/issueHelper/SubmitButton";
import { CustomException } from "@/lib/api/common/error/error.type";
import { toast } from "react-toastify";
import processIssueHelper from "@/lib/api/github/issue-helper/issueHelper";

const GithubIssueHelper = () => {
  const [issueHelperRequest, setIssueHelperRequest] = useState({
    issueUrl: '',
    githubToken: '',
  });
  const [issueHelperResponse, setIssueHelperResponse] = useState<IssueHelperResponse | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<'branchName' | 'commitMessage' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setIssueHelperRequest(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // 복사 버튼 핸들러
  const handleCopy = async (
      text: string, field: 'branchName' | 'commitMessage') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000); // 2초 후 복사 상태 초기화
      toast('복사 성공!');
    } catch {
      toast.error('복사 실패!');
    }
  }

  // 폼 제출 핸들러
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIssueHelperResponse(null);
    setIsLoading(true);

    // 입력값 검증
    const trimmedIssueUrl = issueHelperRequest.issueUrl.trim();
    if (!trimmedIssueUrl) {
      toast.error('Github Issue URL을 입력해주세요.');
      setIsLoading(false);
      return;
    }
    // GitHub Issue URL 형식 검증
    const githubIssueRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/issues\/\d+$/;
    if (!githubIssueRegex.test(trimmedIssueUrl)) {
      toast.error('올바른 URL을 입력해주세요. (예: https://github.com/owner/repo/issues/123)');
      setIsLoading(false);
      return;
    }

    try {
      const request: IssueHelperRequest = {
        issueUrl: trimmedIssueUrl,
        githubToken: issueHelperRequest.githubToken.trim() || null,
      };
      const response = await processIssueHelper(request);
      setIssueHelperResponse(response);
      setIsLoading(false);
      // 모바일에서 모달 열기 (lg 미만)
      if (window.innerWidth < 1024) { // lg breakpoint
        setIsModalOpen(true);
      }
    } catch (error) {
      if (error instanceof CustomException) {
        toast.error(error.message);
      } else {
        console.error(error);
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
      <div className="bg-white rounded-2xl shadow-2xl flex justify-center items-center w-5/6 lg:w-2/3 py-10 lg:py-30">
        <div className="flex flex-col items-center w-4/5 lg:w-1/2">
          <h1 className="text-bold text-green-500 text-2xl lg:text-3xl pb-5 lg:pb-10">Github Issue Helper</h1>
          <div className="lg:hidden flex border-2 w-10 border-green-500 mb-2"></div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <div className="flex flex-col w-full lg:w-3/4 py-5">
              <label htmlFor="issueUrl" className="flex">
                <p className="mb-1 text-lg">Github Issue URL <span className="text-red-500">*</span></p>
              </label>
              <input
                  type="text"
                  id="issueUrl"
                  name="issueUrl"
                  value={issueHelperRequest.issueUrl}
                  onChange={handleInputChange}
                  placeholder="ex) https://github.com/owner/repo/issues/123"
                  className="flex border-green-500 border-2 px-1"
                  required
                  autoComplete="off"
              />
            </div>
            <div className="flex flex-col w-full lg:w-3/4 py-5 mb-3 lg:mb-10">
              <label htmlFor="githubToken" className="flex flex-col items-start">
                <p className="text-lg">Github Personal Token</p>
                <p className="text-gray-500 text-sm">(Private Repository 접근 시 필요합니다.)</p>
                <Link href="https://github.com/settings/tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline italic text-sm">
                  Create Personal Token
                </Link>
              </label>
              <input
                  type="text"
                  id="githubToken"
                  name="githubToken"
                  value={issueHelperRequest.githubToken}
                  onChange={handleInputChange}
                  placeholder="GitHub Personal Access Token"
                  className="flex border-green-500 border-2 px-1"
                  autoComplete="off"
              />
            </div>
            <SubmitButton type={"submit"} text={isLoading ? "처리중..." : "요청"} isGreen={false}/>
          </form>
        </div>
        <div className="hidden lg:flex flex-col lg:w-1/2 border-l-3 border-green-500 items-center justify-center">
          <div className="flex flex-col items-start py-7 w-4/5">
            <div className="flex items-start">
              <p className="text-lg mb-2 mr-2">Branch Name</p>
              {issueHelperResponse?.branchName && (
                  <button
                      onClick={() => handleCopy(issueHelperResponse.branchName, 'branchName')}
                      className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-500 cursor-pointer"
                  >
                    {copiedField === 'branchName' ? 'Copied!' : 'Copy'}
                  </button>
              )}
            </div>
            <textarea placeholder="파싱된 브랜치명이 출력됩니다"
                      value={issueHelperResponse?.branchName}
                      className="border-2 border-green-500 w-full px-1 py-1"
                      readOnly={true}
            />
          </div>
          <div className="flex flex-col items-start py-7 w-4/5">
            <div className="flex items-start">
              <p className="text-lg mb-2 mr-2">Commit Message</p>
              {issueHelperResponse?.commitMessage && (
                  <button
                      onClick={() => handleCopy(issueHelperResponse.commitMessage, 'commitMessage')}
                      className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-500 cursor-pointer"
                  >
                    {copiedField === 'commitMessage' ? 'Copied!' : 'Copy'}
                  </button>
              )}
            </div>
            <textarea placeholder="파싱된 커밋 메시지명이 출력됩니다"
                      value={issueHelperResponse?.commitMessage}
                      className="border-2 border-green-500 w-full px-1 py-1"
                      readOnly={true}
            />
          </div>
        </div>
        {/* 모바일 모달: lg 미만에서 표시 */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-gray-200 flex items-center justify-center z-50 lg:hidden">
              <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-green-500">결과</h2>
                  <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <p className="text-lg mb-2">Branch Name</p>
                      {issueHelperResponse?.branchName && (
                          <button
                              onClick={() => handleCopy(issueHelperResponse.branchName, 'branchName')}
                              className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-500"
                          >
                            {copiedField === 'branchName' ? 'Copied!' : 'Copy'}
                          </button>
                      )}
                    </div>
                    <textarea
                        placeholder="파싱된 브랜치명이 출력됩니다"
                        value={issueHelperResponse?.branchName}
                        className="border-2 border-green-500 w-full px-1 py-1"
                        readOnly={true}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <p className="text-lg mb-2">Commit Message</p>
                      {issueHelperResponse?.commitMessage && (
                          <button
                              onClick={() => handleCopy(issueHelperResponse.commitMessage, 'commitMessage')}
                              className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-500"
                          >
                            {copiedField === 'commitMessage' ? 'Copied!' : 'Copy'}
                          </button>
                      )}
                    </div>
                    <textarea
                        placeholder="파싱된 커밋 메시지명이 출력됩니다"
                        value={issueHelperResponse?.commitMessage}
                        className="border-2 border-green-500 w-full px-1 py-1"
                        readOnly={true}
                    />
                  </div>
                </div>
                <button
                    onClick={handleCloseModal}
                    className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                >
                  닫기
                </button>
              </div>
            </div>
        )}
      </div>
  );
}

export default GithubIssueHelper;