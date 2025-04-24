'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SideMenuBar from "@/components/header/SideMenuBar";
import { getMemberInfo } from "@/lib/api/member";
import UsernameSection from "@/components/header/UsernameSection";

export const navItems = [
  {href: '/', label: 'Home'},
  {href: '/github/issue-helper', label: 'Issue Helper'},
  {href: '/', label: 'More'},
  {href: '/', label: 'Search', icon: '/search.svg'},
]

const Header = () => {

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  }

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUsername = async () => {
      const response = await getMemberInfo();
      setUsername(response.username);
    }

    fetchUsername();
  }, []);

  return (
      <header className="flex py-5 items-center bg-sky-50">
        <div className="flex-4 lg:flex-1 px-3 ml-3 lg:ml-10 items-center">
          <Link href="/">
            <Image src="/erlenmeyer-flask.svg" alt="flask" width="20" height="20" className="inline-block"/>
            <span className="font-bold p-1.5 text-lg text-blue-500">Chuseok22 LAB</span>
          </Link>
        </div>
        <nav className="hidden lg:flex flex-3 justify-around px-10 lg:mx-10">
          {navItems.map((item, index) => (
              <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.icon ? (
                    <Image src={item.icon} alt={item.label} width="20" height="20"/>
                ) : (
                    <Link href={item.href}
                          className={`px-2 py-1 transition-colors duration-200 ${
                              hoveredIndex === index ? 'text-black' : hoveredIndex === null ? 'text-gray-700' : 'text-gray-400'
                          }`}
                    >
                      {item.label}
                    </Link>
                )
                }
              </div>
          ))}
        </nav>
        <div className="hidden lg:flex flex-1">
          <UsernameSection username={username}/>
        </div>
        <nav className="lg:hidden flex flex-1 justify-around items-center mr-3">
          <div className="flex items-center">
            <Image src="/search.svg" alt="search" width={20} height={20}/>
          </div>
          <div className="flex items-center">
            <button onClick={toggleSidebar}>
              <Image src="/menu-rounded.svg" alt="menu" width="20" height="20"/>
            </button>
          </div>
        </nav>
        <SideMenuBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      </header>
  );
};

export default Header