import React, { useEffect } from "react";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  const loged = useAuthStore((state) => state.loged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loged) {
      navigate("/");
    }
  }, [loged]);
  return (
    <div className="max-h-dvh h-dvh min-h-dvh cursor-default select-none flex flex-col justify-center items-center antialiased w-full max-w-screen overflow-hidden">
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
