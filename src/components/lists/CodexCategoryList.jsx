import React, { useState, useEffect } from "react";
import RuneFrame from "@/framework/RuneFrame";
import InputGAC from "@/framework/InputGAC";
import DeleteBtnGAC from "@/framework/DeleteBtnGAC";
import useAlert from "@/context/AlertContext";
import ButtonGAC from "@/framework/ButtonGAC";

const ListItems = ({ data, onDelete, onUpdate }) => {
  if (!data) return;
  const { setAlert } = useAlert();
  const [name, setName] = useState(data.name);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [delTimer, setDelTimer] = useState(8);

  useEffect(() => {
    if (del) {
      if (delTimer > 0) {
        setTimeout(() => {
          setDelTimer((before) => (before - 1 > 0 ? before - 1 : 0));
        }, 1000);
      } else {
        setDel(false);
        setDelTimer(8);
        setAlert({
          msg: "Supongo que has cambiado de opinión. ¡Mejor! Los datos hay que preservarlos.",
          type: "info",
          destroy: true,
        });
      }
    } else {
      setDelTimer(8);
    }
  }, [del, delTimer]);

  const handleUpdate = (e) => {
    e.preventDefault();

    onUpdate({ _id: data._id, name });
    setEdit(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (!del) {
      setAlert({
        msg: "¿Estás seguro de que quieres eliminar esta categoría? ¿Para siempre? Si es así... vuelve a pulsar sobre Eliminar",
        type: "warning",
      });
      setDel(true);
    } else {
      onDelete(data._id);
      setDel(false);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center w-full">
      {edit ? (
        <InputGAC value={name} onChange={(e) => setName(e.target.value)} />
      ) : (
        <p className="text-mana">{data.name}</p>
      )}
      <div className="space-x-5">
        {edit ? (
          <>
            <ButtonGAC onClick={handleUpdate}>Guardar</ButtonGAC>
            <DeleteBtnGAC onClick={() => setEdit(false)}>Cancelar</DeleteBtnGAC>
          </>
        ) : (
          <>
            <ButtonGAC onClick={() => setEdit(true)}>Editar</ButtonGAC>

            <DeleteBtnGAC onClick={handleDelete}>
              Eliminar {del ? delTimer : ""}
            </DeleteBtnGAC>
          </>
        )}
      </div>
    </div>
  );
};

const CodexCategoryList = ({ categories, handleDelete, handleUpdate }) => {
  return (
    <div className="w-1/3">
      <RuneFrame sides="x">
        <div className="w-full h-full max-h-full overflow-y-auto flex flex-col items-center justify-center"></div>
        {categories.map((cat) => (
          <ListItems
            key={cat._id}
            data={cat}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </RuneFrame>
    </div>
  );
};

export default CodexCategoryList;
