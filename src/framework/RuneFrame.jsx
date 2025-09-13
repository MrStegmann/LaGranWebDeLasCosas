import React, { useRef, useState, useEffect, useLayoutEffect } from "react";

const runes = [
  "ᚠ",
  "ᚢ",
  "ᚦ",
  "ᚨ",
  "ᚱ",
  "ᛃ",
  "ᛏ",
  "ᛒ",
  "ᛖ",
  "ᛗ",
  "ᛚ",
  "ᚠ",
  "ᚾ",
  "ᛇ",
  "ᚺ",
  "ᛜ",
  "ᛞ",
  "ᛟ",
  "ᚪ",
  "ᚷ",
];
export default function RuneFrame({
  sides = "all", // "all" | "x" | "y" | "t" | "b" | "l" | "r"
  showContent,
  setShowContent,
  children,
}) {
  const containerRef = useRef(null);
  const runeRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Función que repite las runas hasta alcanzar el número requerido
  const fillRunes = (count) => {
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(runes[i % runes.length]);
    }
    return arr;
  };

  const setBorderBySide = (side) => {
    return "border-" + side;
  };
  const container = containerRef?.current?.getBoundingClientRect();
  const rune = runeRef?.current?.getBoundingClientRect();
  const runesPerRow = Math.floor((container?.width || 0) / (rune?.width || 12));
  const runesPerCol = Math.floor(
    (container?.height || 0) / (rune?.height || 15)
  );
  const counts = {
    top: runesPerRow,
    bottom: runesPerRow,
    left: runesPerCol,
    right: runesPerCol,
  };

  return (
    <div
      ref={containerRef}
      className={`rune-frame-container relative flex items-center justify-center backdrop-blur-md rounded-3xl transition-all duration-300 ${showContent ? "w-full" : "w-16"}  h-full overflow-hidden ${sides === "all" ? "border" : setBorderBySide(sides)} border-mana`}
    >
      {/* Top */}
      <div
        className={`absolute flex flex-row top-0 px-1 w-full justify-between space-x-1 ${sides === "all" || sides === "y" || sides === "t" ? "opacity-100" : "opacity-0"}`}
      >
        {fillRunes(counts.top).map((rune, idx) => (
          <p
            key={`top-${idx}`}
            ref={idx === 0 ? runeRef : null}
            className="text-xs text-mana animate-pulseTextGlow"
          >
            {rune}
          </p>
        ))}
      </div>
      {/* Bottom */}
      <div
        className={`absolute flex flex-row bottom-0 px-1 w-full justify-between space-x-1 ${sides === "all" || sides === "y" || sides === "b" ? "opacity-100" : "opacity-0"}`}
      >
        {fillRunes(counts.bottom).map((rune, idx) => (
          <p
            key={`bottom-${idx}`}
            className="text-xs text-mana animate-pulseTextGlow"
          >
            {rune}
          </p>
        ))}
      </div>
      {/* Right */}

      <div
        className={`absolute flex flex-col right-1 py-1 h-full justify-between ${sides === "all" || sides === "x" || sides === "r" ? "opacity-100" : "opacity-0"}`}
      >
        {fillRunes(counts.right).map((rune, idx) => (
          <p
            key={`right-${idx}`}
            className="text-xs text-mana animate-pulseTextGlow"
          >
            {rune}
          </p>
        ))}
      </div>

      {/* Left */}
      <div
        className={`absolute flex flex-col left-1 py-1 h-full justify-between ${sides === "all" || sides === "x" || sides === "l" ? "opacity-100" : "opacity-0"}`}
      >
        {fillRunes(counts.left).map((rune, idx) => (
          <p
            key={`left-${idx}`}
            className="text-xs text-mana animate-pulseTextGlow"
          >
            {rune}
          </p>
        ))}
      </div>

      <div
        className={`rune-content relative flex justify-center items-center flex-col h-full z-10 px-10 py-5 transition-all duration-500 ${showContent ? "opacity-100 w-full" : "opacity-0 w-0"}`}
      >
        {children}
      </div>
    </div>
  );
}
