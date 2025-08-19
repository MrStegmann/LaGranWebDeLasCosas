import PageGAC from "../framework/PageGAC";
import useAuth from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAlert from "../context/AlertContext";

import MainMenuEnum from "../../utils/enums/MainMenuEnum";
import MinimalGlowingBtn from "../framework/MinimalGlowingBtn";

const Mainmenu = () => {
  const { onLogout } = useAuth();
  const { username } = useParams();
  const { setAlert } = useAlert();

  const [toAppear, setToAppear] = useState(false);

  const [overSomething, setOverSomething] = useState("true");

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToAppear(true);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (overSomething) {
      if (overSomething === MainMenuEnum.GREAT_BOOK) {
        setAlert({
          msg: "¡Ah! El Codex. Ahí tienes toda la información sobre el sistema de dados, mecánicas, guías, explicaciones, etc. A mi Codex no me gusta, prefiero... ¡El Gran Libro de las Cosas!",
          type: "info",
        });
      }
      if (overSomething === MainMenuEnum.GRIMOIRE) {
        setAlert({
          msg: "¿Te interesa la magia? ¿O eres más de habilidades únicas? Bueno, esta sección tiene ambas. Yo prefiero la magia, la verdad... ¿De qué hablabamos? ¡Ah! ¡Si! En el grimorio podrás crear, actualizar o ver hechizos y habilidades.",
          type: "info",
        });
      }
      if (overSomething === MainMenuEnum.SHEETS) {
        setAlert({
          msg: "¿En busca de alguien? Bueno, en la gran Librería encontrarás información de cualquiera.... También puedes añadir la ficha de alguien que no está o la tuya misma. ¡Es importante tener toda la información reunida y organizada!",
          type: "info",
        });
      }
      if (overSomething === MainMenuEnum.ITEM_MAKER) {
        setAlert({
          msg: "¿Buscando un nuevo artefacto? ¡En la forja encontrarás todos los objetos! Desde los más comunes hasta los más inusuales y legendarios. ¡También puedes crear nuevos objetos si eres un gran forjador!",
          type: "info",
        });
      }
      if (overSomething === MainMenuEnum.LOGOUT) {
        setAlert({
          msg: "¿Ya te marchas? Vaya... bueno, ¡hasta la próxima!",
          destroy: true,
          type: "info",
        });
      }
    } else {
      setAlert({});
    }
  }, [overSomething]);

  const navigateTo = (path) => {
    setToAppear(false);
    setTimeout(() => {
      navigate(path);
    }, 800);
  };

  return (
    <PageGAC>
      <div className="w-full flex flex-col relative ">
        <div
          onMouseOver={(e) => setOverSomething(e.target.id)}
          className={`absolute -top-[13vh] left-[12vw] w-1/4 backdrop-blur-sm rounded-2xl shadow-lg shadow-mana/60 px-8 py-5 space-y-5 flex flex-col transition-all duration-800 ${!toAppear ? "opacity-0 -translate-x-96" : "opacity-100 translate-x-0"}`}
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
            <MinimalGlowingBtn id={id} onClick={() => navigateTo(to)} key={id}>
              {label}
            </MinimalGlowingBtn>
          ))}
          <MinimalGlowingBtn id={MainMenuEnum.LOGOUT} onClick={onLogout}>
            Cerrar sesión
          </MinimalGlowingBtn>
        </div>
      </div>
    </PageGAC>
  );
};

export default Mainmenu;
