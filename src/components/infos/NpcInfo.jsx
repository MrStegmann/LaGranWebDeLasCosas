import { useState, useEffect } from "react";
import useSheet from "@/context/SheetContext";
import _ from "../../helpers/Translator";
import PropTypes from "prop-types";

const NpcInfo = ({ npcData }) => {
  const { Npc } = useSheet();
  const [npcState, setNpcState] = useState({});

  const npc = Npc.fromRaw(npcData);

  useEffect(() => {
    if (npcData) {
      setNpcState({
        ...npcData,
        hp: npc.hp,
        ap: npc.ap,
        sp: npc.sp,
        pDamage: npc.pDamage,
        sDamage: npc.sDamage,
        pDefense: npc.pDefense,
        sDefense: npc.sDefense,
      });
    }
  }, [npcData]);

  if (!npcData) return null;

  return (
    <div className="bg-[#3c291f]/80 p-6 rounded-2xl shadow-xl shadow-black/60 border-4 border-[#5a3b2e] text-[#f0d9b5] w-full max-w-4xl mx-auto font-serif tracking-wide">
      <h2 className="text-3xl font-extrabold text-center border-b-2 border-[#f0d9b5] pb-2 mb-4">
        {npcState.name}
      </h2>

      {/* Info Básica */}
      <div className="grid grid-cols-3 gap-4 text-lg mb-6">
        <p>
          <strong>Nivel:</strong> {npcState.level}
        </p>
        <p>
          <strong>Categoría:</strong> {_("es", npcState.category)}
        </p>
        <p>
          <strong>Arma:</strong> {_("es", npcState.weapon)}
        </p>
      </div>

      {/* Vida y recursos */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-lg">
        <p>
          <strong>HP:</strong> {npcState.hp}
        </p>
        <p>
          <strong>AP:</strong> {npcState.ap}
        </p>
        <p>
          <strong>SP:</strong> {npcState.sp}
        </p>
      </div>

      {/* Atributos */}
      <h3 className="text-2xl font-bold border-b border-[#f0d9b5] pb-1 mb-2 mt-6">
        Atributos
      </h3>
      <div className="grid grid-cols-4 gap-4 text-base">
        <p>
          <strong>Fuerza:</strong> {npcState.strength}
        </p>
        <p>
          <strong>Destreza:</strong> {npcState.dexterity}
        </p>
        <p>
          <strong>Constitución:</strong> {npcState.constitution}
        </p>
        <p>
          <strong>Inteligencia:</strong> {npcState.intelligence}
        </p>
        <p>
          <strong>Voluntad:</strong> {npcState.willpower}
        </p>
        <p>
          <strong>Sabiduría:</strong> {npcState.wisdom}
        </p>
        <p>
          <strong>Carisma:</strong> {npcState.charisma}
        </p>
      </div>

      {/* Daño y Defensa */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="text-xl font-semibold border-b border-[#f0d9b5] mb-2">
            Daño
          </h3>
          <p>Físico: {npcState.pDamage}</p>
          <p>Mágico: {npcState.sDamage}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold border-b border-[#f0d9b5] mb-2">
            Defensa
          </h3>
          <p>Física: {npcState.pDefense}</p>
          <p>Mágica: {npcState.sDefense}</p>
        </div>
      </div>

      {/* Hechizos */}
      {npcState.spells?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold border-b border-[#f0d9b5] pb-1 mb-2">
            Hechizos
          </h3>
          <ul className="space-y-2 list-disc ml-6">
            {npcState.spells.map((spell) => (
              <li key={spell._id} className="border-b border-[#f0d9b5] pb-2">
                <p className="text-lg font-semibold text-yellow-100">
                  {spell.name}
                  <span className="text-sm font-normal text-gray-300">
                    {" ( "}Poder: {spell.power} | Acciones: {spell.actions} |
                    Turnos: {spell.turns} | Nivel: {spell.level}
                    {" )"}
                  </span>
                </p>
                <p className="text-sm text-white">{spell.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Habilidades */}
      {npcState.skills?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold border-b border-[#f0d9b5] pb-1 mb-2">
            Habilidades
          </h3>
          <ul className="space-y-2 list-disc ml-6">
            {npcState.skills.map((skill) => (
              <li key={skill._id} className="border-b border-[#f0d9b5] pb-2">
                <p className="text-lg font-semibold text-yellow-100">
                  {skill.name}
                  <span className="text-sm font-normal text-gray-300">
                    {" ( "}Tipo: {skill.type} | Acciones: {skill.actions} |
                    Turnos: {skill.turns}
                    {" )"}
                  </span>
                </p>
                <p className="text-sm text-white">{skill.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

NpcInfo.propTypes = {
  npcData: PropTypes.object.isRequired,
};

export default NpcInfo;
