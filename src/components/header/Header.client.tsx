'use client'

import { useState } from "react";
import Image from "next/image";
import SideMenuBar from "@/components/header/SideMenuBar";

const HeaderClient = () => {
  const [open, setOpen] = useState(false);
  return (
      <>
        <div className='lg:hidden flex justify-end px-4'>
          <button onClick={() => setOpen(prev => !prev)}>
            <Image src='/menu-rounded.svg' alt='menu' width='20' height='20'/>
          </button>
        </div>
        <SideMenuBar isSidebarOpen={open} toggleSidebar={() => setOpen(prev => !prev)}/>
      </>
  )
}

export default HeaderClient;