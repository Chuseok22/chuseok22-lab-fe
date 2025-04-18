import React from "react";

interface SubmitButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  text: string;
  isGreen: boolean;
}

const SubmitButton = ({type, text, isGreen}: SubmitButtonProps) => {

  const baseStyles = 'border-2 rounded-full px-5 lg:px-12 py-1 lg:py-2 inline-block font-semibold mb-5 cursor-pointer';
  const colorStyles = isGreen
      ? 'border-white bg-green-500 text-white hover:bg-white hover:text-green-500 hover:border-white'
      : 'border-green-500 bg-white text-green-500 hover:bg-green-500 hover:text-white hover:border-green-500';

  return (
      <button
          type={type}
          className={`${baseStyles} ${colorStyles}`}
      >
        {text}
      </button>
  );
}

export default SubmitButton;