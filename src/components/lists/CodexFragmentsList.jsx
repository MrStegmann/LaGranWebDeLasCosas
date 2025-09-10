import React, { useState } from "react";
import RuneFrame from "@/framework/RuneFrame";
import ButtonGAC from "@/framework/ButtonGAC";
import DeleteBtnGAC from "@/framework/DeleteBtnGAC";
import InputGAC from "@/framework/InputGAC";
import SelectGAC from "@/framework/SelectGAC";
import ReactMarkdown from "react-markdown";

const ListItems = ({ data, categories, onDelete, onUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [delTimer, setDelTimer] = useState(8);

  const [title, setTitle] = useState(data.title);
  const [category, setCategory] = useState(data.category);
  const [content, setContent] = useState(data.content);
  const [showMarkdown, setShowMarkdown] = useState(false);

  // Funciones para insertar Markdown en el textarea
  const insertMarkdown = (md) => {
    const textarea = document.getElementById("codex-textarea");
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = content.substring(0, start);
    const after = content.substring(end);
    const selected = content.substring(start, end) || "texto";
    setContent(before + md.replace("{text}", selected) + after);
    // Mantener el cursor después del texto insertado
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        start + md.indexOf("{text}");
    }, 0);
  };

  const handleUpdate = (e) => {
    if (title.length === 0)
      return setAlert({
        msg: "Eh... Se te ha olvidado el título del fragmento.",
        type: "error",
        destroy: true,
      });
    if (category.length === 0)
      return setAlert({
        msg: "Eh... Debes seleccionar una categoría para el fragmento, por favor.",
        type: "error",
        destroy: true,
      });
    if (content.length === 0)
      return setAlert({
        msg: "A ver... no puedo guardar un fragmento... sin nada escrito... Escribe algo.",
        type: "error",
        destroy: true,
      });
    onUpdate({ _id: data._id, title, category, content });
  };
  const handleDelete = (e) => {};
  return (
    <div className="flex flex-col w-full scale-95 h-10 my-1">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-mana">{data.title}</p>
        <div className="space-x-5">
          {edit ? (
            <>
              <ButtonGAC onClick={handleUpdate}>Guardar</ButtonGAC>
              <DeleteBtnGAC onClick={() => setEdit(false)}>
                Cancelar
              </DeleteBtnGAC>
            </>
          ) : (
            <>
              <ButtonGAC onClick={() => setEdit(true)}>Editar</ButtonGAC>

              <DeleteBtnGAC onClick={handleDelete}>
                Eliminar {del ? delTimer : ""}
              </DeleteBtnGAC>
            </>
          )}
        </div>
      </div>
      {edit && (
        <div className="w-full h-full">
          <RuneFrame sides={"y"}>
            <div className="w-full h-full max-h-full overflow-y-auto">
              <InputGAC
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título del fragmento"
                customClass={"w-full mb-4"}
              />

              <SelectGAC
                customClass="w-full mb-10"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Categoría</option>
                {categories.map((cat) => (
                  <option value={cat._id}>{cat.name}</option>
                ))}
              </SelectGAC>

              {/* Toolbar básica de Markdown */}
              <div className="space-x-2">
                <button
                  type="button"
                  className="px-2 py-1 border rounded font-bold cursor-pointer"
                  onClick={() => insertMarkdown("**{text}**")}
                >
                  B
                </button>
                <button
                  type="button"
                  className="px-2 py-1 border rounded italic cursor-pointer"
                  onClick={() => insertMarkdown("*{text}*")}
                >
                  I
                </button>
                <button
                  type="button"
                  className="px-2 py-1 border rounded underline cursor-pointer"
                  onClick={() => insertMarkdown("# {text}")}
                >
                  H1
                </button>
                <button
                  type="button"
                  className="px-2 py-1 border rounded underline cursor-pointer"
                  onClick={() => insertMarkdown("## {text}")}
                >
                  H2
                </button>
                <button
                  type="button"
                  className="px-2 py-1 border rounded underline cursor-pointer"
                  onClick={() => insertMarkdown("### {text}")}
                >
                  H3
                </button>
                <button
                  type="button"
                  className="px-2 py-1 border rounded cursor-pointer"
                  onClick={() => insertMarkdown("- {text}\n")}
                >
                  Lista
                </button>
                <button
                  type="button"
                  className="px-2 py-1 border rounded cursor-pointer"
                  onClick={() => setShowMarkdown(!showMarkdown)}
                >
                  Previsualizar
                </button>
              </div>

              {/* Área de texto y preview */}
              <div className="flex flex-row h-2/3 max-h-2/3 overflow-y-auto">
                {!showMarkdown ? (
                  <textarea
                    id="codex-textarea"
                    className={`resize-none w-full outline-1 outline-arcane-spell h-full p-2 border border-mana rounded-lg`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                ) : (
                  <div className="prose text-sm p-5 w-full overflow-y-auto">
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </RuneFrame>
        </div>
      )}
    </div>
  );
};

const CodexFragmentsList = ({
  fragments,
  categories,
  handleDelete,
  handleUpdate,
}) => {
  return (
    <div className="w-1/3 h-full">
      <RuneFrame sides="x">
        <div className="w-full h-full flex flex-col">
          {fragments.map((frag) => (
            <ListItems
              key={frag._id}
              data={frag}
              categories={categories}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </RuneFrame>
    </div>
  );
};

export default CodexFragmentsList;
