import PageGAC from "../framework/PageGAC";
import useAuth from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAlert from "../context/AlertContext";
import { CENTER_CENTER_STATE, useMagicBgStore } from "../store/MagicBGStore";
import MainMenuEnum from "../../utils/enums/MainMenuEnum";
import CircularMenu from "../components/menus/CircularMenu";
import RolesEnum from "../../utils/enums/RolesEnum";
import { usePageStore } from "../store/PageStore";

const Mainmenu = () => {
  const { onLogout } = useAuth();
  const { username } = useParams();
  const { setAlert } = useAlert();
  const setSpherePos = useMagicBgStore((state) => state.setSpherePos);

  const setToAppear = usePageStore((state) => state.setToAppear);

  const [overSomething, setOverSomething] = useState("true");

  const navigate = useNavigate();

  useEffect(() => {
    setSpherePos(CENTER_CENTER_STATE);
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
      if (overSomething === MainMenuEnum.USER_MEMBERS) {
        setAlert({
          msg: "Uy, este lugar está reservado para gente... importante, y tú lo eres. Aquí puedes gestionar quiénes pueden hacer uso de toda la información que hay guardada en el Nexo.",
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

  const handleLogout = () => {
    setToAppear(false);
    setTimeout(() => {
      onLogout();
    }, 800);
  };

  const items = [
    {
      fnc: () => navigateTo(`/${username}/codex`),
      label: "Codex",
      minRol: RolesEnum.GUEST,
      id: MainMenuEnum.GREAT_BOOK,
    },
    // {
    //   fnc: () => navigateTo(`/${username}/grimoire`),
    //   label: "Grimorio",
    //   minRol: RolesEnum.GUEST,
    //   id: MainMenuEnum.GRIMOIRE,
    // },
    // {
    //   fnc: () => navigateTo(`/${username}/sheets`),
    //   label: "Librería",
    //   minRol: RolesEnum.GUEST,
    //   id: MainMenuEnum.SHEETS,
    // },
    // {
    //   fnc: () => navigateTo(`/${username}/item-maker`),
    //   label: "La Forja",
    //   minRol: RolesEnum.GUEST,
    //   id: MainMenuEnum.ITEM_MAKER,
    // },
    {
      fnc: () => navigateTo(`/admin/users`),
      label: "Miembros",
      minRol: RolesEnum.OFFICER,
      id: MainMenuEnum.USER_MEMBERS,
    },
    {
      fnc: handleLogout,
      label: "Cerrar Sesión",
      id: MainMenuEnum.LOGOUT,
    },
  ];

  return (
    <PageGAC>
      <div
        onMouseOver={(e) => setOverSomething(e.target.id)}
        className={`relative pb-10 mb-10`}
      >
        <CircularMenu items={items} />
      </div>
    </PageGAC>
  );
};

export default Mainmenu;
