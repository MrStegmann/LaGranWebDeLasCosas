import { useState } from "react";

const GlowingDiv = ({ children }) => {
  const [isOver, setIsOver] = useState(false);
  return (
    <div
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      className={`bg-blue-dragon/50 w-full border border-mana flex flex-col justify-between rounded-xl my-5 px-4 py-3 hover:border-arcane-spell transition duration-200 ${isOver ? "animate-pulseGlow" : ""}`}
    >
      {children}
    </div>
  );
};

export default GlowingDiv;
