import { useState } from "react";
import RuneFrame from "@/framework/RuneFrame";
import InputGAC from "@/framework/InputGAC";
import MinimalForm from "@/framework/MinimalForm";

const CodexCategory = ({ handleSubmit }) => {
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(name);
    setName("");
  };
  return (
    <div className="w-1/3">
      <RuneFrame sides="x">
        <MinimalForm onSubmit={onSubmit} buttonText={"Crear"}>
          <div className="flex flex-col mb-10">
            <h1 className="text-center text-lg my-5 font-bold">
              Nueva Categoría
            </h1>
            <InputGAC
              placeholder="Introduce el nombre de la categoría"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </MinimalForm>
      </RuneFrame>
    </div>
  );
};

export default CodexCategory;
