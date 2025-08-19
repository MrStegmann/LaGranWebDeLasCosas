import React, { useState } from "react";

const MinimalGlowingBtn = ({ id, children, ...props }) => {
  const [glowIt, setGlowIt] = useState("");
  return (
    <button
      id={id}
      onMouseOver={(e) => setGlowIt(e.target.id)}
      onMouseLeave={() => setGlowIt("")}
      className={`text-mana text-left text-xl font-bold cursor-pointer transition-all ${glowIt === id ? "animate-pulseTextGlow scale-110" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default MinimalGlowingBtn;
