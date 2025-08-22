import React, { useState } from "react";

const MinimalGlowingBtn = ({ id, customClass, children, ...props }) => {
  const [glowIt, setGlowIt] = useState("");
  return (
    <button
      id={id}
      onMouseOver={(e) => setGlowIt(e.target.id)}
      onMouseLeave={() => setGlowIt("")}
      className={`${customClass} text-mana text-left text-xl font-bold cursor-pointer transition-all ${glowIt === id ? "animate-pulseTextGlow scale-105" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default MinimalGlowingBtn;
