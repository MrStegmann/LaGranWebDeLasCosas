import { useState } from "react";

const MinimalGlowingBtn = ({
  id,
  side = "left",
  customClass,
  children,
  ...props
}) => {
  const [glowIt, setGlowIt] = useState("");
  const effectBySide = {
    left: {
      btn: "border-r-4",
      span: "right-0",
      spanGlowIt: "bg-gradient-to-l from-mana/50 to-arcane-bright/0",
      spanNoGlowIt: "bg-gradient-to-r from-arcane-bright/0 to-mana/50",
    },
    right: {
      btn: "border-l-4",
      span: "left-0",
      spanGlowIt: "bg-gradient-to-r from-mana/50 to-arcane-bright/0",
      spanNoGlowIt: "bg-gradient-to-l from-arcane-bright/0 to-mana/50",
    },
  };
  return (
    <button
      id={id}
      onMouseOver={(e) => setGlowIt(e.target.id)}
      onMouseLeave={() => setGlowIt("")}
      className={`${customClass?.includes("absolute") ? customClass : `${customClass} relative`}  text-mana text-center text-lg font-bold cursor-pointer px-10 transition-all duration-1000 bg-transparent rounded-full ${effectBySide[side].btn} border-b-2 border-mana ${glowIt === id ? "animate-pulseTextGlow" : ""}`}
      {...props}
    >
      {children}
      <span
        className={`absolute -z-10 top-0 ${effectBySide[side].span} h-full transition-all rounded-full duration-700 ${
          glowIt === id
            ? `w-full ${effectBySide[side].spanGlowIt}`
            : `w-0 ${effectBySide[side].spanNoGlowIt}`
        }`}
      ></span>
    </button>
  );
};

export default MinimalGlowingBtn;
