import PropTypes from "prop-types";
import { useState } from "react";

const LiGAC = ({ children }) => {
  const [isOver, setIsOver] = useState(false);
  return (
    <li
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      className={`bg-blue-dragon/50 w-full border border-mana flex flex-row justify-between rounded-xl my-5 px-4 py-3 hover:border-arcane-spell transition duration-200 ${isOver ? "animate-pulseGlow" : ""}`}
    >
      {children}
    </li>
  );
};

LiGAC.propTypes = {
  children: PropTypes.element.isRequired,
};

export default LiGAC;
