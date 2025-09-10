import useItem from "@/context/ItemsContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import ItemsList from "@/components/lists/ItemsList";
import ItemInfo from "@/components/infos/ItemInfo";
import ItemForm from "@/components/forms/ItemForm";
import InfoGAC from "@/framework/InfoGAC";
import PageGAC from "@/framework/PageGAC";
import ConfirmModal from "@/framework/ConfirmModal";

const ItemsManager = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [createItem, setCreateItem] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const { handleCreateItem, handleUpdateItem, handleDeleteItem } = useItem();

  const onUpdateItem = async (item) => {
    const updated = await handleUpdateItem(item);
    setCreateItem(false);
    setEditItem(false);
    setSelectedItem(updated);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditItem(true);
    setCreateItem(false);
  };

  const deleteItem = async () => {
    handleDeleteItem(selectedItem);
    setSelectedItem(null);
    setOpenModal(false);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
    setEditItem(false);
    setCreateItem(false);
  };

  const handleShow = (item) => {
    setEditItem(false);
    setCreateItem(false);
    setSelectedItem(item);
  };

  const createNewItem = async (item) => {
    const newItem = await handleCreateItem(item);
    setCreateItem(false);
    setEditItem(false);
    setSelectedItem(newItem);
  };

  const onCreateItem = () => {
    setEditItem(false);
    if (createItem) {
      setCreateItem(false);
      setSelectedItem(null);
    } else {
      setCreateItem(true);
      setSelectedItem({});
    }
  };

  return (
    <PageGAC>
      <ConfirmModal
        isOpen={openModal}
        message={
          "¿Estás seguro de que quieres eliminar este objeto? Esta acción es irreversible."
        }
        onConfirm={deleteItem}
        onCancel={() => setOpenModal(false)}
      />

      <Link
        to="/"
        aria-label="Volver al menú principal"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] border-4 border-[#3b2b1b] rounded-xl px-5 py-3 font-semibold text-yellow-200 text-lg shadow-xl hover:scale-105 hover:ring-4 hover:ring-yellow-400/70 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-400/80"
      >
        {"<"}
      </Link>

      <div className="mb-16 text-center">
        <h1 className="relative text-6xl md:text-7xl font-extrabold text-[#dca34c] tracking-widest select-none drop-shadow-[0_0_8px_rgba(143,87,5,0.6)]">
          Forja de Objetos
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
        {!createItem && !editItem && (
          <button
            onClick={onCreateItem}
            className="px-8 py-4 rounded-lg bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] text-yellow-100 border-2 border-[#3b2b1b] shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Crear
          </button>
        )}
        {(createItem || editItem) && (
          <button
            onClick={() => handleShow(null)}
            className="px-8 py-4 rounded-lg bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] text-yellow-100 border-2 border-[#3b2b1b] shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Volver
          </button>
        )}
      </div>

      <div className="flex flex-row justify-justify p-5 w-full">
        {createItem ? (
          <ItemForm itemData={selectedItem} handleSubmit={createNewItem} />
        ) : (
          <>
            {editItem ? (
              selectedItem && (
                <ItemForm itemData={selectedItem} handleSubmit={onUpdateItem} />
              )
            ) : (
              <>
                <ItemsList
                  handleShow={handleShow}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
                {selectedItem && (
                  <InfoGAC>
                    <ItemInfo item={selectedItem} />
                  </InfoGAC>
                )}
              </>
            )}
          </>
        )}
      </div>
    </PageGAC>
  );
};

export default ItemsManager;
