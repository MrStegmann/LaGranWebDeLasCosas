import React, { useRef, useState, useEffect } from "react";

const VerticalMenu = ({ items, spacing = 12, getActiveItem }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(items[0]);
  const totalItems = items.length;

  const handleScroll = (event) => {
    event.preventDefault();
    if (event.deltaY > 0) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems);
    } else if (event.deltaY < 0) {
      setActiveIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    }
  };

  useEffect(() => setActiveItem(items[activeIndex]), [activeIndex]);
  useEffect(() => getActiveItem(activeItem), [activeItem]);

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("wheel", handleScroll, {
        passive: false,
      });
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("wheel", handleScroll);
      }
    };
  }, [totalItems]);

  return (
    <div
      className="relative h-dvh w-full flex flex-col items-center justify-center overflow-hidden"
      ref={carouselRef}
    >
      <div className="relative h-2/3 w-full flex flex-col items-center justify-center">
        {items.map((item, index) => {
          const distance = Math.abs(index - activeIndex);
          const scale = 1 - Math.min(distance * 0.2, 0.6);
          const opacity = 1 - Math.min(distance * 0.3, 0.9);
          // Usamos el prop 'spacing' en el cálculo
          const translateY = (index - activeIndex) * spacing;

          return (
            <div
              key={index}
              className={`absolute w-2/3 text-xl transition-all text-mana font-bold duration-500 ease-in-out ${activeIndex === index ? "animate-pulseTextGlow" : ""}`}
              style={{
                transform: `translateY(${translateY}rem) scale(${scale})`,
                opacity: opacity,
                zIndex: totalItems - distance,
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalMenu;
