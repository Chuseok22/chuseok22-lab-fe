'use client'

import Link from 'next/link';

export interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface DropdownMenuProps {
  items: DropdownItem[];
}

export function DropdownMenu({ items }: DropdownMenuProps) {
  return (
      <div className="hidden lg:block absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
        {items.map((item, idx) =>
            item.href ? (
                <Link
                    key={idx}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {item.label}
                </Link>
            ) : (
                <button
                    key={idx}
                    onClick={item.onClick}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {item.label}
                </button>
            )
        )}
      </div>
  );
}