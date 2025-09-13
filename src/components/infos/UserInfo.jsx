import React from "react";

const UserInfo = ({ data }) => {
  if (!data) return;
  return (
    <div className="w-full mb-10 p-5 flex flex-col justify-start text-mana">
      <p className="text-right flex flex-row justify-between font-bold">
        Usuario: <span className="font-normal">{data.username}</span>
      </p>
      <p className="text-right flex flex-row justify-between font-bold">
        Rol: <span className="font-normal">{data.rol}</span>
      </p>
    </div>
  );
};

export default UserInfo;
