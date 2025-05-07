'use client'

import Link from "next/link";
import React from "react";
import { navItems } from "@/components/header/navItems";
import UsernameSection from "@/components/header/UsernameSection";


interface SideMenuBarProps {
  username: string | null;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SideMenuBar = ({username, isSidebarOpen, toggleSidebar}: SideMenuBarProps) => {
  return (
      <div className={`fixed top-0 py-3 right-0 h-full bg-green-200 shadow-lg transform transition duration-300 ease-in-out z-50 lg:hidden ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex justify-between items-center p-4 border-green-300'>
          <UsernameSection username={username}/>
          <button onClick={toggleSidebar} className='text-gray-600 font-bold text-xl hover:text-gray-800 cursor-pointer'>x</button>
        </div>
        <div className='bg-black border-1 mx-5'></div>
        <nav className='flex flex-col p-5'>
          {navItems.map((item) => (
              <Link href={item.href}
                    key={item.label}
                    className="py-2 px-4 text-gray-7000 hover:text-black hover:bg-green-300 rounded transition-colors duration-200"
                    onClick={toggleSidebar}
              >
                {item.label}
              </Link>
          ))}
        </nav>
      </div>
  )
}

export default SideMenuBar;