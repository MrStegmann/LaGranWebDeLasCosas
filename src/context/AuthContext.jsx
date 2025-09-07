import { createContext, useState, useEffect, useContext, useMemo } from "react";
import AuthBridge from "../bridges/AuthBridge";
import useAlert from "./AlertContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import storageEnum from "../../utils/enums/storageEnum";
import { useMagicBgStore } from "../store/MagicBGStore";
import { useAuthStore } from "../store/AuthStore";

const AuthContext = createContext();

export default () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { setAlert } = useAlert();
  const auth = useAuthStore((state) => state.auth);
  const loged = useAuthStore((state) => state.loged);
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoged = useAuthStore((state) => state.setLoged);
  const setSphereToLogin = useMagicBgStore((state) => state.setSphereToLogin);

  const navigate = useNavigate();

  const onLogin = async (username, password) => {
    try {
      const response = await AuthBridge.login({ username, password });
      localStorage.setItem(storageEnum.GWC_TOKEN, response.data.token);
      setAuth(response.data);
      setLoged(true);
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
      setSphereToLogin();
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
      navigate(`/${response.data.username}/`);
    } catch (error) {
      setAlert({ type: "error", msg: error.message, destroy: true });
    }
  };

  useEffect(() => {
    if (loged) return;

    onAutoLogin();
  }, [auth, loged]);

  return (
    <AuthContext.Provider value={{ onLogin, onLogout, onAutoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
