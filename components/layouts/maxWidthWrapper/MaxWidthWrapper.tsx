import React from "react";

interface IMaxWidthWrapper {
  styles?: string;
  children: React.ReactNode;
}

const MaxWidthWrapper: React.FC<IMaxWidthWrapper> = ({ styles, children }) => {
  return (
    <div className={`max-w-[1128px] h-full w-full mx-auto py-32 px-8 ${styles}`}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
