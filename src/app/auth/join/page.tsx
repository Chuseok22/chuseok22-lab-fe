import Link from "next/link";

export default function Join() {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-1/3 max-w-4xl py-20">
          <div className="py-10 bg-white w-full rounded-tr-2xl rounded-tl-2xl">
            <h2 className="text-3xl font-bold text-green-500 mb-2">Sign Up</h2>
            <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
            <p className="mb-3">가입을 통해 더 다양한 서비스를 만나보세요!</p>
          </div>
          <div className="bg-white flex flex-col items-center rounded-br-2xl rounded-bl-2xl">
            <div className="bg-gray-100 w-2/3 p-2 flex items-center mb-3">
              <input type="text" id="username" name="id" placeholder="아이디를 입력하세요" className="bg-inherit outline-none text-sm flex-1 m-2"/>
              <Link href="" className="border-2 border-green-500 px-4 py-1.5 text-sm bg-green-500 text-white inline-block font-semibold hover:bg-white hover:text-green-500">중복 확인</Link>
            </div>
            <div className="mb-5">

            </div>
            <div className="bg-gray-100 w-2/3 p-2 flex items-center mb-3">
              <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요" className="bg-inherit outline-none text-sm flex-1 m-2"/>
            </div>
            <div className="mb-5">

            </div>
            <div className="bg-gray-100 w-2/3 p-2 flex items-center mb-3">
              <input type="password" id="passwordCheck" name="passwordCheck" placeholder="비밀번호를 다시 입력해주세요" className="bg-inherit outline-none text-sm flex-1 m-2"/>
            </div>
            <div className="mb-5">

            </div>
            <div className="bg-gray-100 w-2/3 p-2 flex items-center mb-3">
              <input type="text" id="nickname" name="nickname" placeholder="닉네임을 입력해주세요" className="bg-inherit outline-none text-sm flex-1 m-2"/>
              <Link href="" className="border-2 border-green-500 px-4 py-1.5 text-sm bg-green-500 text-white inline-block font-semibold hover:bg-white hover:text-green-500">중복 확인</Link>
            </div>
            <div className="mb-5">

            </div>
            <Link href="" className="border-2 border-green-500 bg-green-500 rounded-full px-12 py-2 text-white inline-block font-semibold hover:bg-white hover:text-green-500">가입하기</Link>
          </div>
        </div>
      </div>
  );
};