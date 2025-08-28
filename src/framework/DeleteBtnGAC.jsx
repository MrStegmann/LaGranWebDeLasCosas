import React from "react";

const DeleteBtnGAC = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="px-6 py-2 bg-blue-dragon  text-arcane-spell font-semibold rounded-lg shadow-md hover:scale-105 border border-arcane-spell hover:ring-2 hover:ring-arcane-spell transition-transform duration-300"
    >
      {children}
    </button>
  );
};

export default DeleteBtnGAC;
