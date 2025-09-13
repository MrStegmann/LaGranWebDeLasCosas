import PageGAC from "@/framework/PageGAC";
import useAuth from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAlert from "@/context/AlertContext";
import { useMagicBgStore } from "@/store/MagicBGStore";
import MainMenuEnum from "@/../utils/enums/MainMenuEnum";
import RolesEnum from "@/../utils/enums/RolesEnum";
import { useCurrentMenu, usePageStore } from "@/store/PageStore";
import RingMenu from "../framework/RingMenu";

const Mainmenu = () => {
  const { onLogout } = useAuth();
  const { username } = useParams();
  const { setAlert } = useAlert();
  const currentMenu = useCurrentMenu((state) => state.currentMenu);
  const setCurrentMenu = useCurrentMenu((state) => state.setCurrentMenu);
  const setSphereToMainMenu = useMagicBgStore(
    (state) => state.setSphereToMainMenu
  );

  const setToAppear = usePageStore((state) => state.setToAppear);

  const [overSomething, setOverSomething] = useState("true");

  const navigate = useNavigate();

  useEffect(() => {
    setSphereToMainMenu();
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
    // {
    //   fnc: () => navigateTo(`/${username}/codex`),
    //   label: "Codex",
    //   minRol: RolesEnum.GUEST,
    //   id: MainMenuEnum.GREAT_BOOK,
    // },
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

  const menuConfig = {
    main: [
      // { id: MainMenuEnum.GREAT_BOOK, label: "Codex", submenu: "codexMenu" },
      { id: MainMenuEnum.SHEETS, label: "Fichas", submenu: "sheetsMenu" },
      {
        id: MainMenuEnum.USER_MEMBERS,
        label: "Miembros",
        fnc: () => navigateTo(`/admin/users-list`),
      },
      { id: MainMenuEnum.LOGOUT, label: "Cerrar sesión", fnc: handleLogout },
    ],
    sheetsMenu: [
      { id: "a2", label: "Crear Ficha de NPC" },
      { id: "a4", label: "Lista de NPCs" },
    ],
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        onMouseOver={(e) => setOverSomething(e.target.id)}
        className={`relative pb-10 mb-10`}
      >
        <RingMenu
          menus={menuConfig}
          side="left"
          setCurrentMenu={setCurrentMenu}
          currentMenu={currentMenu}
        />
        {/* <CircularMenu items={items} /> */}
      </div>
    </div>
  );
};

export default Mainmenu;
