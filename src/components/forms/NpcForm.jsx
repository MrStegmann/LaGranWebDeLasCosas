import { useEffect, useState } from "react";
import IdGenerator from "../../helpers/IdGenerator";
import NpcBookSpell from "../lists/NpcBookSpell";
import NpcSpellsList from "../lists/NpcSpellsList";
import NpcBookSkill from "../lists/NpcBookSkill";
import NpcSkillList from "../lists/NpcSkillList";
import InputGAC from "@/framework/InputGAC";
import SelectGAC from "@/framework/SelectGAC";
import SaveButtonCAG from "@/framework/SaveButtonGAC";
import useAlert from "@/context/AlertContext";
import FormGAC from "@/framework/FormGAC";
import FieldSetGAC from "@/framework/FieldSetGAC";
import { Npc } from "@models/Npc";
import PropTypes from "prop-types";

const NpcForm = ({ npcData, handleSubmit }) => {
  const { setAlert } = useAlert();

  const [id, setId] = useState(IdGenerator());
  const [name, setName] = useState("");
  const [level, setLevel] = useState(npcData?.level || 1);
  const [category, setCategory] = useState("normal");
  const [strength, setStrength] = useState(0);
  const [dexterity, setDexterity] = useState(0);
  const [intelligence, setIntelligence] = useState(0);
  const [willpower, setWillpower] = useState(0);
  const [constitution, setConstitution] = useState(0);
  const [wisdom, setWisdom] = useState(0);
  const [charisma, setCharisma] = useState(0);
  const [weapon, setWeapon] = useState("unarmed");
  const [spells, setSpells] = useState([]);
  const [skills, setSkills] = useState([]);
  const [hp, setHp] = useState(0);
  const [ap, setAp] = useState(0);
  const [sp, setSp] = useState(0);
  const [pDamage, setPDamage] = useState(0);
  const [sDamage, setSDamage] = useState(0);
  const [pDefense, setPDefense] = useState(0);
  const [sDefense, setSDefense] = useState(0);

  const [apRemaining, setApRemaining] = useState(4);
  const [spRemaining, setSpRemaining] = useState(5);

  const handleAddSpell = (spell) => {
    setSpells((before) => [...before, spell]);
  };

  const handleRemoveSpell = (spell) => {
    setSpells((before) => [...before.filter((s) => s._id !== spell._id)]);
  };

  const handleAddSkill = (skill) => {
    setSkills((before) => [...before, skill]);
  };

  const handleRemoveSkill = (skill) => {
    setSkills((before) => [...before.filter((s) => s._id !== skill._id)]);
  };

  useEffect(() => {
    if (npcData?.name) {
      setId(npcData._id || IdGenerator());
      setName(npcData.name);
      setLevel(npcData.level);
      setCategory(npcData.category);
      setStrength(npcData.strength);
      setDexterity(npcData.dexterity);
      setIntelligence(npcData.intelligence);
      setWillpower(npcData.willpower);
      setConstitution(npcData.constitution);
      setWisdom(npcData.wisdom);
      setCharisma(npcData.charisma);
      setWeapon(npcData.weapon);
      setSpells(npcData.spells);
      setSkills(npcData.skills);

      setHp(npcData.hp);
      setAp(npcData.ap);
      setSp(npcData.sp);
      setPDamage(npcData.pdamage);
      setSDamage(npcData.sdamage);
      setPDefense(npcData.pdefense);
      setSDefense(npcData.sdefense);
    }
  }, [npcData]);

  useEffect(() => {
    setApRemaining(ap);
    const totalUsed =
      strength +
      dexterity +
      constitution +
      intelligence +
      willpower +
      wisdom +
      charisma;

    setApRemaining(ap - totalUsed);
  }, [
    strength,
    dexterity,
    constitution,
    intelligence,
    willpower,
    wisdom,
    charisma,
    ap,
  ]);

  useEffect(() => {
    const totalUsed =
      spells.reduce((prev, actualy) => prev + actualy.level, 0) + skills.length;
    setSpRemaining(sp - totalUsed);
  }, [sp, skills, spells]);

  useEffect(() => {
    const { hp, sp, ap } = Npc.stimateStats(level, category);
    const { pDefense, sDefense, pDamage, sDamage } = Npc.stimateDamageDefense(
      { strength, intelligence, willpower, constitution },
      weapon,
      category
    );
    setHp(hp + constitution);
    setAp(ap);
    setSp(sp);
    setPDamage(pDamage || 0);
    setSDamage(sDamage || 0);
    setPDefense(pDefense || 0);
    setSDefense(sDefense || 0);
  }, [
    level,
    category,
    strength,
    intelligence,
    constitution,
    willpower,
    weapon,
  ]);

  const maxLevel = category === "noob" ? 4 : 10;

  // Refactor for dynamic stat handling
  const handleStatChange = (stat, value) => {
    const setStat = {
      strength: setStrength,
      dexterity: setDexterity,
      intelligence: setIntelligence,
      willpower: setWillpower,
      constitution: setConstitution,
      wisdom: setWisdom,
      charisma: setCharisma,
    }[stat];
    setStat(Number(value));
  };

  // Handle level change with validation
  const handleLevelChange = (e) => {
    const value = Math.max(1, Math.min(maxLevel, Number(e.target.value)));
    setLevel(value);
  };

  const onReset = () => {
    setId(IdGenerator());
    setName("");
    setLevel(1);
    setCategory("normal");
    setStrength(0);
    setDexterity(0);
    setIntelligence(0);
    setWillpower(0);
    setConstitution(0);
    setWisdom(0);
    setCharisma(0);
    setWeapon("unarmed");
    setSpells([]);
    setSkills([]);

    setHp(0);
    setAp(0);
    setSp(0);
    setPDamage(0);
    setSDamage(0);
    setPDefense(0);
    setSDefense(0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setAlert({ msg: "Debes escribir un nombre para el NPC", type: "error" });
      return;
    }
    if (apRemaining < 0) {
      setAlert({
        msg: "No tienes puntos de atributo suficientes",
        type: "error",
      });
      return;
    }

    if (spRemaining < 0) {
      setAlert({
        msg: "No tienes puntos de hechizo/habilidad suficientes",
        type: "error",
      });
      return;
    }
    handleSubmit(
      Npc.fromRaw({
        id,
        name,
        level,
        category,
        strength,
        dexterity,
        intelligence,
        willpower,
        constitution,
        wisdom,
        charisma,
        weapon,
        spells,
        skills,
      })
    );

    onReset();
  };

  const stats = {
    strength,
    dexterity,
    intelligence,
    willpower,
    constitution,
    wisdom,
    charisma,
  };

  return (
    <FormGAC onSubmit={onSubmit}>
      <FieldSetGAC title={"Información general"}>
        <div>
          <label
            htmlFor="name"
            className="block mb-1 font-semibold tracking-wide"
          >
            Nombre
          </label>
          <InputGAC
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <label
              htmlFor="level"
              className="block mb-1 font-semibold tracking-wide"
            >
              Nivel
            </label>
            <InputGAC
              id="level"
              type="number"
              min={1}
              max={maxLevel}
              value={level}
              onChange={handleLevelChange}
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="category"
              className="block mb-1 font-semibold tracking-wide"
            >
              Categoría
            </label>
            <SelectGAC
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="noob">Novato</option>
              <option value="normal">Normal</option>
              <option value="elite">Elite</option>
              <option value="boss">Jefe</option>
            </SelectGAC>
          </div>
        </div>

        <div className="flex justify-between text-[#dbc59a] font-semibold">
          <p>HP: {hp}</p>
          <p>
            AP: {apRemaining}/{ap}
          </p>
          <p>
            SP: {spRemaining}/{sp}
          </p>
        </div>
      </FieldSetGAC>
      <FieldSetGAC title={"Atributos"}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          {[
            "strength",
            "dexterity",
            "intelligence",
            "willpower",
            "constitution",
            "wisdom",
            "charisma",
          ].map((stat) => (
            <div key={stat} className="flex flex-col">
              <label
                htmlFor={stat}
                className="block mb-1 font-semibold tracking-wide text-[#dbc59a]"
              >
                {stat.toUpperCase()}
              </label>
              <InputGAC
                id={stat}
                type="number"
                min={0}
                value={stats[stat]}
                onChange={(e) => handleStatChange(stat, e.target.value)}
              />
            </div>
          ))}
        </div>

        {apRemaining < 0 && (
          <p className="text-red-500 font-semibold">
            No tienes puntos de Atributo suficiente
          </p>
        )}
      </FieldSetGAC>

      <FieldSetGAC title={`Daño y Defensa`}>
        <div className="mt-6">
          <label
            htmlFor="weapon"
            className="block mb-1 font-semibold tracking-wide"
          >
            Arma
          </label>
          <SelectGAC
            id="weapon"
            value={weapon}
            onChange={(e) => setWeapon(e.target.value)}
          >
            <option value="unarmed">Desarmado</option>
            <option value="thinWeapons">Armas finas</option>
            <option value="oneHandWeapons">Armas 1 mano</option>
            <option value="twoHandsWeapons">Armas 2 manos</option>
            <option value="lrw">Armas a distancia ligeras</option>
            <option value="hrw">Armas a distancia pesadas</option>
          </SelectGAC>

          <h2 className="text-[#dbc59a] font-bold mt-6 mb-2">Daño</h2>
          <div className="flex justify-between text-[#dbc59a] font-semibold">
            <p>Daño físico: {pDamage}</p>
            <p>Daño mágico: {sDamage}</p>
          </div>

          <h2 className="text-[#dbc59a] font-bold mt-6 mb-2">Defensa</h2>
          <div className="flex justify-between text-[#dbc59a] font-semibold">
            <p>Def. física: {pDefense}</p>
            <p>Def. mágica: {sDefense}</p>
          </div>
        </div>
      </FieldSetGAC>

      {spRemaining < 0 && (
        <p className="text-red-500 font-semibold mt-2">
          No tienes puntos de Habilidad/Hechizo suficiente
        </p>
      )}
      <FieldSetGAC title={"Hechizos"}>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <NpcSpellsList
            handleRemoveSpell={(e, spell) => {
              e.preventDefault();
              handleRemoveSpell(spell);
            }}
            nSpells={spells}
          />
          <NpcBookSpell
            handleAddSpell={(e, spell) => {
              e.preventDefault();
              handleAddSpell(spell);
            }}
            nSpells={spells}
          />
        </div>
      </FieldSetGAC>
      <FieldSetGAC title={"Habilidades"}>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <NpcSkillList
            nSkills={skills}
            handleRemoveSkill={(e, skill) => {
              e.preventDefault();
              handleRemoveSkill(skill);
            }}
          />
          <NpcBookSkill
            nSkills={skills}
            handleAddSkill={(e, skill) => {
              e.preventDefault();
              handleAddSkill(skill);
            }}
          />
        </div>
      </FieldSetGAC>

      <div className="mt-8 flex justify-end">
        <SaveButtonCAG>Guardar</SaveButtonCAG>
      </div>
    </FormGAC>
  );
};

NpcForm.propTypes = {
  npcData: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default NpcForm;
