import Link from "next/link";
import Image from "next/image";
import UsernameSection from "@/components/header/UsernameSection";
import React from "react";
import { navItems } from "@/components/header/navItems";
import { getMemberInfo } from "@/lib/api/home/member";
import HeaderClient from "@/components/header/Header.client";
import { MemberResponse } from "@/lib/api/home/member.type";

const HeaderServer = async () => {
  let username: string | null;
  try {
    const response: MemberResponse = await getMemberInfo();
    username = response.username;
  } catch {
    username = null;
  }

  return (
      <>
        <header className="flex py-5 items-center bg-sky-50 px-6 lg:px-12 justify-center">
          <div className="flex-4 lg:flex-1 px-3 ml-3 lg:ml-10 items-center justify-center">
            <Link href="/">
              <Image src="/erlenmeyer-flask.svg" alt="flask" width="20" height="20" className="inline-block"/>
              <span className="font-bold p-1.5 text-lg text-blue-500">Chuseok22 LAB</span>
            </Link>
          </div>
          <nav className="hidden lg:flex flex-4 justify-around">
            {navItems.map((item) => (
                <Link key={item.label}
                      href={item.href}
                      className='text-gray-700 hover:text-black hover:font-bold'>
                  {item.icon ? <Image src={item.icon} alt={item.label} width='20' height='20'/> : item.label}
                </Link>
            ))}
          </nav>
          <div className="hidden lg:flex lg:flex-1 items-center justify-center">
            <UsernameSection username={username}/>
          </div>
        </header>
        <HeaderClient/>
      </>
  );
}

export default HeaderServer;