import React from "react";

const AzulitoDrake = ({ overSomething, dragonSpeech, dragonType }) => {
  return (
    <div className="relative w-64 flex flex-col items-center">
      {/* Disco flotante */}
      <div className="absolute bottom-0 w-80 h-6 rounded-full backdrop-blur-sm shadow-lg shadow-mana/60" />

      {/* Imagen del dragón posado */}
      <img
        className="relative z-10 w-full h-auto -mb-2"
        src={`/Azulito_${dragonType}.png`}
        alt="Azulito Drake"
      />

      {/* Bocadillo */}
      <div
        className={`absolute left-20 bottom-56 transform -translate-x-full w-72 text-sm bg-blue-dragon/90 text-mana border rounded-4xl p-5 transition-opacity duration-300 ${
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
