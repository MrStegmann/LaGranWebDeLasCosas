import { useEffect, useState } from "react";
import MenusEnum from "../../../utils/enums/MenusEnum";
import GlowLinkGAC from "../../framework/GlowLinkGAC";
import useAlert from "../../context/AlertContext";

const SheetsMenu = ({ username }) => {
  const { setAlert } = useAlert();
  const [overSomething, setOverSomething] = useState("");

  useEffect(() => {
    setAlert({
      msg: "¿Qué andas buscando? ¿Tu ficha de personaje, el de otro? ¿O es un Npc? ¡Uh, uh! ¿Vas a ampliar la Librería?",
    });
  }, []);

  useEffect(() => {
    if (overSomething) {
      if (overSomething === MenusEnum.CHARACTER_MENU) {
        setAlert({
          msg: "¿En busca de tu ficha? ¿Algo que tengas que modificar o solo vas a consultar lo que hay? ¿O vas a crear una nueva ficha?",
        });
      }
      if (overSomething === MenusEnum.NPC_MENU) {
        setAlert({
          msg: "¡Npcs! Es importante mantener un registro de todos las bestias... digo... seres vivos. ¿Vienes a añadir un nuevo registro o a consultar uno existente?",
        });
      }
      if (overSomething === MenusEnum.BACK) {
        setAlert({
          msg: "Bueno... volvamos entonces.",
        });
      }
    } else {
      setAlert({});
    }
  }, [overSomething]);
  return (
    <div
      className="w-full px-10 flex flex-col text-mana"
      onMouseOver={(e) => setOverSomething(e.target.id)}
    >
      {[
        {
          to: `/${username}/sheets/characters-menu`,
          label: "Personajes",
          id: MenusEnum.CHARACTER_MENU,
        },
        {
          to: `/${username}/sheets/npcs-menu`,
          label: "Npcs",
          id: MenusEnum.NPC_MENU,
        },
        {
          to: `/${username}/`,
          label: "Volver",
          id: MenusEnum.BACK,
        },
      ].map(({ to, label, id }) => (
        <GlowLinkGAC id={id} key={to} to={to}>
          {label}
        </GlowLinkGAC>
      ))}
    </div>
  );
};

export default SheetsMenu;
