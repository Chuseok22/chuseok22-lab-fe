'use client'

import {MouseEventHandler} from "react";

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function IsDuplicatedConfirmButton({onClick}: Props) {
  return (
      <button type="button"
              onClick={onClick}
              className="border-2 border-green-500 px-1 lg:px-3 py-1 text-xs lg:text-sm bg-green-500 text-white inline-block font-semibold hover:bg-white hover:text-green-500">
        중복 확인
      </button>
  );
};