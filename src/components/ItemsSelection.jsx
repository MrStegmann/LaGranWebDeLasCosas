import { useState } from "react";
import InputGAC from "@/framework/InputGAC";
import PropTypes from "prop-types";

const ItemsSelection = ({
  atUsed,
  mainItems,
  handleOnAdd,
  handleOnRemove,
  listItems,
}) => {
  const [search, setSearch] = useState("");
  const filteredItems = listItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col mt-4">
      <h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">
        Inventario
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-1 mt-4">
        {mainItems.map((item) => (
          <div
            key={item[atUsed]}
            className="bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 cursor-pointer hover:ring-2 hover:ring-yellow-400 transition duration-200 text-sm"
          >
            <p>{item.name}</p>
            <p>
              Cantidad {item.quantity}/{item.max}
            </p>
            <p>{item.description}</p>
            {item.damage && <p>Daño físico: {item.damage}</p>}
            <button
              id={item[atUsed]}
              onClick={handleOnRemove}
              disabled={mainItems.length === 0}
              className="mt-2 text-red-500 hover:text-red-400 hover:cursor-pointer hover:underline"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>

      <h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1 mt-6">
        Libro de Objetos
      </h3>
      <div className="w-full flex flex-row justify-between mb-2">
        <InputGAC
          id="searchInput"
          type="search"
          placeholder="Buscar Objeto por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full space-y-3 max-h-96 overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 cursor-pointer hover:ring-2 hover:ring-yellow-400 transition duration-200"
          >
            <p>{item.name}</p>
            <p>{item.description}</p>
            {item.damage && <p>Daño físico: {item.damage}</p>}
            <div className="flex flex-row justify-between">
              <button
                id={item._id}
                onClick={handleOnAdd}
                className="mt-2 text-green-500 hover:text-green-400 hover:cursor-pointer hover:underline"
              >
                Añadir
              </button>
              <button
                id={`${item._id}-max`}
                onClick={handleOnAdd}
                className="mt-2 text-green-500 hover:text-green-400 hover:cursor-pointer hover:underline"
              >
                Máx
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ItemsSelection.propTypes = {
  atUsed: PropTypes.string.isRequired,
  mainItems: PropTypes.array.isRequired,
  handleOnAdd: PropTypes.func.isRequired,
  handleOnRemove: PropTypes.func.isRequired,
  listItems: PropTypes.array.isRequired,
};

export default ItemsSelection;
