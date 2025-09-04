import React from "react";
import ButtonGAC from "./ButtonGAC";

const MinimalForm = ({ buttonText, children, ...props }) => {
  return (
    <form {...props} className="rounded-2xl text-mana w-full mx-auto space-y-2">
      {children}

      <ButtonGAC
        type="submit"
        className="px-6 py-2 mt-5 bg-blue-dragon  text-mana font-semibold rounded-lg shadow-md hover:scale-105 border border-mana hover:ring-2 hover:ring-mana transition-transform duration-300"
      >
        {buttonText}
      </ButtonGAC>
    </form>
  );
};

export default MinimalForm;
