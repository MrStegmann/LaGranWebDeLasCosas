import { useState } from "react";

const MinimalGlowingBtn = ({ id, customClass, children, ...props }) => {
  const [glowIt, setGlowIt] = useState("");
  return (
    <button
      id={id}
      onMouseOver={(e) => setGlowIt(e.target.id)}
      onMouseLeave={() => setGlowIt("")}
      className={`${customClass?.includes("absolute") ? customClass : `${customClass} relative`}  text-mana text-center text-xl font-bold cursor-pointer px-10 transition-all duration-1000 bg-transparent rounded-full border-r-4 border-b-2 border-mana ${glowIt === id ? "animate-pulseTextGlow" : ""}`}
      {...props}
    >
      {children}
      <span
        className={`absolute -z-10 top-0 right-0 h-full transition-all rounded-full duration-700 ${
          glowIt === id
            ? "w-full bg-gradient-to-l from-mana/50 to-arcane-bright/0"
            : "w-0  bg-gradient-to-r from-arcane-bright/0 to-mana/50"
        }`}
      ></span>
    </button>
  );
};

export default MinimalGlowingBtn;
