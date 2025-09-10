import React from "react";
import InputGAC from "@/framework/InputGAC";
import PropTypes from "prop-types";

const NpcSkillList = ({ nSkills, handleRemoveSkill }) => {
  const [search, setSearch] = React.useState("");
  const filteredSkills = nSkills.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      aria-label="Lista de habilidades"
      className="w-full md:w-1/2 flex flex-col justify-start items-center"
    >
      {/* Campo de búsqueda */}
      <InputGAC
        id="searchNpcSkillsInput"
        type="search"
        placeholder="Buscar habilidad por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Lista de habilidades */}
      <ul
        id="skillNpcList"
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
              {/* Botón de eliminar */}
              <button
                onClick={(e) => handleRemoveSkill(e, skill)}
                className="mt-2 text-red-500 hover:text-red-400 hover:cursor-pointer hover:underline"
              >
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <p className="text-sm text-center text-yellow-200 italic">
            No se encontraron habilidades
          </p>
        )}
      </ul>
    </div>
  );
};

NpcSkillList.propTypes = {
  nSkills: PropTypes.array.isRequired,
  handleRemoveSkill: PropTypes.func.isRequired,
};

export default NpcSkillList;
