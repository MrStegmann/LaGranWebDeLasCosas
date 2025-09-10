import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormGAC from "@/framework/FormGAC";
import InputGAC from "@/framework/InputGAC";
import TextareaGAC from "@/framework/TextareaGAC";
import SaveButtonCAG from "@/framework/SaveButtonGAC";
import FieldSetGAC from "@/framework/FieldSetGAC";
import SUDButtonsGAC from "@/framework/SUDButtonsGAC";

const StageForm = ({ stageName, stage, onChange }) => {
  if (!stage) return;
  const handleChange = (key, value) => {
    onChange({ ...stage, [key]: value });
  };

  const handleCluesChange = (index, value) => {
    const newClues = [...stage.cluesHooks];
    newClues[index] = value;
    handleChange("cluesHooks", newClues);
  };

  const addClue = (e) => {
    e.preventDefault();
    handleChange("cluesHooks", [...stage.cluesHooks, ""]);
  };

  const removeClue = (index) => {
    const newClues = stage.cluesHooks.filter((_, i) => i !== index);
    handleChange("cluesHooks", newClues);
  };

  return (
    <FieldSetGAC title={stageName}>
      <InputGAC
        type="text"
        placeholder="Nombre"
        value={stage.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <TextareaGAC
        placeholder="Descripción"
        value={stage.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <p className={`${stage.description.length > 560 && "text-red-800"}`}>
        {stage.description.length}/560
      </p>

      <InputGAC
        type="text"
        placeholder="Objetivo"
        value={stage.target}
        onChange={(e) => handleChange("target", e.target.value)}
      />

      <p className="font-semibold block mb-1">Pistas / Ganchos:</p>
      {stage.cluesHooks.map((clue, index) => (
        <div key={clue + index} className="flex gap-2 mb-2">
          <InputGAC
            type="text"
            value={clue}
            onChange={(e) => handleCluesChange(index, e.target.value)}
          />

          <SUDButtonsGAC onDelete={() => removeClue(index)} />
        </div>
      ))}
      <button
        onClick={addClue}
        className="text-yellow-500 hover:text-yellow-400 hover:cursor-pointer hover:underline"
      >
        Agregar Pista/Gancho
      </button>
    </FieldSetGAC>
  );
};

StageForm.propTypes = {
  stageName: PropTypes.string.isRequired,
  stage: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

const OneShotForm = ({ title, oneshotData, handleSubmit }) => {
  const [oneshot, setOneshot] = useState({
    title: "",
    flags: "",
    intro: { name: "", description: "", target: "", cluesHooks: [] },
    knot: { name: "", description: "", target: "", cluesHooks: [] },
    conclusion: { name: "", description: "", target: "", cluesHooks: [] },
  });

  useEffect(() => {
    if (oneshotData?.title) {
      setOneshot(oneshotData);
    }
  }, [oneshotData]);

  const handleStageChange = (stageKey, stageValue) => {
    setOneshot({ ...oneshot, [stageKey]: stageValue });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (handleSubmit) handleSubmit(oneshot);
  };

  return (
    <FormGAC title={title} onSubmit={onSubmit}>
      <InputGAC
        type="text"
        placeholder="Título del Oneshot"
        value={oneshot.title}
        onChange={(e) => setOneshot({ ...oneshot, titulo: e.target.value })}
      />

      <TextareaGAC
        placeholder="Etiquetas"
        value={oneshot.flags}
        onChange={(e) => setOneshot({ ...oneshot, resumen: e.target.value })}
      />

      <StageForm
        stageName="Intro"
        stage={oneshot.intro}
        onChange={(stage) => handleStageChange("intro", stage)}
      />
      <StageForm
        stageName="Nudo"
        stage={oneshot.knot}
        onChange={(stage) => handleStageChange("knot", stage)}
      />
      <StageForm
        stageName="Desenlace"
        stage={oneshot.conclusion}
        onChange={(stage) => handleStageChange("conclusion", stage)}
      />

      <SaveButtonCAG>Guardar</SaveButtonCAG>
    </FormGAC>
  );
};

OneShotForm.propTypes = {
  title: PropTypes.string.isRequired,
  oneshotData: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default OneShotForm;
