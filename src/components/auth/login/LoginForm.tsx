'use client'

import {FaRegEnvelope} from "react-icons/fa";
import {MdLockOutline} from "react-icons/md";
import Link from "next/link";
import React, {useState} from "react";
import {login} from "@/lib/api/auth/auth";
import {useRouter} from "next/navigation";
import {LoginRequest} from "@/lib/api/auth/auth.type";
import SubmitButton from "@/components/github/issue-helper/SubmitButton";

function LoginForm() {

  const router = useRouter();
  const [formData, setFormData] = useState<LoginRequest>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target;
    setFormData(prevState => ({...prevState, [name]: value}));
    setError('');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({
        username: formData.username,
        password: formData.password
      });
      router.push('/');
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        setError('로그인 실패: 아이디 또는 비밀번호를 확인하세요');
      }
    }
  }

  return (
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="bg-gray-100 w-4/5 lg:w-2/3 p-2 flex items-center mb-3">
          <FaRegEnvelope className="text-gray-400 m-2"/>
          <input type="text"
                 id="username"
                 name="username"
                 placeholder="아이디를 입력하세요"
                 className="bg-inherit outline-none text-xs lg:text-sm flex-1"
                 value={formData.username}
                 onChange={handleInputChange}
                 required
                 autoComplete="off"/>
        </div>
        <div className="bg-gray-100 w-4/5 lg:w-2/3 p-2 flex items-center mb-3">
          <MdLockOutline className="text-gray-400 m-2"/>
          <input type="password"
                 id="password"
                 name="password"
                 placeholder="비밀번호를 입력하세요"
                 className="bg-inherit outline-none text-xs lg:text-sm flex-1"
                 value={formData.password}
                 onChange={handleInputChange}
                 required/>
        </div>
        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
        <div className="flex w-4/5 lg:w-2/3 mb-5 justify-between">
          <label className="flex items-center text-xs">
            <input type="checkbox" name="remember" className="mr-1"/>Remember me
          </label>
          <Link href="" className="text-xs">Forget Password?</Link>
        </div>
        <SubmitButton type={"submit"} text={"Sign In"} isGreen={false}/>
      </form>
  )
};

export default LoginForm;