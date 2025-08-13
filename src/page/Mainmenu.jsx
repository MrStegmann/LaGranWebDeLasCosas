import PageGAC from "../framework/PageGAC";
import useAuth from "../context/AuthContext";
import GlowButtonGAC from "../framework/GlowButtonGAC";
import GlowLinkGAC from "./GlowLinkGAC";
import { useEffect, useState } from "react";

import useSaS from "../context/SaSContext";
import useItem from "../context/ItemsContext";
import useSS from "../context/SheetContext";

import MainMenuEnum from "../../utils/enums/MainMenuEnum";
import LoadingScreen from "../components/LoadingScreen";

const Mainmenu = () => {
  const { onLogout } = useAuth();

  const { spellsReady, skillsReady } = useSaS();
  const { itemsReady } = useItem();
  const { charsReady, npcsReady } = useSS();

  const [allLoaded, setAllLoaded] = useState(false);
  const [overSomething, setOverSomething] = useState("");
  const [dragonSpeech, setDragonSpeech] = useState("");

  useEffect(() => {
    if (overSomething) {
      if (overSomething === MainMenuEnum.GREAT_BOOK) {
        setDragonSpeech(
          "Ahí se recoge toda la información sobre el sistema: Como hacer una ficha nueva, los atributos, mecánicas, hacer hechizos, habilidades y mucho más. Échale u ojo de vez en cuando."
        );
      }
      if (overSomething === MainMenuEnum.GRIMOIRE) {
        setDragonSpeech(
          "Ahí se guardan todos los hechizos y habilidades que se han ido creando a lo largo del tiempo. No te asustes, tiene filtros para facilitar la búsqueda. También es dónde podrás crear tanto hechizos como habilidades."
        );
      }
      if (overSomething === MainMenuEnum.SHEETS) {
        setDragonSpeech(
          "Ahí se guardan todas las fichas de personaje y de Npc que se han creado hasta ahora. También es donde podrás crear nuevas fichas, tanto para Personaje como para Npc, también se actualizan existentes o se eliminan viejos."
        );
      }
      if (overSomething === MainMenuEnum.ITEM_MAKER) {
        setDragonSpeech(
          "Ahí se guardan la información de todos los objetos que se han creado hasta ahora. También es dónde se crean nuevos, se modifican existentes o los eliminas."
        );
      }
      if (overSomething === MainMenuEnum.LOGOUT) {
        setDragonSpeech("¿Ya te marchas? Vaya... bueno, ¡hasta la próxima!");
      }
    } else {
      setDragonSpeech("");
    }
  }, [overSomething]);

  useEffect(() => {
    if (skillsReady && spellsReady && itemsReady && charsReady && npcsReady) {
      // setTimeout(() => setAllLoaded(true), 1000);
    }
  }, [skillsReady, spellsReady, itemsReady, charsReady, npcsReady]);
  return (
    <>
      {allLoaded ? (
        <PageGAC>
          <div className="w-full h-full flex flex-col md:flex-row justify-center md:justify-between">
            <div
              onMouseOver={(e) => setOverSomething(e.target.id)}
              className="w-1/4 px-10 flex flex-col text-mana"
            >
              {[
                {
                  to: "/the-great-book-of-things",
                  label: "El Gran Libro de las Cosas",
                  id: MainMenuEnum.GREAT_BOOK,
                },
                {
                  to: "/grimoire",
                  label: "Grimorio",
                  id: MainMenuEnum.GRIMOIRE,
                },
                {
                  to: "/sheets",
                  label: "Forja de Fichas",
                  id: MainMenuEnum.SHEETS,
                },
                {
                  to: "/item-maker",
                  label: "Forja de Objetos",
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
            <div className="w-1/3">
              <div
                className={`
						w-72 text-xs bg-blue-dragon/90 text-mana border rounded-4xl p-5 absolute bottom-1/3 right-1/9 ${overSomething ? "opacity-100" : "opacity-0"}
						`}
              >
                {dragonSpeech}
                {/* Cola del bocadillo */}
                <span
                  className="absolute -bottom-2 right-6 
									w-0 h-0 
									border-l-[8px] border-l-transparent
									border-r-[8px] border-r-transparent
									border-t-[8px] border-t-mana"
                ></span>
              </div>
              <img
                className="w-64 absolute bottom-0 right-0"
                src="/Azulito.png"
              />
            </div>
          </div>
        </PageGAC>
      ) : (
        <LoadingScreen
          states={[skillsReady, spellsReady, itemsReady, charsReady, npcsReady]}
        />
      )}
    </>
  );
};

export default Mainmenu;
