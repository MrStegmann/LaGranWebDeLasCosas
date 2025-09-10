import React from "react";
import useSaS from "@/context/SaSContext";
import InputGAC from "@/framework/InputGAC";
import SelectGAC from "@/framework/SelectGAC";
import _ from "../../helpers/Translator";
import SUDButtonsGAC from "@/framework/SUDButtonsGAC";
import LiGAC from "@/framework/LiGAC";
import PropTypes from "prop-types";

const SkillList = ({ handleShow, handleEdit, handleDelete }) => {
  const [search, setSearch] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");
  const { skills } = useSaS();

  const filteredSkills = skills
    .filter((skill) => skill.name.toLowerCase().includes(search.toLowerCase()))
    .filter((skill) => skill.type.includes(typeFilter));

  return (
    <section
      aria-label="Lista de habilidades"
      className="w-full md:w-1/2 bg-[#3c291f]/80 rounded-2xl p-6 shadow-lg shadow-black/50 border border-[#5a3b2e] text-[#f0d9b5] flex flex-col items-center"
    >
      <div className="w-full flex flex-row justify-between">
        <InputGAC
          id="searchInput"
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
      </div>

      <ul
        id="skillList"
        className="w-full md:w-3/4 space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17] mt-5"
      >
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <LiGAC key={skill._id}>
              <div>
                <p className="text-base font-semibold text-yellow-100">
                  {skill.name}
                </p>
                <p className="font-normal text-gray-300">
                  {" ( "} Tipo:{" "}
                  <span className="capitalize">{_("es", skill.type)}</span> |
                  Acciones: {skill.actions} | Turnos: {skill.turns}
                  {" )"}
                </p>
                <p className="italic">{skill.description}</p>
              </div>
              <div className="flex flex-col justify-center ml-5">
                <SUDButtonsGAC
                  onShow={() => handleShow(skill)}
                  onUpdate={() => handleEdit(skill)}
                  onDelete={() => handleDelete(skill)}
                />
              </div>
            </LiGAC>
          ))
        ) : (
          <p className="text-sm text-center text-yellow-200 italic">
            No se encontraron habilidades.
          </p>
        )}
      </ul>
    </section>
  );
};

SkillList.propTypes = {
  handleShow: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default SkillList;
