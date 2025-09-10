import { useParams } from "react-router-dom";
import { useState } from "react";
import PageGAC from "@/framework/PageGAC";
import GlowButtonGAC from "@/framework/GlowButtonGAC";
import useSheet from "@/context/SheetContext";
import ConfirmModal from "@/framework/ConfirmModal";
import CharForm from "@/components/forms/CharForm";
import CharInfo from "@/components/infos/CharInfo";
import CharList from "@/components/lists/CharList";

const CharManager = () => {
  const { handleCreateChar, handleUpdateChar, handleDeleteChar } = useSheet();

  const [createChar, setCreateChar] = useState(false);
  const [editChar, setEditChar] = useState(false);
  const [selectedChar, setSelectedChar] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const onShowList = () => {
    setCreateChar(false);
    setEditChar(false);
    setSelectedChar(null);
  };

  const createNewChar = async (sheet) => {
    const newSaS = await handleCreateChar(sheet);
    setCreateChar(false);
    setEditChar(false);
    setSelectedChar(newSaS);
  };

  const onCreateChar = () => {
    setEditChar(false);
    setSelectedChar({});
    if (createChar) {
      setCreateChar(false);
      setSelectedChar(null);
    } else {
      setCreateChar(true);
    }
  };

  const updateChar = async (sheet) => {
    const updated = await handleUpdateChar(sheet);
    setCreateChar(false);
    setEditChar(false);
    setSelectedChar(updated);
  };

  const handleEdit = (sheet) => {
    setSelectedChar(sheet);
    setEditChar(true);
    setCreateChar(false);
  };

  const handleShow = (sheet) => {
    setEditChar(false);
    setCreateChar(false);
    setSelectedChar(sheet);
  };

  const deleteChar = async () => {
    handleDeleteChar(selectedSheets);
    setSelectedChar(null);
    setOpenModal(false);
  };

  const handleDelete = (sheet) => {
    setSelectedChar(sheet);
    setOpenModal(true);
    setEditChar(false);
    setCreateChar(false);
  };
  return (
    <PageGAC>
      <ConfirmModal
        isOpen={openModal}
        message={
          "¿Estás seguro de que quieres eliminar este Personaje? Esta acción es irreversible."
        }
        onConfirm={deleteChar}
        onCancel={() => setOpenModal(false)}
      />
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex flex-row justify-center gap-5 mb-5">
          {!createChar && !editChar && (
            <GlowButtonGAC onClick={onCreateChar}>
              Crear nueva ficha
            </GlowButtonGAC>
          )}
          <GlowButtonGAC onClick={onShowList}>
            Lista de personajes
          </GlowButtonGAC>
        </div>
        <div className="flex flex-col p-5 h-full w-full">
          {createChar ? (
            <CharForm
              title={""}
              charData={selectedChar}
              handleSubmit={createNewChar}
            />
          ) : (
            <>
              {editChar ? (
                selectedChar && (
                  <CharForm
                    title={""}
                    charData={selectedChar}
                    handleSubmit={updateChar}
                  />
                )
              ) : (
                <>
                  {selectedChar ? (
                    <CharInfo character={selectedChar} />
                  ) : (
                    <CharList
                      handleShow={handleShow}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </PageGAC>
  );
};

export default CharManager;
