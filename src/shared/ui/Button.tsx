import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: Props) => (
  <button
    className="text-[#fff] bg-[#e3695ce9] py-3 px-6 rounded-lg hover:bg-[#e65e4fe9]"
    onClick={onClick}
  >
    {children}
  </button>
);
