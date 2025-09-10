import React, { useEffect } from "react";
import IdGenerator from "../../helpers/IdGenerator";
import InputGAC from "@/framework/InputGAC";
import SelectGAC from "@/framework/SelectGAC";
import TextareaGAC from "@/framework/TextareaGAC";
import SaveButtonCAG from "@/framework/SaveButtonGAC";
import PropTypes from "prop-types";

const SkillForm = ({ skillData, handleSubmit }) => {
  const [id, setId] = React.useState(IdGenerator());
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [type, setType] = React.useState("active");
  const [actions, setActions] = React.useState(0);
  const [turns, setTurns] = React.useState(0);

  useEffect(() => {
    if (skillData?.name) {
      setId(skillData._id || IdGenerator());
      setName(skillData.name);
      setDescription(skillData.description);
      setType(skillData.type);
      setActions(skillData.actions);
      setTurns(skillData.turns);
    }
  }, [skillData]);

  const onReset = () => {
    setId(IdGenerator());
    setName("");
    setDescription("");
    setType("active");
    setActions(0);
    setTurns(0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ id, name, description, type, actions, turns });

    onReset();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 bg-[#3c291f]/80 p-6 rounded-2xl shadow-lg shadow-black/50 border-2 border-[#5a3b2e] text-[#f0d9b5] w-1/2"
    >
      <div>
        <label
          htmlFor="name"
          className="block mb-1 font-semibold tracking-wide"
        >
          Nombre
        </label>
        <InputGAC
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block mb-1 font-semibold tracking-wide"
        >
          Descripción
        </label>
        <TextareaGAC
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
      </div>

      <div>
        <label
          htmlFor="type"
          className="block mb-1 font-semibold tracking-wide"
        >
          Tipo
        </label>
        <SelectGAC
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="passive">Pasivo</option>
          <option value="active">Activo</option>
        </SelectGAC>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="actions"
            className="block mb-1 font-semibold tracking-wide"
          >
            Acciones
          </label>
          <InputGAC
            id="actions"
            type="number"
            value={actions}
            onChange={(e) => setActions(Number(e.target.value))}
          />
        </div>

        <div>
          <label
            htmlFor="turns"
            className="block mb-1 font-semibold tracking-wide"
          >
            Turnos
          </label>
          <InputGAC
            id="turns"
            type="number"
            value={turns}
            onChange={(e) => setTurns(Number(e.target.value))}
          />
        </div>
      </div>

      <SaveButtonCAG>Guardar</SaveButtonCAG>
    </form>
  );
};

SkillForm.propTypes = {
  skillData: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SkillForm;
