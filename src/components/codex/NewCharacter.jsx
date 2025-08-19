import { useState } from "react";
import CodexBridge from "../../bridges/CodexBridge";
import CodexEnum from "../../../utils/enums/CodexEnum";
import ReactMarkdown from "react-markdown";

const NewCharacter = () => {
  const [textToRender, setTextToRender] = useState("");

  const getTextToRender = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    let response;
    let htmlText = "";
    switch (id) {
      case CodexEnum.INTRO:
        response = await CodexBridge.getIntro();
        htmlText = response.data;
        break;
      case CodexEnum.NEW_CHARACTER:
        response = await CodexBridge.getNewCharacter();
        htmlText = response.data;
        break;
      case CodexEnum.ATTRIBUTES_AND_TALENTS:
        response = await CodexBridge.getAttributesAndTalents();
        htmlText = response.data;
        break;
      case CodexEnum.RACES:
        response = await CodexBridge.getRaces();
        htmlText = response.data;
        break;
      case CodexEnum.PERKS:
        response = await CodexBridge.getPerks();
        htmlText = response.data;
        break;
      case CodexEnum.ARMOR:
        response = await CodexBridge.getArmor();
        htmlText = response.data;
        break;
      case CodexEnum.SHIELDS:
        response = await CodexBridge.getShields();
        htmlText = response.data;
        break;
      case CodexEnum.WEAPONS:
        response = await CodexBridge.getWeapons();
        htmlText = response.data;
        break;
      case CodexEnum.AMMO:
        response = await CodexBridge.getAmmo();
        htmlText = response.data;
        break;
      case CodexEnum.PETS:
        response = await CodexBridge.getPets();
        htmlText = response.data;
        break;
      case CodexEnum.SPECIAL_FEATURES:
        response = await CodexBridge.getSpecialFeatures();
        htmlText = response.data;
        break;

      default:
        break;
    }

    setTextToRender(htmlText);
  };
  return (
    <div className=" h-full w-full flex flex-row bg-blue-dragon/40 shadow rounded-2xl">
      <div className="w-2/7 text-sm pl-5 py-5 border-r border-arcane-bright text-arcane-bright">
        <h3 className="font-bold text-lg">Indice</h3>
        <ul className="space-y-2 list-disc ml-10 text-mana">
          <li>
            <button id={CodexEnum.INTRO} onClick={getTextToRender}>
              Introducción
            </button>
          </li>
          <li>
            <button id={CodexEnum.NEW_CHARACTER} onClick={getTextToRender}>
              Nuevo Personaje
            </button>
          </li>
          <li>
            <button
              id={CodexEnum.ATTRIBUTES_AND_TALENTS}
              onClick={getTextToRender}
            >
              Atributos y talentos
            </button>
          </li>
          <li>
            <button id={CodexEnum.RACES} onClick={getTextToRender}>
              Razas
            </button>
          </li>
          <li>
            <button id={CodexEnum.PERKS} onClick={getTextToRender}>
              Rasgos
            </button>
          </li>
          <li>
            <button id={CodexEnum.ARMOR} onClick={getTextToRender}>
              Armadura
            </button>
          </li>
          <li>
            <button id={CodexEnum.SHIELDS} onClick={getTextToRender}>
              Escudos
            </button>
          </li>
          <li>
            <button id={CodexEnum.WEAPONS} onClick={getTextToRender}>
              Armas
            </button>
          </li>
          <li>
            <button id={CodexEnum.AMMO} onClick={getTextToRender}>
              Munición
            </button>
          </li>
          <li>
            <button id={CodexEnum.PETS} onClick={getTextToRender}>
              Mascotas
            </button>
          </li>
          <li>
            <button id={CodexEnum.SPECIAL_FEATURES} onClick={getTextToRender}>
              Características especiales
            </button>
          </li>
        </ul>
      </div>
      <div className="p-5 max-h-[80vh] w-3/4 overflow-y-auto bg-blue-dragon/80 text-arcane-bright prose">
        <ReactMarkdown children={textToRender} />
      </div>
    </div>
  );
};

export default NewCharacter;
