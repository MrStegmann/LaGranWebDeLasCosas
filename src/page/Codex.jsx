import { useState, useEffect } from "react";
import PageGAC from "../framework/PageGAC";
import { useParams } from "react-router-dom";
import GlowLinkGAC from "../framework/GlowLinkGAC";
import AzulitoDrake from "../components/AzulitoDrake";
import CodexEnum from "../../utils/enums/CodexEnum";

const Codex = () => {
  const { username } = useParams();
  const [overSomething, setOverSomething] = useState("");
  const [dragonSpeech, setDragonSpeech] = useState("");

  useEffect(() => {
    if (overSomething) {
      if (overSomething === CodexEnum.MECHANICS) {
        setDragonSpeech(
          "¿Un repaso de las mecánicas del sistema? Siempre es bueno darle un repaso por si necesitas salvar cualquier situación. Me encanta ver cuando los jugadores usan sus conocimientos en el sistema para contraargumentar al máster."
        );
      }
      if (overSomething === CodexEnum.BACK) {
        setDragonSpeech("¿Ya has visto todo lo que necesitabas ver?");
      }
    } else {
      setDragonSpeech("");
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
              to: `/${username}/codex/new-character`,
              label: "Nuevo Personaje",
              id: CodexEnum.NEW_CHARACTER,
            },
            {
              to: `/${username}/codex/sas`,
              label: "Hechizos y Habilidades",
              id: CodexEnum.SAS,
            },
            {
              to: `/${username}/codex/professions`,
              label: "Profesiones",
              id: CodexEnum.PROFESSIONS,
            },
            {
              to: `/${username}/codex/languages`,
              label: "Idiomas",
              id: CodexEnum.LANGUAGES,
            },
            {
              to: `/${username}/codex/mechanics`,
              label: "Mecánicas",
              id: CodexEnum.MECHANICS,
            },
            {
              to: `/${username}/codex/magic`,
              label: "Magia",
              id: CodexEnum.MAGIC,
            },
            {
              to: `/${username}/codex/new_npc`,
              label: "Crear un NPC",
              id: CodexEnum.NEW_NPC,
            },
            {
              to: `/${username}/`,
              label: "Volver",
              id: CodexEnum.BACK,
            },
          ].map(({ to, label, id }) => (
            <GlowLinkGAC id={id} key={to} to={to}>
              {label}
            </GlowLinkGAC>
          ))}
        </div>
        <div className="relative w-1/3">
          <div className="absolute bottom-0 right-0">
            <AzulitoDrake
              overSomething={overSomething}
              dragonSpeech={dragonSpeech}
            />
          </div>
        </div>
      </div>
    </PageGAC>
  );
};

export default Codex;
