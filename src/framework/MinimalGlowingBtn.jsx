import React, { useState } from "react";

const MinimalGlowingBtn = ({ id, customClass, children, ...props }) => {
  const [glowIt, setGlowIt] = useState("");
  return (
    <button
      id={id}
      onMouseOver={(e) => setGlowIt(e.target.id)}
      onMouseLeave={() => setGlowIt("")}
      className={`${customClass} text-mana text-left text-xl font-bold cursor-pointer px-10 transition-all duration-1000 bg-transparent rounded-full border-l border-b border-mana ${glowIt === id ? "animate-pulseTextGlow bg-gradient-to-r from-mana/50 to-arcane-bright/10" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default MinimalGlowingBtn;
