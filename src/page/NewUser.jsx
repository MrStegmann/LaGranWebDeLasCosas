import React, { useEffect } from "react";
import RuneFrame from "@/framework/RuneFrame";
import UserForm from "@/components/forms/UserForm";
import MinimalGlowingBtn from "@/framework/MinimalGlowingBtn";
import { useAuthStore } from "@/store/AuthStore";
import { useMagicBgStore } from "../store/MagicBGStore";
import UserBridge from "@/bridges/UserBridge";
import { useNavigate } from "react-router-dom";
import useAlert from "@/context/AlertContext";

const NewUser = () => {
  const { setAlert } = useAlert();
  const auth = useAuthStore((state) => state.auth);
  const setSpherePos = useMagicBgStore((state) => state.setSpherePos);
  const setSphereRot = useMagicBgStore((state) => state.setSphereRot);
  const navigate = useNavigate();

  useEffect(() => {
    setSphereRot([0.06, 0.42, 0.5]);
    setSpherePos([6, 1.9, -18]);
  }, []);

  const onSubmit = async (user) => {
    try {
      const { _id, ...rest } = user;
      const result = await UserBridge.create(rest);
      setAlert({
        msg: `Bien, bien...  si me das un segundo... vale. ¡Perfecto! ${result.data.username} he guardado bien el usuario`,
        destroy: true,
      });
    } catch (error) {
      setAlert({
        type: "error",
        destroy: true,
        msg: error.message,
      });
    }
  };

  const navigateTo = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 800);
  };
  return (
    <div className="w-full h-full relative flex items-center">
      <div className="absolute top-0 left-0">
        <MinimalGlowingBtn
          id="backToMainMenu"
          onClick={() => navigateTo(`/${auth.username}`)}
        >
          Volver
        </MinimalGlowingBtn>
      </div>

      <div className="w-1/2">
        <RuneFrame sides="x">
          <h1 className="text-mana mb-5 font-bold text-2xl animate-pulseTextGlow">
            Nuevo usuario
          </h1>
          <UserForm data={{}} onSubmit={onSubmit} />
        </RuneFrame>
      </div>
    </div>
  );
};

export default NewUser;
