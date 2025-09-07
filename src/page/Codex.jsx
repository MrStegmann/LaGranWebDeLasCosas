import { useState, useEffect } from "react";
import PageGAC from "../framework/PageGAC";
import { useParams, useNavigate } from "react-router-dom";
import CodexEnum from "../../utils/enums/CodexEnum";
import MinimalGlowingBtn from "../framework/MinimalGlowingBtn";
import useAlert from "../context/AlertContext";
import { usePageStore } from "../store/PageStore";
import { useMagicBgStore } from "../store/MagicBGStore";
import CodexFragmentForm from "../components/forms/CodexFragmentForm";

const Codex = () => {
  const { setAlert } = useAlert();
  const { username } = useParams();
  const setToAppear = usePageStore((state) => state.setToAppear);
  const setSphereToCodex = useMagicBgStore((state) => state.setSphereToCodex);
  const [overSomething, setOverSomething] = useState("");

  const [option, setOption] = useState(CodexEnum.CREATE_CODEX_FRAGMENT);

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

  const getActive = (item) => {
    console.log(item);
  };

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
          className={`w-1/4 space-y-5 flex flex-col justify-center px-10`}
        >
          {[
            {
              to: CodexEnum.CREATE_CODEX_FRAGMENT,
              label: "Nuevo fragmento",
              id: CodexEnum.CREATE_CODEX_FRAGMENT,
            },
          ].map(({ to, label, id }) => (
            <MinimalGlowingBtn id={id} onClick={() => setOption(to)} key={id}>
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
        <div className="w-full h-full relative">
          {option === CodexEnum.CREATE_CODEX_FRAGMENT && (
            <CodexFragmentForm fragment={null} />
          )}
        </div>
      </div>
    </PageGAC>
  );
};

export default Codex;
