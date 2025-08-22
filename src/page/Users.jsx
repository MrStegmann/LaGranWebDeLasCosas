import React, { useEffect, useState } from "react";
import RolesEnum from "../../utils/enums/RolesEnum";
import { useParams, useNavigate } from "react-router-dom";
import { useMagicBgStore } from "../store/MagicBGStore";
import UserBridge from "../bridges/UserBridge";
import useAlert from "../context/AlertContext";
import storageEnum from "../../utils/enums/storageEnum";
import CircularMenu from "../components/menus/CircularMenu";
import VerticalMenu from "../components/menus/VerticalMenu";
import UserForm from "../components/forms/UserForm";

const Users = () => {
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const setSpherePos = useMagicBgStore((state) => state.setSpherePos);

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
    } catch (error) {
      setAlert({
        type: "error",
        destroy: true,
        msg: error.message,
      });
    }
  };

  return (
    <div className="w-full flex justify-start items-center">
      <div className="w-1/4">
        <VerticalMenu spacing={5} items={userList} getActiveItem={getActive} />
      </div>
      {userData?.id && <UserForm data={userData.data} onSubmit={onSubmit} />}
      {/* <div>Opciones: Crear nuevo o Volver</div> */}
    </div>
  );
};

export default Users;
