import MinimalGlowingBtn from "@/framework/MinimalGlowingBtn";
import { useState } from "react";

export default function CircularMenu({
  items,
  radius = 256,
  maxVisible = 8,
  side = "left",
}) {
  const sideAngles = {
    left: { startAngle: 220, endAngle: 100 },
    right: { startAngle: 300, endAngle: 400 },
  };
  const endAngle = (sideAngles[side].endAngle * Math.PI) / 180;
  const startAngle = (sideAngles[side].startAngle * Math.PI) / 180;

  const outerSizePx = radius * 2; // círculo exterior
  const innerRatio = 29 / 32; // tu relación 29rem/32rem ≈ 0.90625
  const innerSizePx = outerSizePx * innerRatio; // círculo interior

  const [scrollIndex, setScrollIndex] = useState(0);

  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    const itemHeight = 40; // ajusta a la altura real de tus botones si difiere
    const newIndex = Math.floor(scrollTop / itemHeight);
    setScrollIndex(newIndex);
  };

  const visibleItems = items.slice(scrollIndex, scrollIndex + maxVisible);

  return (
    <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
      {/* Decoración circular (derivada del radius) */}
      <div
        className="absolute rounded-full border-mana border-b animate-spinSlow pointer-events-none"
        style={{ width: outerSizePx, height: outerSizePx }}
      />
      <div
        className="absolute rounded-full border-arcane-spell border-b animate-spinReverse pointer-events-none"
        style={{ width: innerSizePx, height: innerSizePx }}
      />

      {/* Contenedor scroll invisible */}
      <div
        className="absolute w-full h-full overflow-y-scroll opacity-0"
        onScroll={handleScroll}
      >
        <div style={{ height: `${items.length * 40}px` }} />
      </div>

      {visibleItems.map((item, i) => {
        const angle =
          startAngle + (i / (maxVisible - 1)) * (endAngle - startAngle);

        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        // ajuste según el lado
        const translate =
          side === "left" ? "translate(-100%, -50%)" : "translate(0, -50%)";

        return (
          <MinimalGlowingBtn
            id={item.id}
            onClick={item.fnc}
            side={side}
            key={scrollIndex + i}
            customClass="absolute transition"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(${x}px, ${y}px) ${translate}`,
            }}
          >
            {item.label}
          </MinimalGlowingBtn>
        );
      })}
    </div>
  );
}
