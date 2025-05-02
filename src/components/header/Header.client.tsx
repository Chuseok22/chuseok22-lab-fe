'use client'

import { useCallback, useState } from "react";
import Image from "next/image";
import SideMenuBar from "@/components/header/SideMenuBar";

const HeaderClient = () => {
  const [open, setOpen] = useState(false);
  const toggleSidebar = useCallback(() => setOpen(prev => !prev), []);

  return (
      <>
        <div className='lg:hidden flex justify-end px-4'>
          <button onClick={toggleSidebar}>
            <Image src='/menu-rounded.svg' alt='menu' width='20' height='20'/>
          </button>
        </div>
        <SideMenuBar isSidebarOpen={open} toggleSidebar={toggleSidebar}/>
      </>
  )
}

export default HeaderClient;