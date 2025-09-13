import React, { useEffect, useState } from "react";
import RuneFrame from "@/framework/RuneFrame";
import UserBridge from "@/bridges/UserBridge";
import useAlert from "@/context/AlertContext";
import { useMagicBgStore } from "@/store/MagicBGStore";
import UserForm from "@/components/forms/UserForm";
import { useNavigate } from "react-router-dom";
import MinimalGlowingBtn from "@/framework/MinimalGlowingBtn";
import { useAuthStore } from "@/store/AuthStore";

const UsersList = () => {
  const { setAlert } = useAlert();
  const setSpherePos = useMagicBgStore((state) => state.setSpherePos);
  const setSphereRot = useMagicBgStore((state) => state.setSphereRot);
  const auth = useAuthStore((state) => state.auth);

  const [usersList, setUsersList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [overUser, setOverUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setSpherePos([12, 3, -25]);
    setSphereRot([0.1, 0, 0.25]);
    setAlert({
      msg: "",
    });
  }, []);
  const getUsers = async () => {
    try {
      const response = await UserBridge.get();
      setUsersList(response.data);
    } catch (error) {
      setAlert({
        type: "error",
        destroy: true,
        msg: error.message,
      });
    }
  };

  const selectUser = (user) => {
    setSelected(user._id);
    setUserData(user);
  };

  const onSubmit = async (user) => {
    try {
      const result = await UserBridge.update(user);
      setAlert({
        msg: `Bien, bien...  si me das un segundo... vale. ¡Perfecto! ${result.data.username} se ha actualizado correctamente`,
        destroy: true,
      });
      const response = await UserBridge.get(
        localStorage.getItem(storageEnum.GWC_TOKEN)
      );
      setUsersList(response.data);
    } catch (error) {
      setAlert({
        type: "error",
        destroy: true,
        msg: error.message,
      });
    }
  };

  const deleteUser = async (userId) => {
    try {
      await UserBridge.delete(userId);
      setAlert({
        msg: `Bueno, pues ya estaría... Eliminado de la existencia... Para siempre. Sip, para siempre.`,
        destroy: true,
      });
      const response = await UserBridge.get();
      setUsersList(response.data);
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
      <div className="w-1/2 h-3/4">
        <RuneFrame sides="x">
          <div className="w-full h-full flex flex-row justify-between">
            <div className="w-1/4 h-full max-h-full overflow-y-auto space-y-2">
              {usersList.map((user) => (
                <button
                  key={user._id}
                  onMouseOver={() => setOverUser(user._id)}
                  onMouseLeave={() => setOverUser(null)}
                  onClick={() => selectUser(user)}
                  className={`w-full relative cursor-pointer px-2 py-1 text-mana ${selected === user._id && "animate-pulseTextGlow"}`}
                >
                  <span
                    className={`w-4 h-4 top-0 right-0 absolute border-r-2 border-t-2 transition-all duration-1000 z-10  ${overUser === user._id || selected === user._id ? "w-full h-full" : ""}`}
                  ></span>
                  <span
                    className={`w-4 h-4 bottom-0 left-0 absolute border-l-2 border-b-2 transition-all duration-1000 z-10 ${overUser === user._id || selected === user._id ? "w-full h-full" : ""}`}
                  ></span>
                  {user.username}
                </button>
              ))}
            </div>
            <div className="w-1/2">
              <UserForm
                data={userData}
                onSubmit={onSubmit}
                onDelete={deleteUser}
              />
            </div>
          </div>
        </RuneFrame>
      </div>
    </div>
  );
};

export default UsersList;
