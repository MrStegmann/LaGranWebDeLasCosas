import { useRef } from "react";

const AzulitoDrake = ({ overSomething, dragonSpeech, dragonType }) => {
  const positionYRef = useRef(0);
  return (
    <div className="relative flex flex-col items-center">
      {/* Imagen del dragón posado */}
      <img
        className="relative z-10 w-[15rem] h-auto -mb-[7.8rem]"
        src={`/Azulito_${dragonType}.png`}
        alt="Azulito Drake"
      />
      {/* Disco flotante */}
      <img
        className="relative w-[25rem] h-auto"
        src={`/platformNexus.png`}
        alt="Platform Nexus"
      />

      {/* Bocadillo */}
      <div
        className={`absolute left-[10rem] bottom-[19rem] transform -translate-x-full w-64 text-sm bg-blue-dragon/90 text-mana border rounded-4xl p-5 transition-opacity duration-300 ${
          overSomething ? "opacity-100" : "opacity-0"
        }`}
      >
        {dragonSpeech}
        <span className="absolute -bottom-2 right-5 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-mana"></span>
      </div>
    </div>
  );
};

export default AzulitoDrake;
