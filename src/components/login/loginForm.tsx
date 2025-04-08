import {FaRegEnvelope} from "react-icons/fa";
import {MdLockOutline} from "react-icons/md";
import Link from "next/link";

function LoginForm() {
  return(
      <div className="flex flex-col items-center">
        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
          <FaRegEnvelope className="text-gray-400 m-2"/>
          <input type="text" id="username" name="id" placeholder="아이디를 입력하세요" className="bg-inherit outline-none text-sm flex-1"/>
        </div>
        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
          <MdLockOutline className="text-gray-400 m-2"/>
          <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요" className="bg-inherit outline-none text-sm flex-1"/>
        </div>
        <div className="flex w-64 mb-5 justify-between">
          <label className="flex items-center text-xs">
            <input type="checkbox" name="remember" className="mr-1"/>Remember me
          </label>
          <Link href="" className="text-xs">Forget Password?</Link>
        </div>
        <Link href="" className="border-2 border-green-500 rounded-full px-12 py-2 text-green-500 inline-block font-semibold hover:bg-green-500 hover:text-white">Sign In</Link>
      </div>
  )
};

export default LoginForm;