import FormGAC from "../framework/FormGAC";
import InputGAC from "../framework/InputGAC";
import useAlert from "../context/AlertContext";
import useAuth from "../context/AuthContext";
import { useState } from "react";
import GAC from "../framework/GAC";
import MinimalForm from "../framework/MinimalForm";

const Login = () => {
  const { setAlert } = useAlert();
  const { onLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0)
      return setAlert({
        type: "error",
        msg: "Necesito que me des tu nombre para revisarlo en la lista de personas permitidas...",
        destroy: true,
      });
    onLogin(username, password);
  };
  return (
    <div className="w-full min-h-screen flex flex-col justify-center">
      <div className="w-1/4">
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
