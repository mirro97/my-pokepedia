import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className="text-white bg-accent py-3 px-6 rounded-lg hover:bg-accent-hover"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
