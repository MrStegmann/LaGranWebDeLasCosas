import MinimalGlowingBtn from "../../framework/MinimalGlowingBtn";
import { useState } from "react";

export default function CircularMenu({
  items,
  radius = 256, // 256px = 32rem/2 por defecto
  maxVisible = 8,
  side = "left",
}) {
  // Mantén el arco que ya tenías
  const sideAngles = {
    left: { startAngle: 220, endAngle: 100 },
    right: { startAngle: 350, endAngle: 90 },
  };
  const endAngle = (sideAngles[side].endAngle * Math.PI) / 180;
  const startAngle = (sideAngles[side].startAngle * Math.PI) / 180;

  // Derivar tamaños de los anillos desde 'radius'
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

      {/* Items alineados al borde derecho del círculo */}
      {visibleItems.map((item, i) => {
        const angle =
          startAngle + (i / (maxVisible - 1)) * (endAngle - startAngle);

        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <MinimalGlowingBtn
            id={item.id}
            onClick={item.fnc}
            key={scrollIndex + i}
            customClass="absolute transition w-2/3"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(${x}px, ${y}px) translate(-100%, -50%)`,
            }}
          >
            {item.label}
          </MinimalGlowingBtn>
        );
      })}
    </div>
  );
}
