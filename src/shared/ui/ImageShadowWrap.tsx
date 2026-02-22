import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ImageShadowWrap = ({ children }: Props) => {
  return (
    <div className="shadow-sm hover:shadow-md hover:animate-pulse rounded-md mb-7">
      {children}
    </div>
  );
};

export default ImageShadowWrap;
