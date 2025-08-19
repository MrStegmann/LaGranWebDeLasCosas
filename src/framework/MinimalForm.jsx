import React from "react";

const MinimalForm = ({ buttonText, children, ...props }) => {
  return (
    <form
      {...props}
      className="p-8 rounded-2xl text-mana w-full mx-auto space-y-6"
    >
      {children}

      <button
        type="submit"
        className="px-6 py-2 mt-5 bg-blue-dragon  text-mana font-semibold rounded-lg shadow-md hover:scale-105 hover:ring-2 hover:ring-mana transition-transform duration-300"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default MinimalForm;
