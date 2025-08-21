import { createContext, useState, useEffect, useContext, useMemo } from "react";
import AuthBridge from "../bridges/AuthBridge";
import useAlert from "./AlertContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import storageEnum from "../../utils/enums/storageEnum";
import { useMagicBgStore } from "../store/MagicBGStore";

const AuthContext = createContext();

export default () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { setAlert } = useAlert();
  const [auth, setAuth] = useState({});
  const [loged, setLoged] = useState(false);
  const setSpherePos = useMagicBgStore((state) => state.setSpherePos);

  const navigate = useNavigate();

  const onLogin = async (username, password) => {
    try {
      const response = await AuthBridge.login({ username, password });
      localStorage.setItem(storageEnum.GWC_TOKEN, response.data.token);
      setAuth(response.data);
      setLoged(true);
      setSpherePos([0, 0, -22]);
      return { status: "success", navigate: `/${response.data.username}/` };
    } catch (error) {
      setAlert({ type: "error", msg: error.message, destroy: true });
      return { status: "error", navigate: null };
    }
  };

  const onLogout = async () => {
    try {
      const token = localStorage.getItem(storageEnum.GWC_TOKEN);
      await AuthBridge.logout(token);
      setAuth({});
      setLoged(false);
      localStorage.removeItem(storageEnum.GWC_TOKEN);
      setSpherePos([-10, 1.9, -23]);
      navigate(`/`);
    } catch (error) {
      console.log(error);
      setAlert({ type: "error", msg: error.message, destroy: true });
    }
  };

  const onAutoLogin = async () => {
    try {
      const token = localStorage.getItem(storageEnum.GWC_TOKEN);
      if (!token) return;
      const response = await AuthBridge.autoLogin(token);
      setAuth(response.data);
      setLoged(true);
      setSpherePos([0, 0, -22]);
      navigate(`/${response.data.username}/`);
    } catch (error) {
      setAlert({ type: "error", msg: error.message, destroy: true });
    }
  };

  useEffect(() => {
    if (loged) return;

    onAutoLogin();
  }, [auth, loged]);

  const contextValue = useMemo(
    () => ({
      auth,
      loged,
      onLogin,
      onLogout,
      onAutoLogin,
    }),
    [auth, loged]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
