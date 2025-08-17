import { useEffect, useState, useMemo } from "react";
import IdGenerator from "../../helpers/IdGenerator";
import InputGAC from "../../framework/InputGAC";
import SelectGAC from "../../framework/SelectGAC";
import SaveButtonCAG from "../../framework/SaveButtonGAC";
import useAlert from "../../context/AlertContext";
import races from "@json/races.json";
import FormGAC from "../../framework/FormGAC";
import FieldSetGAC from "../../framework/FieldSetGAC";
import TextareaGAC from "../../framework/TextareaGAC";
import AttirubteExtension from "../extensions/AttirubteExtension";
import PerkExtension from "../extensions/PerkExtension";
import ProsConsExtension from "../extensions/ProsConsExtension";
import GearExtension from "../extensions/GearExtension";
import SpellExtension from "../extensions/SpellExtension";
import SkillExtension from "../extensions/SkillExtension";
import useSheet from "../../context/SheetContext";
import { BasicStat } from "@models/extensions/BasicStat";
import _ from "../../helpers/Translator";
import { Gear } from "@models/extensions/Gear";
import { Attribute } from "@models/extensions/Attribute";
import CharacterBridge from "../../bridges/CharacterBridge";
import PropTypes from "prop-types";
import GlowButtonGAC from "../../framework/GlowButtonGAC";

const PageOne = ({
  basicInformation,
  setBasicInformation,
  categories,
  levels,
  races,
}) => {
  useEffect(() => {
    const init = async () => {
      const basicCache = localStorage.getItem("basicInformationCache");

      if (basicCache) {
        setBasicInformation(JSON.parse(basicCache));
      }
    };

    init();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "basicInformationCache",
      JSON.stringify(basicInformation)
    );
  }, [basicInformation]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col w-2/5">
          <InputGAC
            id="name"
            customClass={"w-full font-semibold italic"}
            type="text"
            placeholder="Introduce el nombre de tu personaje"
            value={basicInformation.name}
            onChange={(e) =>
              setBasicInformation({
                ...basicInformation,
                [e.target.id]: e.target.value,
              })
            }
          />
          <div className="flex flex-col justify-between text-sm">
            <label
              htmlFor="race"
              className="flex justify-between items-center my-1 font-semibold"
            >
              Raza
              <SelectGAC
                id="race"
                value={basicInformation.race}
                customClass={"w-2/5 text-center"}
                onChange={(e) =>
                  setBasicInformation({
                    ...basicInformation,
                    [e.target.id]: e.target.value,
                  })
                }
              >
                {races.map((race) => (
                  <option key={race} value={race}>
                    {race}
                  </option>
                ))}
              </SelectGAC>
            </label>
            <label
              htmlFor="race"
              className="flex justify-between items-center my-1 font-semibold"
            >
              Huargen
              <input
                id="isWorgen"
                type="checkbox"
                className="mr-13"
                checked={basicInformation.isWorgen}
                onChange={(e) =>
                  setBasicInformation({
                    ...basicInformation,
                    [e.target.id]: e.target.value,
                  })
                }
              />
            </label>

            <label
              htmlFor="category"
              className="flex justify-between items-center my-1 font-semibold"
            >
              Categoría
              <SelectGAC
                id="category"
                customClass={"w-2/5 text-center"}
                value={basicInformation.category}
                onChange={(e) =>
                  setBasicInformation({
                    ...basicInformation,
                    [e.target.id]: e.target.value,
                  })
                }
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </SelectGAC>
            </label>

            <label
              htmlFor="level"
              className="flex justify-between items-center my-1 font-semibold"
            >
              Nivel
              <SelectGAC
                id="level"
                value={basicInformation.level}
                customClass={"w-2/5 text-center"}
                onChange={(e) =>
                  setBasicInformation({
                    ...basicInformation,
                    [e.target.id]: e.target.value,
                  })
                }
              >
                {levels.map((lvls) => (
                  <option key={lvls} value={lvls}>
                    {lvls}
                  </option>
                ))}
              </SelectGAC>
            </label>
          </div>
        </div>
        <div className="w-1/2 grid grid-cols-3 gap-1 text-sm">
          <div className="flex flex-col text-center">
            <p className="font-bold">Vida:</p>
            <p>{basicInformation.hp}</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="font-bold">Maná:</p>
            <p>{basicInformation.mp}</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="font-bold">Espíritu:</p>
            <p>{basicInformation.spiritP}</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="font-bold">Movimiento:</p>
            <p>{basicInformation.movement} metros</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="font-bold">Iniciatuva (Bonus):</p>
            <p>+{basicInformation.initiative}</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="font-bold">Acciones:</p>
            <p>{basicInformation.actions}</p>
          </div>

          <p className="col-span-3">
            <strong>Características Especiales:</strong>
          </p>
          {basicInformation.superStrength && <p>Super fuerza</p>}
          {basicInformation.superAudition && <p>Audición superior</p>}
          {basicInformation.nightVision && <p>Visión nocturna</p>}
          {basicInformation.conjurer && <p>Prestigitador</p>}
          {basicInformation.memberReplacement && <p>Reemplazo de miembros</p>}
          {basicInformation.hugeMovement && <p>Gran movilidad</p>}
        </div>
      </div>

      <label htmlFor="lore" className="flex mb-1 font-semibold flex-col">
        Breve historia del personaje
        <span className="text-xs">
          (Solo aquello fundamental para justificar su nivel)
        </span>
      </label>
      <TextareaGAC
        id="lore"
        value={basicInformation.lore}
        onChange={(e) =>
          setBasicInformation({
            ...basicInformation,
            [e.target.id]: e.target.value,
          })
        }
        rows="10"
      />
      <p
        className={`${basicInformation.lore.length > 500 && "text-red-500"} text-sm text-center`}
      >
        Caracteres {basicInformation.lore.length}/500
      </p>
    </div>
  );
};

const PageTwo = ({ attributes, attributesCached }) => {
  const [overAt, setOverAt] = useState("");
  const [atTalents, setAtTalents] = useState([]);

  useEffect(() => {
    if (overAt) {
      setAtTalents(Object.keys(attributesCached[overAt]));
    }
  }, [overAt]);
  return (
    <div className="flex flex-row text-sm w-2/4 justify-between">
      <div className="flex flex-col w-1/5">
        {attributes.map((at) => (
          <div
            key={at}
            onMouseOver={() => {
              setOverAt(at);
            }}
            className={`w-24 h-16 my-1 text-sm border border-arcane-spell rounded-xl flex flex-col items-center justify-center text-mana ${overAt === at ? "animate-pulseGlow" : ""}`}
          >
            <p className="border-b border-mana font-bold">{at}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-[75%]">
        {atTalents.map((tal) => {
          <p key={tal} className="flex flex-row justify-between text-sm">
            <strong>{tal}:</strong>
          </p>;
        })}
      </div>
    </div>
  );
};

const CharForm = ({ charData, handleSubmit }) => {
  const { setAlert } = useAlert();
  const { Character } = useSheet();

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);

  const [levelData, setLevelData] = useState({});
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);

  const [racesData, setRacesData] = useState({});
  const [races, setRaces] = useState([]);

  const [attributesData, setAttributesData] = useState({});
  const [attributes, setAttributes] = useState([]);

  const levelsCached = useMemo(() => levelData, [levelData]);
  const racesCached = useMemo(() => racesData, [racesData]);
  const attributesCached = useMemo(() => attributesData, [attributesData]);

  const [basicInformation, setBasicInformation] = useState({
    name: "",
    race: "human",
    isWorgen: false,
    category: "noob",
    level: 1,
    lore: "",

    // Atributos automáticos
    hp: 15,
    mp: 10,
    spiritP: 10,
    movement: 20,
    initiative: 0,
    actions: 2,
    superStrength: false,
    superAudition: false,
    nightVision: false,
    conjurer: false,
    memberReplacement: false,
    hugeMovement: false,
  });

  const [attributeInformation, setAttributeInformation] = useState({}); // { DES: { value, talents : { talent: value}}}

  const [id, setId] = useState(IdGenerator());
  const [name, setName] = useState("");
  const [lore, setLore] = useState("");
  const [level, setLevel] = useState(1);
  const [category, setCategory] = useState("noob");
  const [race, setRace] = useState("human");
  const [isHuargen, setIsHuargen] = useState(false);

  const [perks, setPerks] = useState([]);
  //   const [attributes, setAttributes] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [gear, setGear] = useState({});
  const [spells, setSpells] = useState([]);
  const [skills, setSkills] = useState([]);

  const [gearRequirements, setGearRequirements] = useState([]);
  const [canAffordThisGear, setCanAffordThisGear] = useState(false);

  const [pros, setPros] = useState();
  const [cons, setCons] = useState();

  const [hp, setHp] = useState(15);
  const [mp, setMp] = useState(10);
  const [spiritP, setSpiritP] = useState(10);
  const [ap, setAp] = useState(0);
  const [sp, setSp] = useState(2);

  const [maxPosPerks, setMaxPosPerks] = useState(1);
  const [minNegPerks, setMinNegPerks] = useState(1);

  const [apRemaining, setApRemaining] = useState(ap);
  const [spRemaining, setSpRemaining] = useState(sp);

  const [ppRemaining, setPPRemaining] = useState(1);

  const [toAdapt, setToAdapt] = useState("");
  const [toImprove, setToImprove] = useState("");

  // effects
  useEffect(() => {
    const fetchLevelsData = async () => {
      const response = await CharacterBridge.getPlayerLevels();
      setLevelData(response.data);
      const cats = Object.keys(response.data);
      setCategories(cats);
      const levels = Object.keys(response.data["noob"]);
      setLevels(levels);
    };

    const fetchRacesData = async () => {
      const response = await CharacterBridge.getRaces();
      setRacesData(response.data);

      setRaces(Object.keys(response.data));
    };

    const fetchAttributesData = async () => {
      const response = await CharacterBridge.getAttributes();
      setAttributesData(response.data);

      // { DES: { value, talents : { talent: value}}}
      const attributes = Object.keys(response.data);
      let data = {};
      for (const at of attributes) {
        const talents = Object.keys(response.data[at]);
        data[at] = { value: 0, talents: {} };
        for (const talent of talents) {
          data[at].talents[talent] = 0;
        }
      }
      setAttributeInformation(data);
      setAttributes(attributes);
    };

    fetchLevelsData();
    fetchRacesData();
    fetchAttributesData();
  }, []);

  useEffect(() => {
    if (levelsCached?.[basicInformation.category]) {
      const levels = Object.keys(levelsCached?.[basicInformation.category]);
      setLevels(levels);
    }
  }, [basicInformation.category]);

  // methods
  const switchPage = (e) => {
    e.preventDefault();
    const value = e.target.id === "next" ? 1 : -1;
    if (e.target.id === "next" && !handleValidation[page]()) return;
    setPage((before) => (before += value));
  };

  const basicInformationValidation = () => {
    if (basicInformation.name.trim().length === 0) {
      setAlert({
        msg: "¡Eh! ¡Se te ha olvidado ponerle un nombre a tu personaje! No podemos continuar con el formulario de inscripción sin todos los datos necesarios.",
        destroy: true,
        deathTime: 7000,
      });
      return false;
    }
    if (basicInformation.lore.trim().length === 0) {
      setAlert({
        msg: "Oye... no es por nada, pero se te ha olvidado escribir el transfondo del personaje... esto es muy importante y necesario. Por favor, necesito que rellenes una breve historia. ¡Gracias!",
        destroy: true,
        deathTime: 7000,
      });
      return false;
    }
    if (basicInformation.lore.trim().length > 500) {
      setAlert({
        msg: "¡Ey, ey, ey! ¡Para el flujo mágico! No tan largo, que nos quedemos sin espacio en las Líneas Ley. Algo escueto que cuente lo necesario es suficiente.",
        destroy: true,
        deathTime: 7000,
      });
      return false;
    }

    return true;
  };

  // Attributs
  const handleValidation = {
    1: basicInformationValidation,
  };

  /// Old DEPRECATED

  //   useEffect(() => {
  //     const { hp, ap, sp } = BasicStat.stimateStats(level, category);
  //     let charCat = 1;
  //     if (category === "elite") {
  //       charCat = 2;
  //     } else if (category === "boss") {
  //       charCat = 3;
  //     }
  //     setMaxPosPerks(charCat);
  //     setMinNegPerks(charCat);

  //     setHp(hp);
  //     setAp(ap);
  //     setSp(sp);
  //   }, [level, category]);

  //   useEffect(() => {
  //     setMp(BasicStat.stimateMP(attributes));
  //     setSpiritP(BasicStat.stimateSpiritP(attributes));

  //     setApRemaining(ap - Character.getAttributeTotalPoints(attributes));
  //   }, [attributes]);

  //   useEffect(() => {
  //     setApRemaining(ap - Character.getAttributeTotalPoints(attributes));
  //   }, [ap]);

  //   useEffect(() => {
  //     const totalSkills = skills.length;
  //     const totalSpells = spells.reduce(
  //       (pre, actual) => pre + Number(actual.level),
  //       0
  //     );

  //     setSpRemaining(sp - totalSkills - totalSpells);
  //   }, [skills, spells, sp]);

  //   useEffect(() => {
  //     let total = 0;
  //     const PositivePerks = perks.filter((perk) => perk.type === "positive");
  //     PositivePerks.forEach((perk) => {
  //       total += perk.level;
  //     });
  //     setPPRemaining(maxPosPerks - total);
  //   }, [perks, ppRemaining, maxPosPerks]);

  //   useEffect(() => {
  //     const pros = new Map();
  //     const cons = new Map();

  //     const addToMap = (map, data) => {
  //       for (const [key, value] of Object.entries(data)) {
  //         const cleanKey = key.includes(":") ? key : "TALENT:" + key;
  //         const current = map.get(cleanKey) || 0;
  //         const delta = Number(value);

  //         map.set(cleanKey, current + delta);
  //       }
  //     };

  //     const raceFound = races.find((ra) => ra.code === race);
  //     if (raceFound) {
  //       addToMap(pros, raceFound.pros);
  //       addToMap(cons, raceFound.cons);
  //     }

  //     if (isHuargen) {
  //       addToMap(pros, {
  //         athletics: 2,
  //         brutality: 2,
  //         magicResistance: 2,
  //         resilience: 2,
  //         perception: 2,
  //       });
  //       addToMap(cons, {
  //         clResistance: 5,
  //         stealth: 3,
  //         sleightHand: 2,
  //       });
  //     }

  //     if (Object.values(gear).length > 0) {
  //       const gearCons = gear.getCons();
  //       addToMap(cons, Object.fromEntries(gearCons));
  //     }

  //     setPros(Object.fromEntries(pros));
  //     setCons(Object.fromEntries(cons));
  //   }, [race, isHuargen, perks, category, gear]);

  //   useEffect(() => {
  //     if (Object.values(gear).length > 0) {
  //       setGearRequirements(Object.fromEntries(gear.getRequirements()));
  //       setCanAffordThisGear(gear.canWearThisGear(attributes, race, isHuargen));
  //     }
  //   }, [gear, attributes, race, isHuargen]);

  //   const handleSetAttributes = (attributes) => setAttributes(attributes);
  //   const handleSetPerks = (perks) => setPerks(perks);
  //   const handleSetGear = (gear) => setGear(gear);
  //   const handleSetInventory = (inventory) => setInventory(inventory);
  //   const handleSetSpells = (spells) => setSpells(spells);
  //   const handleSetSkills = (skills) => setSkills(skills);

  //   const handleSpecialsPros = (key, value) => {
  //     const setters = {
  //       adapt: setToAdapt,
  //       improvement: setToImprove,
  //     };
  //     setters[key](value);
  //   };

  //   const onReset = () => {
  //     setId(IdGenerator());
  //     setName("");
  //     setLore("");
  //     setLevel(1);
  //     setCategory("noob");
  //     setRace("");
  //     setIsHuargen(false);

  //     setPerks([]);
  //     setAttributes([]);
  //     setGear({});
  //     setInventory([]);
  //     setSpells([]);
  //     setSkills([]);

  //     setPros();
  //     setCons();
  //   };

  //   const validateBasicInfo = () => {
  //     if (!name.trim()) return "Debes introducir un nombre para tu personaje";
  //     if (!lore.trim())
  //       return "Debes escribir una breve historia de tu personaje.";
  //     if (lore.length > 500)
  //       return "La historia de tu personaje es demasiado larga.";
  //     return null;
  //   };

  //   const validatePoints = () => {
  //     if (apRemaining < 0) return "No tienes suficientes puntos de atributo";
  //     if (spRemaining < 0)
  //       return "No tienes suficientes puntos de Hechizo/habilidad";
  //     if (ppRemaining < 0) return "No tienes suficientes puntos de Rasgo";
  //     return null;
  //   };

  //   const validateTalents = () => {
  //     const maxTP = ap * 2;
  //     let totalTalentPoints = attributes.reduce(
  //       (total, attr) =>
  //         total + Attribute.calculateTalentsTotalPoints(attr.talents),
  //       0
  //     );
  //     if (totalTalentPoints > maxTP)
  //       return "No tienes suficientes puntos de talento";
  //     return null;
  //   };

  //   const validatePerks = () => {
  //     const negCount = perks.filter((perk) => perk.type === "negative").length;
  //     if (negCount < minNegPerks)
  //       return `Debes elegir al menos ${minNegPerks} rasgos negativos`;
  //     return null;
  //   };

  //   const validateRaceSpecials = (mappedPros) => {
  //     if (mappedPros.get("TALENT:adapt") && toAdapt.length === 0)
  //       return "Debes seleccionar un talento para mejorar en Adaptabilidad (Pros)";
  //     if (mappedPros.get("TALENT:improvement") && toImprove.length === 0)
  //       return "Debes seleccionar un talento para mejorar en Perfeccionamiento (Pros)";
  //     return null;
  //   };

  //   const onSubmit = (e) => {
  //     e.preventDefault();

  //     const validations = [
  //       validateBasicInfo,
  //       validatePoints,
  //       validateTalents,
  //       validatePerks,
  //       () => validateRaceSpecials(new Map(Object.entries(pros))),
  //     ];

  //     for (const validate of validations) {
  //       const error = validate();
  //       if (error) {
  //         setAlert({ msg: error, type: "error" });
  //         return;
  //       }
  //     }

  //     if (!canAffordThisGear) {
  //       setAlert({
  //         msg: "No cumples los requerimientos para poder llevar esta armadura",
  //         type: "error",
  //       });
  //       return;
  //     }

  //     const newChar = new Character(
  //       id,
  //       name,
  //       lore,
  //       level,
  //       category,
  //       race,
  //       isHuargen,
  //       perks,
  //       attributes,
  //       inventory,
  //       gear,
  //       spells,
  //       skills
  //     );
  //     handleSubmit(newChar);
  //     onReset();
  //   };

  return (
    <FormGAC
      onSubmit={() => console.log("enviando formulario")}
      buttonText={"Crear"}
      disableButton={!lastPage}
    >
      <p className="italic text-xs mb-5">
        Los modificadores de talentos por raza, rasgos y por la maldición
        huargen se aplicarán al terminar la ficha de forma automática
      </p>
      {page === 1 && (
        <PageOne
          categories={categories}
          levels={levels}
          races={races}
          basicInformation={basicInformation}
          setBasicInformation={setBasicInformation}
        />
      )}
      {page === 2 && (
        <PageTwo attributes={attributes} attributesCached={attributesCached} />
      )}
      {/*
      <FieldSetGAC title={"Atributos y talentos"} opened={false}>
        <p className="block mb-1 font-semibold text-center">
          Puntos de Atributos: {apRemaining}/{ap}
        </p>
        {apRemaining < 0 && (
          <p className="text-red-500 text-center">
            No tienes puntos de Atributo suficiente
          </p>
        )}
        <AttirubteExtension
          charAtts={attributes}
          handleSetAttributes={handleSetAttributes}
        />
      </FieldSetGAC>
      <FieldSetGAC title={"Rasgos"} opened={false}>
        <p className="text-center mb-1 font-semibold">
          Puntos de Rasgos Positivos: {ppRemaining}/{maxPosPerks}
        </p>
        {ppRemaining < 0 && (
          <p className="text-red-500 text-center">
            No puedes tener más Rasgos positivos o baja un nivel de un Rasgo
          </p>
        )}
        {(minNegPerks >
          perks.filter((perk) => perk.type === "negative").length ||
          perks.filter((perk) => perk.type === "negative").length === 0) && (
          <p className="text-red-500 text-center">
            Debes elegir un mínimo de {minNegPerks} rasgos negativos
          </p>
        )}
        <PerkExtension charPerks={perks} handleSetPerks={handleSetPerks} />
      </FieldSetGAC>
      <FieldSetGAC title={"Pros y contras"} opened={false}>
        <ProsConsExtension
          pros={pros}
          cons={cons}
          attributes={attributes}
          handleSpecialsPros={handleSpecialsPros}
        />
      </FieldSetGAC>

      <FieldSetGAC title={"Armadura y Armas"} opened={false}>
        {Object.entries(gearRequirements).length > 0 && (
          <p
            className={`${canAffordThisGear ? "text-orange-500 text-center" : "text-red-500"}`}
          >
            {canAffordThisGear
              ? "Requerimientos para llevar esta armadura"
              : "No puedes llevar esta armadura"}
          </p>
        )}
        {Object.entries(gearRequirements).map(([key, value]) => (
          <div key={key + "GearRequirement"}>
            <p className={`${canAffordThisGear ? "" : "text-red-500"}`}>
              {_("es", key.includes(":") ? key.split(":")[1] : key)}:{" "}
              <span>{value}</span>
            </p>
          </div>
        ))}
        <GearExtension
          charGear={gear}
          charInventory={inventory}
          handleSetGear={handleSetGear}
          handleSetInventory={handleSetInventory}
        />
      </FieldSetGAC>

      <p className="block mb-1 font-semibold text-center">
        Puntos de Hechizos y Habilidades: {spRemaining}/{sp}
      </p>
      {spRemaining < 0 && (
        <p className="text-red-500 text-center">
          No puedes tener más Hechizos y/o Habilidades
        </p>
      )}
      <FieldSetGAC title={"Hechizos"} opened={false}>
        <SpellExtension charSpells={spells} handleSetSpells={handleSetSpells} />
      </FieldSetGAC>
      <FieldSetGAC title={"Habilidades"} opened={false}>
        <SkillExtension charSkills={skills} handleSetSkills={handleSetSkills} />
      </FieldSetGAC>
	  */}
      <div className="flex flex-row justify-center space-x-2">
        {page > 1 && (
          <GlowButtonGAC id="back" onClick={switchPage}>
            Volver
          </GlowButtonGAC>
        )}
        <GlowButtonGAC id="next" onClick={switchPage}>
          Siguiente
        </GlowButtonGAC>
      </div>
    </FormGAC>
  );
};

CharForm.propTypes = {
  charData: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CharForm;
