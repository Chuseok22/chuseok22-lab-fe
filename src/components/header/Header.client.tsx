'use client'

import { useCallback, useState } from "react";
import Image from "next/image";
import SideMenuBar from "@/components/header/SideMenuBar";

interface HeaderClientProps {
  username: string | null;
}

const HeaderClient = ({username}: HeaderClientProps) => {
  const [open, setOpen] = useState(false);
  const toggleSidebar = useCallback(() => setOpen(prev => !prev), []);

  return (
      <>
        <div className='lg:hidden bg-sky-50 flex justify-end px-4'>
          <button onClick={toggleSidebar}>
            <Image src='/menu-rounded.svg' alt='menu' width='20' height='20'/>
          </button>
        </div>
        <SideMenuBar username={username} isSidebarOpen={open} toggleSidebar={toggleSidebar}/>
      </>
  )
}

export default HeaderClient;