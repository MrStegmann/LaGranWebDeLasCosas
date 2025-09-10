import React, { useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { useNavigate, Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

const ProfileLayout = () => {
  const loged = useAuthStore((state) => state.loged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loged) {
      navigate("/");
    }
  }, [loged]);
  return (
    <div className="max-h-dvh h-dvh min-h-dvh relative cursor-default select-none w-full max-w-screen overflow-hidden">
      <Outlet />
      <Footer />
    </div>
  );
};

export default ProfileLayout;
