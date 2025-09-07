import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate, Outlet } from "react-router-dom";
import RolesEnum from "../../utils/enums/RolesEnum";
import useAlert from "../context/AlertContext";

const AdminLayout = () => {
  const loged = useAuthStore((state) => state.loged);
  const auth = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const { setAlert } = useAlert();

  useEffect(() => {
    if (!loged) {
      navigate("/");
    }
  }, [loged]);
  useEffect(() => {
    if (auth?._id)
      if (
        ![RolesEnum.ADMIN, RolesEnum.OFFICER].includes(auth.rol.toUpperCase())
      ) {
        setAlert({
          msg: "Lo siento, pero no puedo permitir que entres ahí...",
          type: "warning",
          destroy: true,
        });
        navigate(`/${auth.username}/`);
      }
  }, [auth]);
  return (
    <div className="max-h-dvh min-h-dvh h-dvh cursor-default select-none flex flex-col justify-center items-center antialiased w-full max-w-screen overflow-hidden">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
