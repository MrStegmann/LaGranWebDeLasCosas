import { useEffect, useState } from "react";
import useSheet from "@/context/SheetContext";
import InputGAC from "@/framework/InputGAC";
import SelectGAC from "@/framework/SelectGAC";
import SUDButtonsGAC from "@/framework/SUDButtonsGAC";
import PropTypes from "prop-types";
import GlowingDiv from "@/framework/GlowingDiv";
import useAlert from "@/context/AlertContext";

const CharList = ({ handleShow, handleEdit, handleDelete }) => {
  const { chars } = useSheet();
  const { setAlert } = useAlert();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    setAlert({});
  }, []);

  // Filtrar Charss por nombre
  const filteredChars = chars
    .filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((character) => String(character.level).includes(levelFilter))
    .filter((character) => character.category.includes(categoryFilter));

  return (
    <section
      aria-label="Lista de Personajes"
      className="w-full h-full bg-blue-dragon/90 rounded-2xl p-6 shadow-lg shadow-black/50 border border-arcane-spell flex flex-col items-center"
    >
      {/* Search Input */}
      <div className="w-full flex flex-row justify-between">
        <InputGAC
          id="searchInput"
          type="search"
          placeholder="Nombre"
          customClass={"w-1/5"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGAC
          id="levelFilter"
          type="search"
          customClass={"w-1/5"}
          placeholder="Nivel"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        />
        <SelectGAC
          id={"categoryFilter"}
          customClass={"w-1/5"}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          disabled={false}
        >
          <option value="">Categoría</option>
          <option value="normal">Normal</option>
          <option value="elite">Élite</option>
          <option value="boss">Jefe</option>
        </SelectGAC>
      </div>
      <div className="grid grid-cols-5 gap-3 px-10 py-5 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-dragon scrollbar-track-mana">
        <div>
          {filteredChars.length > 0 &&
            filteredChars.map((character) => (
              <GlowingDiv key={character._id}>
                <p className="font-semibold text-arcane-bright">
                  {character.name}
                </p>
                <p className="font-normal text-sm text-arcane-bright">
                  {character.level}
                  {character.category === "elite" ? "+" : ""}{" "}
                  <span className="first-letter:capitalize">
                    {character.race}
                  </span>
                </p>
                <div>
                  <SUDButtonsGAC
                    onShow={() => handleShow(character)}
                    onUpdate={() => handleEdit(character)}
                    onDelete={() => handleDelete(character)}
                  />
                </div>
              </GlowingDiv>
            ))}
        </div>
      </div>
    </section>
  );
};

CharList.propTypes = {
  handleShow: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CharList;
