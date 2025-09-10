import { useState } from "react";
import useSaS from "@/context/SaSContext";
import ConfirmModal from "@/framework/ConfirmModal";
import { useParams, Link } from "react-router-dom";
import SpellForm from "@/components/forms/SpellForm";
import SpellInfo from "@/components/infos/SpellInfo";
import SpellList from "@/components/lists/SpellList";
import PageGAC from "@/framework/PageGAC";
import SkillForm from "@/components/forms/SkillForm";
import SkillList from "@/components/lists/SkillList";
import SkillInfo from "@/components/infos/SkillInfo";

const Grimoire = () => {
  const {
    handleCreateSpell,
    handleUpdateSpell,
    handleDeleteSpell,
    handleCreateSkill,
    handleUpdateSkill,
    handleDeleteSkill,
  } = useSaS();

  const { option } = useParams();
  const sasOption = option || "spell";

  const [openModal, setOpenModal] = useState(false);

  const [createSaS, setCreateSaS] = useState(false);
  const [editSaS, setEditSaS] = useState(false);
  const [selectedSaS, setSelectedSaS] = useState(null);

  const handlers = {
    spell: {
      create: handleCreateSpell,
      update: handleUpdateSpell,
      delete: handleDeleteSpell,
    },
    skill: {
      create: handleCreateSkill,
      update: handleUpdateSkill,
      delete: handleDeleteSkill,
    },
  };

  const createNewSaS = async (sas) => {
    const newSaS = await handlers[sasOption].create(sas);
    setCreateSaS(false);
    setEditSaS(false);
    setSelectedSaS(newSaS);
  };

  const onCreateSaS = () => {
    setEditSaS(false);
    setSelectedSaS({});
    if (createSaS) {
      setCreateSaS(false);
      setSelectedSaS(null);
    } else {
      setCreateSaS(true);
    }
  };

  const updateSaS = async (sas) => {
    const updated = await handlers[sasOption].update(sas);
    setCreateSaS(false);
    setEditSaS(false);
    setSelectedSaS(updated);
  };

  const handleEdit = (sas) => {
    setSelectedSaS(sas);
    setEditSaS(true);
    setCreateSaS(false);
  };

  const handleShow = (sas) => {
    setEditSaS(false);
    setCreateSaS(false);
    setSelectedSaS(sas);
  };

  const deleteSaS = async () => {
    handlers[sasOption].delete(selectedSaS);
    setSelectedSaS(null);
    setOpenModal(false);
  };

  const handleDelete = (sas) => {
    setSelectedSaS(sas);
    setOpenModal(true);
    setEditSaS(false);
    setCreateSaS(false);
  };

  return (
    <PageGAC>
      <ConfirmModal
        isOpen={openModal}
        message={
          "¿Estás seguro de que quieres eliminar este Personaje? Esta acción es irreversible."
        }
        onConfirm={deleteSaS}
        onCancel={() => setOpenModal(false)}
      />

      <Link
        to="/grimoire"
        aria-label="Volver al menú principal"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] border-4 border-[#3b2b1b] rounded-xl px-5 py-3 font-semibold text-yellow-200 text-lg shadow-xl hover:scale-105 hover:ring-4 hover:ring-yellow-400/70 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-400/80"
      >
        {"<"}
      </Link>

      <div className="mb-16 text-center">
        <h1 className="relative text-6xl md:text-7xl font-extrabold text-[#dca34c] tracking-widest select-none drop-shadow-[0_0_8px_rgba(143,87,5,0.6)]">
          Forja de Fichas de Personaje
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="inline-block w-9 h-9 ml-3 -mb-1 stroke-[#dca34c] stroke-2 stroke-linejoin-round stroke-linecap-round filter drop-shadow-[0_0_1px_rgba(122,84,24,0.7)] transition-colors duration-300 hover:stroke-yellow-300"
          >
            <path d="M4 20c1-6 4-11 7-14" />
            <path d="M9 18c1-4 2-8 5-10" />
            <path d="M14 18c1-3 3-6 4-7" />
          </svg>
        </h1>
      </div>

      <div className="flex flex-wrap gap-6 justify-center mb-8">
        {!createSaS && !editSaS && (
          <button
            onClick={onCreateSaS}
            className="px-8 py-4 rounded-lg bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] text-yellow-100 border-2 border-[#3b2b1b] shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Crear
          </button>
        )}
        {(createSaS || editSaS) && (
          <button
            onClick={() => handleShow(null)}
            className="px-8 py-4 rounded-lg bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] text-yellow-100 border-2 border-[#3b2b1b] shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Volver
          </button>
        )}
      </div>

      {/* Contenedor principal */}
      {sasOption === "spell" ? (
        <div className="flex flex-row justify-justify p-5 w-full">
          {createSaS ? (
            <SpellForm spellData={selectedSaS} handleSubmit={createNewSaS} />
          ) : (
            <>
              {editSaS ? (
                selectedSaS && (
                  <SpellForm spellData={selectedSaS} handleSubmit={updateSaS} />
                )
              ) : (
                <>
                  <SpellList
                    handleShow={handleShow}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                  {selectedSaS && <SpellInfo spell={selectedSaS} />}
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-row justify-justify p-5 w-full">
          {createSaS ? (
            <SkillForm skillData={selectedSaS} handleSubmit={createNewSaS} />
          ) : (
            <>
              {editSaS ? (
                selectedSaS && (
                  <SkillForm skillData={selectedSaS} handleSubmit={updateSaS} />
                )
              ) : (
                <>
                  <SkillList
                    handleShow={handleShow}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                  {selectedSaS && <SkillInfo skill={selectedSaS} />}
                </>
              )}
            </>
          )}
        </div>
      )}
    </PageGAC>
  );
};

export default Grimoire;
