import React from "react";

const ButtonGAC = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="px-6 py-2 mt-5 bg-blue-dragon  text-mana font-semibold rounded-lg shadow-md hover:scale-105 border border-mana hover:ring-2 hover:ring-mana transition-transform duration-300"
    >
      {children}
    </button>
  );
};

export default ButtonGAC;
