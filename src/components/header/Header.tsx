'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SideMenuBar from "@/components/header/SideMenuBar";

export const navItems = [
  {href: '/', label: 'Home'},
  {href: '/github/issue-helper', label: 'Issue Helper'},
  {href: '/auth/login', label: 'Login'},
  {href: '/', label: 'Search', icon: '/search.svg'},
]

const Header: React.FC = () => {

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  }

  return (
      <header className="flex bg-green-300 py-3 mt-5 items-center">
        <div className="flex-4 lg:flex-2 px-3 items-center">
          <Link href="/">
            <Image src="/erlenmeyer-flask.svg" alt="flask" width="20" height="20" className="inline-block"/>
            <span className="font-bold p-1.5">Chuseok22 LAB</span>
          </Link>
        </div>
        <nav className="hidden lg:flex flex-1 justify-around">
          {navItems.map((item, index) => (
              <div
                  key={index}
                  className="flex items-center"
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
        <nav className="lg:hidden flex flex-1 justify-around items-center">
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