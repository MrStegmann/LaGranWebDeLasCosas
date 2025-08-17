import { createContext, useState, useEffect, useContext, useMemo } from "react";
import useSaS from "./SaSContext";
import NpcBridge from "../bridges/NpcBridge";
import CharacterBridge from "../bridges/CharacterBridge";
import useAlert from "./AlertContext";
import { Character } from "@models/Character";
import { Npc } from "@models/Npc";
import { Gear } from "@models/extensions/Gear";
import { Attribute } from "@models/extensions/Attribute";
import { Talent } from "@models/extensions/Talent";
import PropTypes from "prop-types";

const SheetContext = createContext();

export default () => {
  return useContext(SheetContext);
};

export const SheetProvider = ({ children }) => {
  const { setAlert } = useAlert();
  const [npcs, setNpcs] = useState([]);
  const [npcsReady, setNpcsReady] = useState(false);
  const [chars, setChars] = useState([]);
  const [charsReady, setCharsReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const { loading: sasLoading } = useSaS();

  const handleCreateChar = async (char) => {
    try {
      const response = await CharacterBridge.createCharacter(char);
      setChars((before) => [...before, response.data]);
      return response.data;
    } catch (error) {
      setAlert({ msg: error.message, type: "error" });
    }
  };
  const handleUpdateChar = async (char) => {
    try {
      const response = await CharacterBridge.updateCharacter(char);
      setChars((before) => [
        ...before.filter((c) => c._id !== response.data._id),
        response.data,
      ]);
      return response.data;
    } catch (error) {
      setAlert({ msg: error.message, type: "error" });
    }
  };
  const handleDeleteChar = async (char) => {
    try {
      await CharacterBridge.deleteCharacter(char._id);
      setChars((before) => [...before.filter((c) => c._id !== char._id)]);
    } catch (error) {
      setAlert({ msg: error.message, type: "error" });
    }
  };

  const handleCreateNpc = async (npc) => {
    try {
      const response = await NpcBridge.createNpc(npc);
      setNpcs([...npcs, response.data]);
      return response.data;
    } catch (error) {
      setAlert({ msg: error.message, type: "error" });
    }
  };

  const handleUpdateNpc = async (npc) => {
    try {
      const response = await NpcBridge.updateNpc(npc);
      setNpcs((before) => [
        ...before.filter((np) => np._id !== response.data._id),
        response.data,
      ]);
      return response.data;
    } catch (error) {
      setAlert({ msg: error.message, type: "error" });
    }
  };

  const handleDeleteNpc = async (npc) => {
    try {
      await NpcBridge.deleteNpc(npc._id);
      setNpcs((before) => [...before.filter((n) => n._id !== npc._id)]);
    } catch (error) {
      setAlert({ msg: error.message, type: "error" });
    }
  };

  useEffect(() => {
    if (sasLoading) return;
    const timeout = setTimeout(async () => {
      try {
        const response = await NpcBridge.getNpcs();
        setNpcs(response.data);
        setTimeout(() => setNpcsReady(true), 1000);
      } catch (error) {
        setAlert({ msg: error.message, type: "error" });
        console.log(error);
        setNpcs([]);
      }

      try {
        const response = await CharacterBridge.getCharacters();

        setChars(response.data);
        setTimeout(() => setCharsReady(true), 1000);
      } catch (error) {
        console.log(error);
        setAlert({ msg: error.message, type: "error" });
        setChars([]);
      }

      // setLoading(false);
    }, 25);

    return () => clearTimeout(timeout);
  }, [sasLoading]);

  const contextValue = useMemo(
    () => ({
      Npc,
      Character,
      Attribute,
      Talent,
      Gear,
      chars,
      handleCreateChar,
      handleUpdateChar,
      handleDeleteChar,
      npcs,
      handleCreateNpc,
      handleUpdateNpc,
      handleDeleteNpc,
      charsReady,
      npcsReady,
    }),
    [chars, npcs, charsReady, npcsReady]
  );

  return (
    <SheetContext.Provider value={contextValue}>
      {children}
    </SheetContext.Provider>
  );
};

SheetProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
