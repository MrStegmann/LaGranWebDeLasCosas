import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { usePageStore } from "../store/PageStore";

const PageGAC = ({ children }) => {
  const toAppear = usePageStore((state) => state.toAppear);
  const setToAppear = usePageStore((state) => state.setToAppear);

  useEffect(() => {
    if (!toAppear) {
      setTimeout(() => setToAppear(true), 1000);
    }
  }, [toAppear]);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={`w-full h-dvh flex flex-col justify-center items-center transition-all duration-800 ${
        !toAppear
          ? "opacity-0 translate-x-96 scale-0"
          : "opacity-100 translate-x-0 scale-100"
      }`}
    >
      {children}
    </div>
  );
};

PageGAC.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageGAC;
