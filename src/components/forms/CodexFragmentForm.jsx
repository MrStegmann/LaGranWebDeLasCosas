import ReactMarkdown from "react-markdown";
import { useState } from "react";
import MinimalForm from "@/framework/MinimalForm";
import RuneFrame from "@/framework/RuneFrame";
import InputGAC from "@/framework/InputGAC";
import SelectGAC from "@/framework/SelectGAC";
import useAlert from "@/context/AlertContext";

const CodexFragmentForm = ({
  fragment = {},
  categories,
  handleSubmit,
  sides = "x",
}) => {
  const { setAlert } = useAlert();
  const [title, setTitle] = useState(fragment?.title || "");
  const [category, setCategory] = useState(fragment?.category);
  const [content, setContent] = useState(fragment?.content || "");
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

  const onSubmit = (e) => {
    e.preventDefault();

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
    handleSubmit({ title, category, content });
  };

  return (
    <div className="w-full h-full">
      <RuneFrame sides={sides}>
        <MinimalForm onSubmit={onSubmit} buttonText={"Guardar fragmento"}>
          {/* Input para nombre del fragmento */}

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
        </MinimalForm>
      </RuneFrame>
    </div>
  );
};

export default CodexFragmentForm;
