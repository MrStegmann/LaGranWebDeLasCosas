import { useEffect, useState } from "react";
import useAlert from "../../context/AlertContext";
import races from "@json/races.json" with { type: "json" };
import worgenData from "@json/worgenData.json" with { type: "json" };
import _ from "../../helpers/Translator";
import PropTypes from "prop-types";
import InfoGAC from "../../framework/InfoGAC";

const selectItemIcon = (quality) => {
  switch (quality) {
    case "uncommon":
      return "/icons/uncommon_amor_chest.png";
    case "common":
      return "/icons/common_amor_chest.png";
    case "rare":
      return "/icons/rare_amor_chest.png";
    case "epic":
      return "/icons/epic_amor_chest.png";
    case "legendary":
      return "/icons/legendary_amor_chest.png";
  }
};

const selectItemQualityColor = (quality) => {
  switch (quality) {
    case "uncommon":
      return "text-gray-300";
    case "common":
      return "text-green-400";
    case "rare":
      return "text-blue-400";
    case "epic":
      return "text-purple-400";
    case "legendary":
      return "text-orange-400";
  }
};

const Perks = ({ perks }) => {
  return (
    <div className="flex flex-col w-full border-t border-mana py-2 px-3">
      <div className="w-full">
        {perks.map(
          (perk, index) =>
            perk?.name && (
              <div
                key={`${perk.id}-${index}`}
                className="bg-blue-dragon/90 border border-arcane-spell rounded-xl px-5 py-2 my-1"
              >
                <div className="text-sm flex flex-row justify-between mb-1 border-b border-arcane-bright">
                  <p className="font-semibold text-arcane-bright">
                    {perk.name}
                  </p>
                  <p className="font-normal text-arcane-bright capitalize">
                    {_("es", perk.type)}
                  </p>
                </div>
                <p className="italic text-xs text-arcane-bright">
                  {perk.description}
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

const Skills = ({ skills }) => {
  return (
    <div className="relative flex flex-col w-full border-t border-mana py-2 px-3 max-h-[50vh] h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-dragon scrollbar-track-mana before:content-[''] before:sticky before:top-0 before:h-12 before:w-full before:pointer-events-none before:z-10 before:bg-gradient-to-b before:from-mana before:from-90% before:to-transparent after:content-[''] after:sticky after:bottom-0 after:h-12 after:w-full after:pointer-events-none after:z-10 after:bg-gradient-to-t after:from-mana after:from-90% after:to-transparent">
      {skills.map(
        (skill) =>
          skill.name && (
            <div
              key={skill._id}
              className="w-full my-1 border border-arcane-spell rounded-xl px-4 py-3"
            >
              <div className="text-sm flex flex-row justify-between mb-1 border-b border-arcane-bright">
                <p className="font-semibold text-arcane-bright">{skill.name}</p>
                <p className="font-normal text-arcane-bright">
                  {" ( "} Poder: {skill.power} | Acciones: {skill.actions} |
                  Turnos: {skill.turns} {" ) "}
                </p>
              </div>
              <p className="italic break-words text-xs">{skill.description}</p>
            </div>
          )
      )}
    </div>
  );
};

const Spells = ({ spells }) => {
  return (
    <div className="relative flex flex-col w-full border-t border-mana py-2 px-3 max-h-[50vh] h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-dragon scrollbar-track-mana before:content-[''] before:sticky before:top-0 before:h-12 before:w-full before:pointer-events-none before:z-10 before:bg-gradient-to-b before:from-mana before:from-90% before:to-transparent after:content-[''] after:sticky after:bottom-0 after:h-12 after:w-full after:pointer-events-none after:z-10 after:bg-gradient-to-t after:from-mana after:from-90% after:to-transparent">
      {spells.map(
        (spell) =>
          spell.name && (
            <div
              key={spell._id}
              className="w-full my-1 border border-arcane-spell rounded-xl px-4 py-3"
            >
              <div className="text-sm flex flex-row justify-between mb-1 border-b border-arcane-bright">
                <p className="font-semibold text-arcane-bright">{spell.name}</p>
                <p className="font-normal text-arcane-bright">
                  {" ( "} Poder: {spell.power} | Acciones: {spell.actions} |
                  Turnos: {spell.turns} | Nivel: {spell.level} {" ) "}
                </p>
              </div>
              <p className="italic break-words text-xs">{spell.description}</p>
            </div>
          )
      )}
    </div>
  );
};

const Weapon = ({ data }) => {
  return (
    <>
      <p className={`${selectItemQualityColor(data.quality)} font-semibold`}>
        {data.name}
      </p>
      <p className="text-sm flex flex-row justify-between w-full">
        <span>{data.slot}</span>
        <span>{data.talent}</span>
      </p>
      <div className="flex flex-row justify-between w-full">
        <p className="text-sm">Daño: {data.damage}</p>
        {data.cons && (
          <p className="text-sm flex flex-col">
            {Object.entries(data.cons).map(([key, value]) => (
              <span>
                {key}: -{value}
              </span>
            ))}
          </p>
        )}
      </div>

      {data.requirements && (
        <p className="text-green-400 text-sm flex flex-col">
          {Object.entries(data.requirements).map(([key, value]) => (
            <span>
              Requiere: {key} {value}
            </span>
          ))}
        </p>
      )}

      <p className="italic break-words text-xs">{data.description}</p>
    </>
  );
};

const Armor = ({ data }) => {
  return (
    <>
      <p className={`${selectItemQualityColor(data.quality)} font-semibold`}>
        {data.name}
      </p>
      <p className="text-sm flex flex-row justify-between w-full">
        <span>{data.slot}</span>
        <span>
          {data.code === "shield" ? "Escudo " : ""}
          {data.type}
        </span>
      </p>
      <div className="flex flex-row justify-between w-full">
        <p className="text-sm flex flex-col">
          <span>Def. Física: {data.pDefense}</span>
          <span>Def. Mágica: {data.sDefense}</span>
          <span>Durabilidad: {data.durability}</span>
        </p>
        {data.cons && (
          <p className="text-sm flex flex-col">
            {Object.entries(data.cons).map(([key, value]) => (
              <span>
                {key}: -{value}
              </span>
            ))}
          </p>
        )}
      </div>

      {data.requirements && (
        <p className="text-green-400 text-sm flex flex-col">
          {Object.entries(data.requirements).map(([key, value]) => (
            <span>
              Requiere: {key} {value}
            </span>
          ))}
        </p>
      )}

      <p className="italic break-words text-xs">{data.description}</p>
    </>
  );
};

const Inventory = ({ inventory }) => {
  const [showingItem, setShowingItem] = useState(null);
  return (
    <div className="flex flex-col w-full h-full border-t border-mana">
      <div className="grid grid-cols-6 gap-1 px-3 pt-2 h-full">
        {Object.entries(inventory).map(
          ([slot, item], i) =>
            item?._id &&
            item?.name && (
              <div
                key={`${slot}-${item._id}-${i}`}
                onMouseOver={() => setShowingItem(item)}
                className="border border-arcane-spell rounded-xl w-16 h-16"
              >
                <img
                  src={selectItemIcon(item.quality)}
                  className="rounded-xl"
                />
              </div>
            )
        )}
      </div>
      {showingItem && (
        <div className="w-full border-t border-mana px-3 py-2 text-arcane-bright">
          {(showingItem.code === "armor" || showingItem.code === "shield") && (
            <Armor data={showingItem} />
          )}
          {showingItem.code === "weapon" && <Weapon data={showingItem} />}
        </div>
      )}
    </div>
  );
};

const CharInfo = ({ character }) => {
  const {
    basicStat,
    logistic,
    specials,
    attributes,
    perks,
    race,
    isHuargen,
    category,
    spells,
    skills,
    gear,
  } = character;

  const { setAlert } = useAlert();

  const [moddedTalents, setModdedTalents] = useState([]);
  const [overAt, setOverAt] = useState("");
  const [atTalents, setAtTalents] = useState([]);
  const [dataToShow, setDataToShow] = useState("perksData");

  useEffect(() => {
    setAlert({
      msg: "¡Un consejo! Pasa el cursor por encima de los Atributos y verás sus talentos.",
    });
  }, []);
  useEffect(() => {
    if (overAt) {
      setAlert({});
    }
  }, [overAt]);

  useEffect(() => {
    const moddedTalents = new Map();

    const addToMap = (map, data, add) => {
      for (const [key, value] of Object.entries(data)) {
        const cleanKey = key.includes(":") ? key.split(":")[1] : key;
        const current = map.get(cleanKey) || 0;
        const delta = Number(value) * (add ? 1 : -1);
        map.set(cleanKey, current + delta);
      }
    };

    const raceFound = races.find((ra) => ra.code === race);
    if (raceFound) {
      addToMap(moddedTalents, raceFound.pros, true);
      addToMap(moddedTalents, raceFound.cons, false);
    }

    if (isHuargen) {
      addToMap(moddedTalents, worgenData.human.pros, true);
      addToMap(moddedTalents, worgenData.human.cons, false);
    }

    setModdedTalents(Object.fromEntries(moddedTalents));
  }, [race, isHuargen, perks, category]);

  const mddTals = new Map(Object.entries(moddedTalents));

  return (
    <InfoGAC>
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col w-2/5">
            <h3 className="text-lg font-semibold px-1 mb-1 border-b border-arcane-spell italic w-auto">
              {character.name}
            </h3>
            <div className="flex flex-col justify-between text-sm">
              <p>
                <strong>Raza:</strong> {character.race}{" "}
                {character.isHuargen ? "(Huargen)" : ""}
              </p>
              <p>
                <strong>Categoría:</strong> {character.category}
              </p>
              <p>
                <strong>Nivel:</strong> {character.level}
              </p>
            </div>
          </div>
          <div className="w-1/2 grid grid-cols-3 gap-2 text-sm">
            <p>
              <strong>Vida:</strong> {basicStat.hp}
            </p>
            <p>
              <strong>Maná:</strong> {basicStat.mp}
            </p>
            <p>
              <strong>Espíritu:</strong> {basicStat.spiritPoint}
            </p>
            <p>
              <strong>Movimiento:</strong> {logistic.movement} metros
            </p>
            <p>
              <strong>Iniciatuva (Bonus):</strong> +{logistic.initiative}
            </p>
            <p>
              <strong>Acciones:</strong> {logistic.actions}
            </p>
            <p className="col-span-3">
              <strong>Características Especiales:</strong>
            </p>
            {specials.superStrength && <p>Super fuerza</p>}
            {specials.superAudition && <p>Audición superior</p>}
            {specials.nightVision && <p>Visión nocturna</p>}
            {specials.conjurer && <p>Prestigitador</p>}
            {specials.nemberReplacement && <p>Reemplazo de miembros</p>}
            {specials.hugeMovement && <p>Gran movilidad</p>}
          </div>
        </div>

        <h3 className="font-semibold mt-2 mb-1 border-b border-arcane-spell pb-1">
          Lore
        </h3>
        <p className="italic text-sm">{character.lore}</p>
      </div>

      <div className="flex flex-row w-full justify-between min-h-[50vh] max-h-[50vh]">
        {/* Atributos y talentos */}
        <div className="flex flex-row text-sm w-2/4 justify-between">
          <div className="flex flex-col w-1/5">
            {attributes.map((at) => (
              <div
                key={at.code}
                onMouseOver={() => {
                  setOverAt(at.code);
                  setAtTalents(at.talents);
                }}
                className={`w-24 h-16 my-1 text-sm border border-arcane-spell rounded-xl flex flex-col items-center justify-center text-mana ${overAt === at.code ? "animate-pulseGlow" : ""}`}
              >
                <p className="border-b border-mana font-bold">{at.label}</p>
                <p>{at.value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-[75%]">
            {atTalents.map((tal) => {
              const baseBonus = mddTals.get(tal.code);
              let huargenBonus = "";
              let doSpeechDragon = false;

              if (isHuargen) {
                if (worgenData.worgen.pros[tal.code]) {
                  huargenBonus = `(${worgenData.worgen.pros[tal.code]} Huargen)`;
                } else if (worgenData.worgen.cons[tal.code]) {
                  huargenBonus = `(-${worgenData.worgen.cons[tal.code]} Huargen)`;
                }
              }

              if (baseBonus) doSpeechDragon = true;
              if (huargenBonus) doSpeechDragon = true;

              return (
                <p
                  key={tal.code}
                  className="flex flex-row justify-between text-sm"
                  onMouseOver={() => {
                    if (doSpeechDragon)
                      setAlert({
                        msg: "Los números entre paréntesis representan las mejoras del talento provenientes de la raza, rasgos y esas cosas",
                        destroy: true,
                      });
                  }}
                >
                  <strong>{tal.label}:</strong>{" "}
                  <span>
                    {baseBonus ? `(${baseBonus}) ` : ""}
                    {huargenBonus} {tal.value}
                  </span>
                </p>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col w-[45%] min-h-[50vh] border-x border-b border-mana rounded-xl">
          <div className="flex flex-row">
            <button
              id="perksData"
              onClick={(e) => setDataToShow(e.target.id)}
              className={`w-full px-3 py-1 border-t border-x border-mana rounded-t-xl ${dataToShow === "perksData" ? "bg-mana text-blue-dragon font-bold" : ""}`}
            >
              Rasgos
            </button>
            {spells.length > 0 && (
              <button
                id="spellsData"
                onClick={(e) => setDataToShow(e.target.id)}
                className={`w-full px-3 py-1 border-t border-x border-mana rounded-t-xl ${dataToShow === "spellsData" ? "bg-mana text-blue-dragon font-bold" : ""}`}
              >
                Hechizos
              </button>
            )}
            {skills.length > 0 && (
              <button
                id="skillsData"
                onClick={(e) => setDataToShow(e.target.id)}
                className={`w-full px-3 py-1 border-t border-x border-mana rounded-t-xl ${dataToShow === "skillsData" ? "bg-mana text-blue-dragon font-bold" : ""}`}
              >
                Habilidades
              </button>
            )}
            <button
              id="inventoryData"
              onClick={(e) => setDataToShow(e.target.id)}
              className={`w-full px-3 py-1 border-t border-x border-mana rounded-t-xl ${dataToShow === "inventoryData" ? "bg-mana text-blue-dragon font-bold" : ""}`}
            >
              Equipo
            </button>
          </div>
          {/* Rasgos positivos y negativos */}
          {dataToShow === "perksData" && <Perks perks={perks} />}
          {/* Hechizos */}
          {dataToShow === "spellsData" && <Spells spells={spells} />}
          {/* Habilidades */}
          {dataToShow === "skillsData" && <Skills skills={skills} />}
          {/* Equipo */}
          {dataToShow === "inventoryData" && <Inventory inventory={gear} />}
        </div>
      </div>
    </InfoGAC>
  );
};

CharInfo.propTypes = {
  character: PropTypes.object.isRequired,
};

export default CharInfo;
