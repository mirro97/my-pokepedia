import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className="text-[#fff] bg-[#e3695ce9] py-3 px-6 rounded-lg hover:bg-[#e65e4fe9]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
