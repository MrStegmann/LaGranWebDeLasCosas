import React from "react";

const CodexShape = ({ children }) => {
  return (
    <div className="text-mana h-[80vh]  w-[48%] flex flex-col space-y-5">
      {children}
    </div>
  );
};

export default CodexShape;
