import { useState, useEffect } from "react";
import PageGAC from "../framework/PageGAC";
import { useParams, useNavigate } from "react-router-dom";
import CodexEnum from "../../utils/enums/CodexEnum";
import MinimalGlowingBtn from "../framework/MinimalGlowingBtn";
import useAlert from "../context/AlertContext";

const Codex = () => {
  const { setAlert } = useAlert();
  const { username } = useParams();
  const [overSomething, setOverSomething] = useState("");

  const [toRead, setToRead] = useState("");

  const [toAppear, setToAppear] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToAppear(true);
    }, 800);
    return () => clearTimeout(timeout);
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
          className={`w-1/4 space-y-5 flex flex-col justify-center transition-all duration-800 ${!toAppear ? "opacity-0 -translate-x-96" : "opacity-100 translate-x-0"}`}
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
