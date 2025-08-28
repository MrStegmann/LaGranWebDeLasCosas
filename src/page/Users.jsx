import React, { useEffect, useState } from "react";
import RolesEnum from "../../utils/enums/RolesEnum";
import { useParams, useNavigate } from "react-router-dom";
import { useMagicBgStore } from "../store/MagicBGStore";
import { useAuthStore } from "../store/AuthStore";
import UserBridge from "../bridges/UserBridge";
import useAlert from "../context/AlertContext";
import storageEnum from "../../utils/enums/storageEnum";
import CircularMenu from "../components/menus/CircularMenu";
import VerticalMenu from "../components/menus/VerticalMenu";
import UserForm from "../components/forms/UserForm";
import MinimalGlowingBtn from "../framework/MinimalGlowingBtn";
import MinimalGlowinLink from "../framework/MinimalGlowinLink";

const Users = () => {
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const setSpherePos = useMagicBgStore((state) => state.setSpherePos);
  const auth = useAuthStore((state) => state.auth);

  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setSpherePos([12, 3, -27]);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(storageEnum.GWC_TOKEN);
    if (!token) {
      setAlert({
        msg: "Ups... Creo que se ha traspapelado tu permiso, voy a necesitar que te identifiques de nuevo. ¡Perdón!",
        type: "error",
        destroy: true,
      });
      setSpherePos([-10, 1.9, -23]);
      navigate("/");
      return;
    }

    getUsers(token);
  }, []);

  useEffect(() => {
    const newUserNonCreated = userList.find((ul) => ul.id === "NEW_USER_ID");
    if (newUserNonCreated && newUserNonCreated.id !== userData.id) {
      setUserList((before) =>
        before.filter((bef) => bef.id != newUserNonCreated.id)
      );
    }
  }, [userData]);

  useEffect(() => {
    if (userList.length > 0) {
      setUserData(userList[0]);
    } else {
      setUserData({});
    }
  }, [userList]);

  const createNewUser = () => {
    const newUser = {
      label: "Nuevo usuario",
      id: "NEW_USER_ID",
      data: { username: "", rol: "guest", _id: "NEW_USER_ID" },
    };
    setUserList((before) => [newUser, ...before]);
    setUserData(newUser);
  };

  const getUsers = async (token) => {
    try {
      const response = await UserBridge.get(token);
      setUserList(
        response.data.map((user) => ({
          label: user.username,
          id: user._id,
          data: user,
        }))
      );
    } catch (error) {
      setAlert({
        type: "error",
        destroy: true,
        msg: error.message,
      });
    }
  };

  const getActive = (item) => {
    setUserData(item);
  };

  const onSubmit = async (user) => {
    try {
      if (user._id !== "NEW_USER_ID") {
        const result = await UserBridge.update(user);
        setAlert({
          msg: `Bien, bien...  si me das un segundo... vale. ¡Perfecto! ${result.data.username} se ha actualizado correctamente`,
          destroy: true,
        });
        const response = await UserBridge.get(
          localStorage.getItem(storageEnum.GWC_TOKEN)
        );
        setUserList(
          response.data.map((user) => ({
            label: user.username,
            id: user._id,
            data: user,
          }))
        );
      } else {
        const { _id, ...rest } = user;
        const result = await UserBridge.create(rest);
        setAlert({
          msg: `Bien, bien...  si me das un segundo... vale. ¡Perfecto! ${result.data.username} he guardado bien el usuario`,
          destroy: true,
        });
        const response = await UserBridge.get(
          localStorage.getItem(storageEnum.GWC_TOKEN)
        );
        setUserList(
          response.data.map((user) => ({
            label: user.username,
            id: user._id,
            data: user,
          }))
        );
      }
    } catch (error) {
      setAlert({
        type: "error",
        destroy: true,
        msg: error.message,
      });
    }
  };

  return (
    <div className="w-full h-dvh flex justify-start items-center">
      <div className="w-1/4 h-full space-y-5 mx-5 flex flex-col justify-center items-center">
        <MinimalGlowingBtn id={"CREATE_USER"} onClick={createNewUser}>
          Nuevo usuario
        </MinimalGlowingBtn>
        <div className="h-1/2 w-full">
          <VerticalMenu
            spacing={2}
            items={userList}
            getActiveItem={getActive}
          />
        </div>

        <MinimalGlowinLink id={"GO_BACK"} to={`/${auth.username}`}>
          Volver
        </MinimalGlowinLink>
      </div>
      {userData?.id && <UserForm data={userData.data} onSubmit={onSubmit} />}
      {/* <div>Opciones: Crear nuevo o Volver</div> */}
    </div>
  );
};

export default Users;
