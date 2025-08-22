import { createContext, useState, useEffect, useContext, useMemo } from "react";
import SpellBridge from "../bridges/SpellBridge";
import SkillBridge from "../bridges/SkillBridge";
import useAlert from "./AlertContext";
import { useAuthStore } from "../store/AuthStore";
import { Spell } from "@models/Spell";
import { Skill } from "@models/Skill";
import PropTypes from "prop-types";

const SaSContext = createContext();

export default () => {
  return useContext(SaSContext);
};

const SSProvider = ({ children }) => {
  const { setAlert } = useAlert();
  const loged = useAuthStore((state) => state.loged);
  const [spells, setSpells] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spellsReady, setSpellsReady] = useState(false);
  const [skillsReady, setSkillsReady] = useState(false);

  const getSpellById = (id) => {
    const spell = spells.find((spell) => spell._id === id);
    return spell;
  };

  const handleCreateSpell = async (spell) => {
    try {
      const response = await SpellBridge.createSpell(spell);
      setSpells((before) => [...before, response.data]);
      return response.data;
    } catch (error) {
      setAlert({ type: "error", msg: error.message });
    }
  };

  const handleUpdateSpell = async (spell) => {
    try {
      const response = await SpellBridge.updateSpell(spell);
      setSpells((before) => [
        ...before.filter((sp) => sp._id !== response.data._id),
        response.data,
      ]);
      return response.data;
    } catch (error) {
      setAlert({ type: "error", msg: error.message });
    }
  };

  const handleDeleteSpell = async (spell) => {
    try {
      await SpellBridge.deleteSpell(spell._id);
      setSpells((before) => [...before.filter((sp) => sp._id !== spell._id)]);
    } catch (error) {
      setAlert({ type: "error", msg: error.message });
    }
  };

  const getSkillById = (id) => {
    const skill = skills.find((skill) => skill._id === id);
    return skill;
  };

  const handleCreateSkill = async (skill) => {
    try {
      const response = await SkillBridge.createSkill(skill);
      setSkills([...skills, response.data]);
      return response.data;
    } catch (error) {
      setAlert({ type: "error", msg: error.message });
    }
  };

  const handleUpdateSkill = async (skill) => {
    try {
      const response = await SkillBridge.updateSkill(skill);
      setSkills((before) => [
        ...before.filter((s) => s._id !== response.data._id),
        response.data,
      ]);
      return response.data;
    } catch (error) {
      setAlert({ type: "error", msg: error.message });
    }
  };

  const handleDeleteSkill = async (skill) => {
    try {
      await SkillBridge.deleteSkill(skill._id);
      setSkills((before) => [...before.filter((s) => s._id !== skill._id)]);
    } catch (error) {
      setAlert({ type: "error", msg: error.message });
    }
  };

  useEffect(() => {
    if (!loged) return;
    const timeout = setTimeout(async () => {
      try {
        const response = await SkillBridge.getSkills();
        setSkills(response.data);
        setTimeout(() => setSkillsReady(true), 1000);
        // setSkillsReady(true);
      } catch (error) {
        console.log(error);
        setAlert({ type: "error", msg: error.message });
        setSkills([]);
      }

      try {
        const response = await SpellBridge.getSpells();
        setSpells(response.data);
        setTimeout(() => setSpellsReady(true), 1000);
        // setSpellsReady(true)
      } catch (error) {
        console.log(error);
        setAlert({ type: "error", msg: error.message });
        setSpells([]);
      }

      // setTimeout(() => setLoading(false), 100)
    }, 25);

    return () => clearTimeout(timeout);
  }, [loged]);

  useEffect(() => {
    if (skillsReady && spellsReady) setTimeout(() => setLoading(false), 100);
  }, [skillsReady, spellsReady]);

  const contextValue = useMemo(
    () => ({
      Spell,
      Skill,
      spells,
      spellsReady,
      loading,
      getSpellById,
      handleCreateSpell,
      handleUpdateSpell,
      handleDeleteSpell,
      skills,
      skillsReady,
      getSkillById,
      handleCreateSkill,
      handleUpdateSkill,
      handleDeleteSkill,
    }),
    [spells, skills, skillsReady, spellsReady, loading]
  );

  return (
    <SaSContext.Provider value={contextValue}>{children}</SaSContext.Provider>
  );
};

SSProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { SSProvider };
