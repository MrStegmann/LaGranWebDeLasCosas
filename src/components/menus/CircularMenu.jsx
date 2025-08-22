import MinimalGlowingBtn from "../../framework/MinimalGlowingBtn";
import { useState } from "react";

export default function CircularMenu({
  items,
  radius = 240,
  maxVisible = 8,
  offset = 120,
  side = "left",
}) {
  const sideAngles = {
    left: {
      endAngle: 100,
      startAngle: 220,
    },
    right: {
      endAngle: 90,
      startAngle: 350,
    },
  };
  const endAngle = (sideAngles[side].endAngle * Math.PI) / 180;
  const startAngle = (sideAngles[side].startAngle * Math.PI) / 180;

  const [scrollIndex, setScrollIndex] = useState(0);

  // manejar el scroll manualmente
  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    const itemHeight = 40; // altura aproximada de cada botón
    const newIndex = Math.floor(scrollTop / itemHeight);
    setScrollIndex(newIndex);
  };

  // items visibles basados en scrollIndex
  const visibleItems = items.slice(scrollIndex, scrollIndex + maxVisible);

  return (
    <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
      {/* Decoración circular */}
      <div className="absolute w-[32rem] h-[32rem] rounded-full border-mana border-b animate-spinSlow"></div>
      <div className="absolute w-[29rem] h-[29rem] rounded-full border-arcane-spell border-b animate-spinReverse"></div>

      {/* Contenedor scroll invisible */}
      <div
        className="absolute w-full h-full overflow-y-scroll opacity-0"
        onScroll={handleScroll}
      >
        <div style={{ height: `${items.length * 40}px` }} />
      </div>

      {/* Render de los items visibles en el arco */}
      {visibleItems.map((item, i) => {
        const angle =
          startAngle + (i / (maxVisible - 1)) * (endAngle - startAngle);
        const x = (radius + offset) * Math.cos(angle);
        const y = (radius + offset) * Math.sin(angle);

        return (
          <MinimalGlowingBtn
            id={item.id}
            onClick={item.fnc}
            key={scrollIndex + i}
            customClass="absolute transition"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            {item.label}
          </MinimalGlowingBtn>
        );
      })}
    </div>
  );
}
