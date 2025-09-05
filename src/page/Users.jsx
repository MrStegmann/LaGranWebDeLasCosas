import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMagicBgStore } from "../store/MagicBGStore";
import UserBridge from "../bridges/UserBridge";
import useAlert from "../context/AlertContext";
import storageEnum from "../../utils/enums/storageEnum";
import VerticalMenu from "../components/menus/VerticalMenu";
import UserForm from "../components/forms/UserForm";
import MinimalGlowingBtn from "../framework/MinimalGlowingBtn";
import UsersEnum from "../../utils/enums/UsersEnum";
import PageGAC from "../framework/PageGAC";
import { usePageStore } from "../store/PageStore";

const Users = () => {
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const setSpherePos = useMagicBgStore((state) => state.setSpherePos);
  const setSphereRot = useMagicBgStore((state) => state.setSphereRot);
  const setSphereToLogin = useMagicBgStore((state) => state.setSphereToLogin);
  const setToAppear = usePageStore((state) => state.setToAppear);
  const { username } = useParams();

  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setSpherePos([12, 3, -25]);
    setSphereRot([0.1, 0, 0.25]);
    setAlert({
      msg: "",
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(storageEnum.GWC_TOKEN);
    if (!token) {
      setAlert({
        msg: "Ups... Creo que se ha traspapelado tu permiso, voy a necesitar que te identifiques de nuevo. ¡Perdón!",
        type: "error",
        destroy: true,
      });
      setSphereToLogin();
      navigate("/");
      return;
    }

    getUsers(token);
  }, []);

  useEffect(() => {
    const newUserNonCreated = userList.find(
      (ul) => ul.id === UsersEnum.NEW_USER_ID
    );
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
      id: UsersEnum.NEW_USER_ID,
      data: { username: "", rol: "guest", _id: UsersEnum.NEW_USER_ID },
    };
    setUserList((before) => [newUser, ...before]);
    setUserData(newUser);
  };

  const deleteUser = async (userId) => {
    try {
      const result = await UserBridge.delete(userId);
      setAlert({
        msg: `Bueno, pues ya estaría... Eliminado de la librería... Para siempre. Sip, para siempre.`,
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
    } catch (error) {
      setAlert({
        type: "error",
        destroy: true,
        msg: error.message,
      });
    }
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
      if (user._id !== UsersEnum.NEW_USER_ID) {
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

  const navigateTo = (path) => {
    setToAppear(false);
    setTimeout(() => {
      navigate(path);
    }, 800);
  };

  return (
    <PageGAC>
      <div className="w-full h-full flex flex-row items-center justify-start">
        <div className="w-1/4 h-full space-y-5 mx-5 flex flex-col justify-center items-center">
          <MinimalGlowingBtn id={UsersEnum.CREATE_USER} onClick={createNewUser}>
            Nuevo usuario
          </MinimalGlowingBtn>
          <div className="h-1/2 w-full">
            <VerticalMenu
              spacing={2}
              items={userList}
              getActiveItem={getActive}
            />
          </div>

          <MinimalGlowingBtn
            id={UsersEnum.GO_BACK}
            onClick={() => navigateTo(`/${username}`)}
          >
            Volver
          </MinimalGlowingBtn>
        </div>
        {userData?.id && (
          <UserForm
            data={userData.data}
            onSubmit={onSubmit}
            onDelete={deleteUser}
          />
        )}
      </div>
    </PageGAC>
  );
};

export default Users;
