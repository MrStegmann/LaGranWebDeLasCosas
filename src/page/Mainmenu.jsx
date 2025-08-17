import PageGAC from "../framework/PageGAC";
import useAuth from "../context/AuthContext";
import GlowButtonGAC from "../framework/GlowButtonGAC";
import GlowLinkGAC from "../framework/GlowLinkGAC";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAlert from "../context/AlertContext";

import MainMenuEnum from "../../utils/enums/MainMenuEnum";

const Mainmenu = () => {
  const { onLogout } = useAuth();
  const { username } = useParams();
  const { setAlert } = useAlert();

  const [overSomething, setOverSomething] = useState("true");

  useEffect(() => {
    setAlert({
      msg: `¡Hola ${username}! Me alegra verte por aquí.`,
    });
  }, []);

  useEffect(() => {
    if (overSomething) {
      if (overSomething === MainMenuEnum.GREAT_BOOK) {
        setAlert({
          msg: "¡Ah! El Codex. Ahí tienes toda la información sobre el sistema de dados, mecánicas, guías, explicaciones, etc. A mi Codex no me gusta, prefiero... ¡El Gran Libro de las Cosas!",
        });
      }
      if (overSomething === MainMenuEnum.GRIMOIRE) {
        setAlert({
          msg: "¿Te interesa la magia? ¿O eres más de habilidades únicas? Bueno, esta sección tiene ambas. Yo prefiero la magia, la verdad... ¿De qué hablabamos? ¡Ah! ¡Si! En el grimorio podrás crear, actualizar o ver hechizos y habilidades.",
        });
      }
      if (overSomething === MainMenuEnum.SHEETS) {
        setAlert({
          msg: "¿En busca de alguien? Bueno, en la gran Librería encontrarás información de cualquiera.... También puedes añadir la ficha de alguien que no está o la tuya misma. ¡Es importante tener toda la información reunida y organizada!",
        });
      }
      if (overSomething === MainMenuEnum.ITEM_MAKER) {
        setAlert({
          msg: "¿Buscando un nuevo artefacto? ¡En la forja encontrarás todos los objetos! Desde los más comunes hasta los más inusuales y legendarios. ¡También puedes crear nuevos objetos si eres un gran forjador!",
        });
      }
      if (overSomething === MainMenuEnum.LOGOUT) {
        setAlert({
          msg: "¿Ya te marchas? Vaya... bueno, ¡hasta la próxima!",
          destroy: true,
        });
      }
    } else {
      setAlert({});
    }
  }, [overSomething]);

  return (
    <PageGAC>
      <div className="w-full h-full flex flex-col md:flex-row justify-center md:justify-between">
        <div
          onMouseOver={(e) => setOverSomething(e.target.id)}
          className="w-1/4 px-10 flex flex-col text-mana"
        >
          {[
            {
              to: `/${username}/codex`,
              label: "Codex",
              id: MainMenuEnum.GREAT_BOOK,
            },
            {
              to: `/${username}/grimoire`,
              label: "Grimorio",
              id: MainMenuEnum.GRIMOIRE,
            },
            {
              to: `/${username}/sheets`,
              label: "Librería",
              id: MainMenuEnum.SHEETS,
            },
            {
              to: `/${username}/item-maker`,
              label: "La Forja",
              id: MainMenuEnum.ITEM_MAKER,
            },
          ].map(({ to, label, id }) => (
            <GlowLinkGAC id={id} key={to} to={to}>
              {label}
            </GlowLinkGAC>
          ))}
          <GlowButtonGAC id={MainMenuEnum.LOGOUT} onClick={onLogout}>
            Cerrar sesión
          </GlowButtonGAC>
        </div>
      </div>
    </PageGAC>
  );
};

export default Mainmenu;
