import { useState, useEffect } from "react";
import PageGAC from "../framework/PageGAC";
import { useParams, useNavigate } from "react-router-dom";
import CodexEnum from "../../utils/enums/CodexEnum";
import MinimalGlowingBtn from "../framework/MinimalGlowingBtn";
import useAlert from "../context/AlertContext";
import { usePageStore } from "../store/PageStore";
import { useMagicBgStore } from "../store/MagicBGStore";

const Codex = () => {
  const { setAlert } = useAlert();
  const { username } = useParams();
  const setToAppear = usePageStore((state) => state.setToAppear);
  const setSphereToCodex = useMagicBgStore((state) => state.setSphereToCodex);
  const [overSomething, setOverSomething] = useState("");

  const [toRead, setToRead] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setSphereToCodex();
  }, []);

  useEffect(() => {
    if (overSomething) {
      if (overSomething === CodexEnum.BACK) {
        setAlert({ msg: "¿Ya has visto todo lo que necesitabas ver?" });
      }
    } else {
      setAlert({ msg: "" });
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
      <div className="w-full h-full flex flex-row">
        <div
          onMouseOver={(e) => setOverSomething(e.target.id)}
          className={`w-1/4 space-y-5 flex flex-col justify-center`}
        >
          {[
            {
              to: "VIEW_CODEX",
              label: "Ver Codex",
              id: "VIEW_CODEX",
            },
            {
              to: "CREATE_CODEX_FRAGMENT",
              label: "Nuevo fragmento",
              id: "CREATE_CODEX_FRAGMENT",
            },
            {
              to: "EDIT_CODEX_FRAGMENT",
              label: "Editar fragmento",
              id: "EDIT_CODEX_FRAGMENT",
            },
          ].map(({ to, label, id }) => (
            <MinimalGlowingBtn id={id} onClick={() => setToRead(to)} key={id}>
              {label}
            </MinimalGlowingBtn>
          ))}
          <MinimalGlowingBtn
            id={CodexEnum.BACK}
            onClick={() => navigateTo(`/${username}/`)}
            key={CodexEnum.BACK}
          >
            Volver
          </MinimalGlowingBtn>
        </div>
      </div>
    </PageGAC>
  );
};

export default Codex;
