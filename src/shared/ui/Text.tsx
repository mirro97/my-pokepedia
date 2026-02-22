import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const GalmuriText = ({ children, className = "" }: Props) => (
  <p className={`font-galmuri ${className}`}>{children}</p>
);
