import React, { useState } from "react";
import { Link } from "react-router-dom";

const MinimalGlowinLink = ({ id, children, ...props }) => {
  const [glowIt, setGlowIt] = useState("");
  return (
    <Link
      id={id}
      onMouseOver={(e) => setGlowIt(e.target.id)}
      onMouseLeave={() => setGlowIt("")}
      className={`text-mana w-24 text-xl font-bold cursor-pointer transition-all ${glowIt === id ? "animate-pulseTextGlow scale-125" : ""}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default MinimalGlowinLink;
