import { useState } from "react";
import useSaS from "@/context/SaSContext";
import InputGAC from "@/framework/InputGAC";
import SelectGAC from "@/framework/SelectGAC";
import PropTypes from "prop-types";

const NpcBookSkill = ({ nSkills, handleAddSkill }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const { skills } = useSaS();

  // Filtrar habilidades disponibles (que no han sido añadidas) y que coinciden con el término de búsqueda
  const filteredSkills = skills
    .filter((skill) => !nSkills.find((nskill) => skill._id === nskill._id))
    .filter((skill) => skill.name.toLowerCase().includes(search.toLowerCase()))
    .filter((skill) => skill.type.includes(typeFilter));

  return (
    <div
      aria-label="Lista de habilidades"
      className="w-full md:w-1/2 flex flex-col justify-start items-center"
    >
      {/* Campo de búsqueda */}
      <InputGAC
        id="searchSkillInput"
        type="search"
        placeholder="Buscar habilidad por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SelectGAC
        id={"typeFilter"}
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        disabled={false}
      >
        <option value={""}>Tipo de Habilidad</option>
        <option value={"active"}>Activo</option>
        <option value={"pasive"}>Pasivo</option>
      </SelectGAC>

      {/* Lista de habilidades */}
      <ul
        id="skillList"
        className="w-full mt-5 md:w-3/4 space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]"
      >
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <li
              key={skill._id}
              className="bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 hover:ring-2 hover:ring-yellow-400 transition duration-200"
            >
              <p className="text-base font-semibold text-yellow-100">
                {skill.name}
                <span className="font-normal text-gray-300">
                  {" ( "} Tipo: <span className="capitalize">{skill.type}</span>{" "}
                  | Acciones: {skill.actions} | Turnos: {skill.turns}
                  {" )"}
                </span>
              </p>
              <button
                className="mt-2 text-green-500 hover:text-green-400 hover:cursor-pointer hover:underline"
                onClick={(e) => handleAddSkill(e, skill)}
              >
                Añadir
              </button>
            </li>
          ))
        ) : (
          <p className="text-sm text-center text-yellow-200 italic">
            No se encontraron habilidades disponibles
          </p>
        )}
      </ul>
    </div>
  );
};

NpcBookSkill.propTypes = {
  nSkills: PropTypes.array.isRequired,
  handleAddSkill: PropTypes.func.isRequired,
};

export default NpcBookSkill;
