import React, { useEffect, useState } from "react";
import InputGAC from "../../framework/InputGAC";
import SelectGAC from "../../framework/SelectGAC";
import RolesEnum from "../../../utils/enums/RolesEnum";
import useAlert from "../../context/AlertContext";
import ButtonGAC from "../../framework/ButtonGAC";
import DeleteBtnGAC from "../../framework/DeleteBtnGAC";
import UsersEnum from "../../../utils/enums/UsersEnum";
import RuneFrame from "../../framework/RuneFrame";

const UserForm = ({ data, onSubmit, onDelete }) => {
  if (!data) return;
  const { setAlert } = useAlert();
  const [deleteUser, setDeleteUser] = useState(false);
  const [delTimer, setDelTimer] = useState(15);

  const [_id, setId] = useState(data._id);
  const [username, setUsername] = useState(data.username);
  const [rol, setRol] = useState(data.rol);
  const [newPass, setNewPass] = useState({
    newPassword: "",
    repeatPassword: "",
  });

  useEffect(() => {
    setId(data._id);
    setUsername(data.username);
    setRol(data.rol);
  }, [data]);

  useEffect(() => {
    if (deleteUser) {
      if (delTimer > 0) {
        setTimeout(() => {
          setDelTimer((before) => (before - 1 > 0 ? before - 1 : 0));
        }, 1000);
      } else {
        setDeleteUser(false);
        setDelTimer(15);
        setAlert({
          msg: "Supongo que has cambiado de opinión. ¡Mejor! Los datos hay que preservarlos.",
          type: "info",
          destroy: true,
        });
      }
    } else {
      setDelTimer(15);
    }
  }, [deleteUser, delTimer]);

  const handleDelete = (e) => {
    e.preventDefault();
    if (!deleteUser) {
      setAlert({
        msg: "¿Estás seguro de que quieres eliminar a este usuario? ¿Para siempre? Si es así... vuelve a pulsar sobre Eliminar",
        type: "warning",
      });
      setDeleteUser(true);
    } else {
      onDelete(_id);
      setDeleteUser(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username.trim() === data.username &&
      rol === data.rol &&
      newPass.newPassword.length === 0
    )
      return setAlert({
        msg: "No has cambiado nada... así que... creo que no... no haré nada.",
        destroy: true,
        type: "error",
      });
    if (username.trim().length === 0)
      return setAlert({
        msg: "El nombre de usuario no puede estar vacio.",
        destroy: true,
        type: "error",
      });
    if (
      [newPass.newPassword.length, newPass.repeatPassword.length].includes(0)
    ) {
      onSubmit({ _id, username, rol });
    } else {
      if (newPass.newPassword.length < 6)
        return setAlert({
          msg: "La nueva contraseña debe tener un mínimo de 6 caracteres.",
          destroy: true,
          type: "error",
        });
      if (newPass.repeatPassword !== newPass.newPassword)
        return setAlert({
          msg: "Las contraseñas no coinciden.",
          destroy: true,
          type: "error",
        });

      onSubmit({ _id, username, rol, password: newPass.newPassword });
    }
    setUsername(data.username);
    setRol(data.rol);
    setNewPass({ newPassword: "", repeatPassword: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/3 h-96">
      <RuneFrame sides="x">
        <div className="space-y-5 px-10 flex flex-col">
          <InputGAC
            id="username"
            name="username"
            value={username}
            placeholder="Nombre de usuario"
            onChange={(e) => setUsername(e.target.value)}
          />

          <SelectGAC
            id="rol"
            name="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value={RolesEnum.GUEST.toLowerCase()}>
              {RolesEnum.GUEST.toLowerCase()}
            </option>
            <option value={RolesEnum.ROLER.toLowerCase()}>
              {RolesEnum.ROLER.toLowerCase()}
            </option>
            <option value={RolesEnum.OFFICER.toLowerCase()}>
              {RolesEnum.OFFICER.toLowerCase()}
            </option>
            <option value={RolesEnum.ADMIN.toLowerCase()}>
              {RolesEnum.ADMIN.toLowerCase()}
            </option>
          </SelectGAC>

          <InputGAC
            id="newPassword"
            name="newPassword"
            value={newPass.newPassword}
            type="password"
            placeholder="Nueva contraseña"
            onChange={(e) =>
              setNewPass({ ...newPass, [e.target.name]: e.target.value })
            }
          />
          <InputGAC
            id="repeatPassword"
            name="repeatPassword"
            value={newPass.repeatPassword}
            type="password"
            placeholder="Repita la contraseña"
            onChange={(e) =>
              setNewPass({ ...newPass, [e.target.name]: e.target.value })
            }
          />

          <div className="flex flex-row w-full justify-center items-center">
            <ButtonGAC type="submit">Guardar</ButtonGAC>
            {data._id !== UsersEnum.NEW_USER_ID && (
              <DeleteBtnGAC onClick={handleDelete}>
                Eliminar {deleteUser ? delTimer : ""}
              </DeleteBtnGAC>
            )}
          </div>
        </div>
      </RuneFrame>
    </form>
  );
};

export default UserForm;
