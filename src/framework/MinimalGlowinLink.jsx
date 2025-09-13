import React, { useState } from "react";
import { Link } from "react-router-dom";

const MinimalGlowinLink = ({ id, children, ...props }) => {
  const [glowIt, setGlowIt] = useState("");
  return (
    <Link
      id={id}
      onMouseOver={(e) => setGlowIt(e.target.id)}
      onMouseLeave={() => setGlowIt("")}
      className={`text-mana z-20 flex justify-center items-center relative px-10 py-5 h-16 text-xl font-bold cursor-pointer transition-all ${glowIt === id ? "animate-pulseTextGlow" : ""}`}
      {...props}
    >
      <span
        className={`w-4 h-4 top-0 right-0 absolute border-r-2 border-t-2 transition-all duration-1000 z-10  ${glowIt === id ? "w-full h-full" : ""}`}
      ></span>
      <span
        className={`w-4 h-4 bottom-0 left-0 absolute border-l-2 border-b-2 transition-all duration-1000 z-10 ${glowIt === id ? "w-full h-full" : ""}`}
      ></span>
      {children}
    </Link>
  );
};

export default MinimalGlowinLink;
