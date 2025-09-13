import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLastMenu } from "@/store/PageStore";

export default function RingMenu({
  side = "right",
  menus,
  currentMenu,
  setCurrentMenu,
}) {
  const lastMenu = useLastMenu((state) => state.lastMenu);
  const setLastMenu = useLastMenu((state) => state.setLastMenu);
  const [mouseOver, setMouseOver] = useState(null);
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    setClicked(null);
  }, [currentMenu]);

  const goBackThrougtMenus = () => {
    console.log(lastMenu);
    const lastMenus = [...lastMenu];
    if (lastMenus.length > 0) {
      setCurrentMenu(lastMenus.pop());
      setLastMenu(lastMenus);
    }
  };
  const items =
    side === "right" ? menus[currentMenu] : [...menus[currentMenu]].reverse();

  // Posiciones en círculo (ajustar ángulos según izquierda o derecha)
  const angleStep = 180 / (items.length + 1);
  const offset = side === "right" ? -90 : 90;

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Centro */}
      <div className="absolute w-[28rem] h-[28rem] rounded-full border-mana border-b-2 animate-spinSlow pointer-events-none" />
      <div className="absolute w-[25rem] h-[25rem] rounded-full border-arcane-spell border-t-2 animate-spinSlow pointer-events-none" />
      <button
        className={`absolute w-16 h-16 font-bold text-4xl rounded-full flex items-center justify-center text-arcane-spell transition-opacity duration-1000 ${currentMenu === "main" ? "opacity-0" : "opacity-100 cursor-pointer"}`}
        onClick={goBackThrougtMenus}
      >
        {"<"}
      </button>

      <AnimatePresence>
        {items.map((item, i) => {
          const angle = offset + angleStep * (i + 1);
          const x = 325 * Math.cos((angle * Math.PI) / 180);
          const y = 285 * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, x, y }}
              exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className={`absolute flex items-center justify-center w-auto h-10 rounded-full text-mana text-center font-bold cursor-pointer px-10 border-b-2 ${side === "right" ? "border-l-4" : "border-r-4"}`}
              onMouseOver={() => setMouseOver(item.id)}
              onMouseLeave={() => setMouseOver(null)}
              onClick={() => {
                setClicked(item.id);

                if (item.submenu) {
                  setLastMenu([...lastMenu, currentMenu]);

                  setTimeout(() => setCurrentMenu(item.submenu), 600);
                }
                if (item.fnc) item.fnc();
              }}
            >
              {clicked === item.id ? (
                <motion.span
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute w-full h-full rounded-full bg-gradient-to-tr from-arcane-spell/60 to-arcane-bright/40"
                />
              ) : null}

              {side === "right" ? (
                <span
                  className={`absolute left-0 -z-10 w-0 h-5 transition-all rounded-full duration-700  bg-gradient-to-l from-mana/50 to-arcane-bright/0
                    ${mouseOver === item.id && "w-full h-full bg-gradient-to-r from-arcane-bright/0 to-mana/50"}`}
                ></span>
              ) : (
                <span
                  className={`absolute right-0 -z-10 w-0 h-5 transition-all rounded-full duration-700 bg-gradient-to-r from-mana/50 to-arcane-bright/0
                    ${mouseOver === item.id && "w-full h-full bg-gradient-to-l from-arcane-bright/0 to-mana/50"}`}
                ></span>
              )}
              {item.label}
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
