'use client'

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { DropdownItem, DropdownMenu } from "@/components/header/DropdownMenu";

interface UsernameSectionProps {
  username: string | null;
}

const UsernameSection = ({username}: UsernameSectionProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setOpen(false));
  const menuItems: DropdownItem[] = [
    {label: 'My Page', href: '/my-page'},
    {
      label: 'Logout', onClick: () => {
        // TODO: 로그이웃 API 호출 및 라다이랙트
      },
    },
  ];

  // 로그인 된 사용자
  if (username) {
    return (
        <div ref={containerRef} className="relative">
          <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center focus:outline-none cursor-pointer"
          >
            <Image src="/profile-icon.svg" alt="profile" width={30} height={30}/>
            <p className="text-sm px-2 font-bold">{username}</p>
          </button>

          {open && <DropdownMenu items={menuItems}/>}
        </div>
    );
  }

  return (
      <Link href="/auth/login" className="flex items-center">
        <Image src="/profile-icon.svg" alt="profile" width={30} height={30}/>
        <p className="text-sm px-2 font-bold">Login</p>
      </Link>
  );
}

export default UsernameSection;