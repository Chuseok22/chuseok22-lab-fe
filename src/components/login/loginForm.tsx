'use client'

import {FaRegEnvelope} from "react-icons/fa";
import {MdLockOutline} from "react-icons/md";
import Link from "next/link";
import {useState} from "react";
import {login} from "@/api/auth/auth";
import {router} from "next/client";

function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({username, password});
      await router.push('/');
    } catch (err) {
      setError('로그인 실패: 아이디 또는 비밀번호를 확인하세요');
    }
  }

  return (
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="bg-gray-100 w-2/3 p-2 flex items-center mb-3">
          <FaRegEnvelope className="text-gray-400 m-2"/>
          <input type="text"
                 id="username"
                 name="id"
                 placeholder="아이디를 입력하세요"
                 className="bg-inherit outline-none text-sm flex-1"
                 value={username}
                 onChange={e => setUsername(e.target.value)}
                 required
                 autoComplete="off"/>
        </div>
        <div className="bg-gray-100 w-2/3 p-2 flex items-center mb-3">
          <MdLockOutline className="text-gray-400 m-2"/>
          <input type="password"
                 id="password"
                 name="password"
                 placeholder="비밀번호를 입력하세요"
                 className="bg-inherit outline-none text-sm flex-1"
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 required/>
        </div>
        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
        <div className="flex w-64 mb-5 justify-between">
          <label className="flex items-center text-xs">
            <input type="checkbox" name="remember" className="mr-1"/>Remember me
          </label>
          <Link href="" className="text-xs">Forget Password?</Link>
        </div>
        <button type="submit"
                className="border-2 border-green-500 rounded-full px-12 py-2 text-green-500 inline-block font-semibold hover:bg-green-500 hover:text-white">
          Sign In
        </button>
      </form>
  )
};

export default LoginForm;