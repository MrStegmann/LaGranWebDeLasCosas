import React, { useEffect, useState } from "react";
import InputGAC from "../../framework/InputGAC";
import SelectGAC from "../../framework/SelectGAC";
import RolesEnum from "../../../utils/enums/RolesEnum";

const UserForm = ({ data, onSubmit }) => {
  if (!data) return;
  const { _id, username, rol } = data;

  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({
    username,
    password: "",
    rol,
    _id,
  });

  useEffect(() => {
    setUser(data);
  }, [data]);

  const handleSwitchEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(user);
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
        value={user.username}
        placeholder="Nombre de usuario"
        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
      />

      <SelectGAC
        id="rol"
        name="rol"
        value={user.rol}
        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
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
        id="password"
        name="password"
        value={user.password}
        type="password"
        placeholder="Nueva contraseña"
        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
      />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default UserForm;
