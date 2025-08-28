import React, { useEffect, useState } from "react";
import InputGAC from "../../framework/InputGAC";
import SelectGAC from "../../framework/SelectGAC";
import RolesEnum from "../../../utils/enums/RolesEnum";
import useAlert from "../../context/AlertContext";

const UserForm = ({ data, onSubmit }) => {
  if (!data) return;
  const { setAlert } = useAlert();

  const [edit, setEdit] = useState(false);
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

  const handleSwitchEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
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
    <form
      onSubmit={handleSubmit}
      className="w-1/4 h-96 space-y-5 border bg-blue-dragon/50 border-mana rounded-lg flex flex-col items-center p-5"
    >
      <button onClick={handleSwitchEdit}>Editar</button>

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

      <button type="submit">Guardar</button>
    </form>
  );
};

export default UserForm;
