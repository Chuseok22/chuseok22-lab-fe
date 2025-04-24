import clsx from "clsx";

interface SubmitButtonProps {
  type: "submit" | "reset" | "button";
  text: string;
  isGreen?: boolean;
}

const SubmitButton = ({
                        type = 'submit',
                        text,
                        isGreen = false
                      }: SubmitButtonProps) => {

  const baseStyles = 'border-2 rounded-full inline-block font-semibold cursor-pointer';
  const sizeStyles = 'px-5 lg:px-12 py-1 lg:py-2 mb-5';
  const colorStyles = clsx({
    'border-white bg-green-500 text-white hover:bg-white hover:text-green-500 hover:border-white': isGreen,
    'border-green-500 bg-white text-green-500 hover:bg-green-500 hover:text-white hover:border-green-500': !isGreen,
  });

  return (
      <button type={type} className={clsx(baseStyles, sizeStyles, colorStyles)}>
        {text}
      </button>
  );
}

export default SubmitButton;