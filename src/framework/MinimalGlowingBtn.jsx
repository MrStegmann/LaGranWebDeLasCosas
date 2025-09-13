import { useState } from "react";

const MinimalGlowingBtn = ({ id, children, ...props }) => {
  const [glowIt, setGlowIt] = useState("");
  return (
    <button
      id={id}
      onMouseOver={(e) => setGlowIt(e.target.id)}
      onMouseLeave={() => setGlowIt("")}
      className={`text-mana flex justify-center items-center relative px-10 py-5 h-16 text-xl font-bold cursor-pointer transition-all ${glowIt === id ? "animate-pulseTextGlow" : ""}`}
      {...props}
    >
      {/* Izquierda */}
      <span
        className={`w-0 h-4 top-0 right-0 absolute border-r-2 transition-all duration-1000 ${glowIt === id ? "h-full" : ""}`}
      ></span>
      {/* Derecha */}
      <span
        className={`w-0 h-4 bottom-0 left-0 absolute border-l-2 transition-all duration-1000 ${glowIt === id ? "h-full" : ""}`}
      ></span>
      {/* Arriba */}
      <span
        className={`w-4 h-0 top-0 right-0 absolute border-t-2 transition-all duration-1000 ${glowIt === id ? "w-full" : ""}`}
      ></span>
      {/* Abajo */}
      <span
        className={`w-4 h-0 bottom-0 left-0 absolute border-b-2 transition-all duration-1000 ${glowIt === id ? "w-full" : ""}`}
      ></span>

      {children}
    </button>
  );
};

export default MinimalGlowingBtn;
