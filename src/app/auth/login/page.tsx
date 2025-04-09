import '../../globals.css'
import Link from "next/link";
import {FaFacebook, FaGoogle, FaInstagram} from 'react-icons/fa'
import LoginForm from "@/components/login/loginForm";

export default function Login() {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-green-500">Company</span> Name
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-green-500 mb-2">Sign in to </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <Link href="" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaFacebook className="text-sm"/>
                </Link>
                <Link href="" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaGoogle className="text-sm"/>
                </Link>
                <Link href="" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaInstagram className="text-sm"/>
                </Link>
              </div>
              <p className="text-gray-400 mb-3">or use your email account</p>
              <LoginForm/>
            </div>
          </div>
          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-5">Chuseok22 Lab 첫 방문이신가요?</p>
            <Link href="/auth/join" className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">Sign Up</Link>
          </div>
        </div>
      </div>
  );
};