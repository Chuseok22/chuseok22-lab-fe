'use client'

import React, {useState} from "react";
import {join, validateNickname, validateUsername} from "@/api/auth/auth";
import {useRouter} from "next/navigation";
import IsDuplicatedConfirmButton from "@/components/auth/join/IsDuplicatedConfirmButton";

export default function Join() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });
  const [infos, setInfos] = useState({
    username: '',
    passwordCheck: '',
    nickname: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    passwordCheck: '',
    nickname: ''
  });
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    setErrors((prev) => ({...prev, [name]: ''}));

    // 입력값 변경 시 상태 초기화
    if (name === 'username') {
      setInfos(prev => ({...prev, username: ''}))
      setErrors(prev => ({...prev, username: ''}))
      setIsUsernameValid(null);
    } else if (name === 'password') {
      // 비밀번호 변경 시 비밀번호 확인 메시지 초기화
      setInfos(prev => ({...prev, passwordCheck: ''}))
      setErrors(prev => ({...prev, passwordCheck: ''}))
    } else if (name === 'passwordCheck') {
      // 비밀번호 확인 입력 시 최신 입력값으로 비교
      if (formData.password !== value) { // 다른 경우
        setErrors(prev => ({...prev, passwordCheck: '비밀번호가 일치하지 않습니다.'}))
        setInfos(prev => ({...prev, passwordCheck: ''}))
      } else { // 같은 경우
        setErrors(prev => ({...prev, passwordCheck: ''}))
        setInfos(prev => ({...prev, passwordCheck: '비밀번호가 일치합니다.'}))
      }
    } else if (name === 'nickname') {
      setInfos(prev => ({...prev, nickname: ''}));
      setIsNicknameValid(null);
    }
  }

  const handleValidateUsername = async () => {
    const isValid = await validateUsername(formData.username);
    setIsUsernameValid(isValid);
    setInfos(prev => ({
      ...prev,
      username: isValid ? '사용가능한 아이디입니다.' : ''
    }));
    setErrors((prev) => ({
      ...prev,
      username: isValid ? '' : '이미 사용중인 아이디입니다.',
    }));
  };

  const handleValidateNickname = async () => {
    const isValid = await validateNickname(formData.nickname);
    setIsNicknameValid(isValid);
    setInfos(prev => ({
      ...prev,
      nickname: isValid ? '사용가능한 닉네임입니다.' : ''
    }));
    setErrors(prev => ({
      ...prev,
      nickname: isValid ? '' : '이미 사용중인 닉네임입니다.'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 일치 확인
    if (formData.password !== formData.passwordCheck) {
      setErrors(prev => ({...prev, passwordCheck: '비밀번호가 일치하지 않습니다.'}));
      return;
    }

    // 중복 확인 여부 체크
    if (!isUsernameValid || !isNicknameValid) {
      setErrors(prev => ({
        ...prev,
        username: isUsernameValid === null ? '아이디 중복 확인을 해주세요' : prev.username,
        nickname: isNicknameValid === null ? '닉네임 중복 확인을 해주세요' : prev.nickname
      }));
      return;
    }

    try {
      await join({
        username: formData.username,
        password: formData.password,
        nickname: formData.nickname
      });
      alert('회원가입 성공!');
      router.push('/auth/login');
    } catch (err) {
      if (err instanceof Error) {
        alert('회원가입 실패: ' + err.message);
      }
    }
  }

  return (
      <div className="min-h-screen flex flex-col items-center justify-center w-full flex-1 lg:px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-4/5 lg:w-1/3 max-w-md lg:max-w-2xl py-10 lg:py-20">
          <div className="py-6 lg:py-10 bg-white w-full rounded-tr-2xl rounded-tl-2xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-green-500 mb-2">Sign Up</h2>
            <div className="border-2 w-8 lg:w-10 border-green-500 inline-block mb-2"></div>
            <p className="mb-3 text-sm lg:text-base">가입을 통해 더 다양한 서비스를 만나보세요!</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white flex flex-col items-center rounded-br-2xl rounded-bl-2xl">
            <div className="bg-gray-100 w-4/5 lg:w-2/3 p-2 flex items-center mb-3">
              <input type="text"
                     id="username"
                     name="username"
                     autoComplete="off"
                     placeholder="아이디를 입력하세요"
                     className="bg-inherit outline-none text-xs lg:text-sm flex-1 m-2"
                     value={formData.username}
                     onChange={handleInputChange}
                     required/>
              <IsDuplicatedConfirmButton onClick={handleValidateUsername}/>
            </div>
            <div className="mb-3 w-4/5 lg:w-2/3 flex items-start">
              {errors.username ? (
                  <p className="text-red-500 text-xs">{errors.username}</p>
              ) : (
                  infos.username && <p className="text-green-500 text-xs">{infos.username}</p>
              )}
            </div>
            <div className="bg-gray-100 w-4/5 lg:w-2/3 p-2 flex items-center mb-3">
              <input type="password"
                     id="password"
                     name="password"
                     placeholder="비밀번호를 입력하세요"
                     className="bg-inherit outline-none text-xs lg:text-sm flex-1 m-2"
                     value={formData.password}
                     onChange={handleInputChange}
                     required/>
            </div>
            <div className="mb-3 w-4/5 lg:w-3/4 flex items-start">
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div className="bg-gray-100 w-4/5 lg:w-2/3 p-2 flex items-center mb-3">
              <input type="password"
                     id="passwordCheck"
                     name="passwordCheck"
                     placeholder="비밀번호를 다시 입력해주세요"
                     className="bg-inherit outline-none text-xs lg:text-sm flex-1 m-2"
                     value={formData.passwordCheck}
                     onChange={handleInputChange}
                     required/>
            </div>
            <div className="mb-3 w-4/5 lg:3/4 flex items-start">
              {errors.passwordCheck ? (
                  <p className="text-red-500 text-xs">{errors.passwordCheck}</p>
              ) : (
                  infos.passwordCheck && <p className="text-green-500 text-xs">{infos.passwordCheck}</p>
              )}
            </div>
            <div className="bg-gray-100 w-4/5 lg:w-2/3 p-2 flex items-center mb-3">
              <input type="text"
                     id="nickname"
                     name="nickname"
                     autoComplete="off"
                     placeholder="닉네임을 입력해주세요"
                     className="bg-inherit outline-none text-xs lg:text-sm flex-1 m-2"
                     value={formData.nickname}
                     onChange={handleInputChange}
                     required/>
              <IsDuplicatedConfirmButton onClick={handleValidateNickname}/>
            </div>
            <div className="mb-3 w-4/5 lg:3/4 flex items-start">
              {errors.nickname ? (
                  <p className="text-red-500 text-xs">{errors.nickname}</p>
              ) : (
                  infos.nickname && <p className="text-green-500 text-xs">{infos.nickname}</p>
              )}
            </div>
            <button type="submit"
                    className="border-2 border-green-500 bg-green-500 rounded-full px-5 lg:px-12 py-1 lg:py-2 text-white inline-block font-semibold hover:bg-white hover:text-green-500 mb-5">가입하기</button>
          </form>
        </div>
      </div>
  );
};