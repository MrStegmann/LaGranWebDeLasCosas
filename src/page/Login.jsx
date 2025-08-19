import InputGAC from "../framework/InputGAC";
import useAlert from "../context/AlertContext";
import useAuth from "../context/AuthContext";
import { useState } from "react";
import MinimalForm from "../framework/MinimalForm";
import { useNavigate } from "react-router-dom";
import GeneralWelcome from "../../utils/azulitomsg/GeneralWelcome";
import MorningWelcome from "../../utils/azulitomsg/MorningWelcome";
import EveningWelcome from "../../utils/azulitomsg/EveningWelcome";
import NoonWelcome from "../../utils/azulitomsg/NoonWelcome";
import MsgFormater from "../../utils/azulitomsg/MsgFormater";
import Times from "../../utils/Times";

const Login = () => {
  const { setAlert } = useAlert();
  const { onLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isDisappearing, setIsDisappearing] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length === 0)
      return setAlert({
        type: "error",
        msg: "Necesito que me des tu nombre para revisarlo en la lista de personas permitidas...",
        destroy: true,
      });

    if (password.length === 0)
      return setAlert({
        type: "error",
        msg: "Necesito que me des tu contraseña para poder verificar que eres tú...",
        destroy: true,
      });

    const result = await onLogin(username, password);
    if (result.status === "success") {
      setIsDisappearing(true);
      let welcomeMessages;
      const times = new Times();
      if (times.isMorning()) {
        welcomeMessages =
          MorningWelcome[Math.floor(Math.random() * MorningWelcome.length)];
      } else if (times.isEvening()) {
        welcomeMessages =
          EveningWelcome[Math.floor(Math.random() * EveningWelcome.length)];
      } else if (times.isNoon()) {
        welcomeMessages =
          NoonWelcome[Math.floor(Math.random() * NoonWelcome.length)];
      } else {
        welcomeMessages =
          GeneralWelcome[Math.floor(Math.random() * GeneralWelcome.length)];
      }
      const formattedMsg = MsgFormater.setParams(welcomeMessages, [username]);
      setAlert({
        msg: formattedMsg,
      });
      setTimeout(() => {
        navigate(result.navigate);
      }, 1200);
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col justify-center">
      <div
        className={`w-1/4 transition-all duration-1000 ${isDisappearing ? "opacity-0 -translate-x-96" : "opacity-100 translate-x-0"}`}
      >
        <MinimalForm onSubmit={handleSubmit} buttonText={"Acceder"}>
          <h2 className="text-3xl mb-5 font-bold">Inicio de sesión</h2>
          <div className="col-span-3">
            <label htmlFor="username" className="block mb-1 font-semibold">
              Usuario
            </label>
            <InputGAC
              id="username"
              customClass={"w-full"}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <label htmlFor="password" className="block mb-1 font-semibold">
              Contraseña
            </label>
            <InputGAC
              id="password"
              customClass={"w-full"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </MinimalForm>
      </div>
    </div>
  );
};

export default Login;
