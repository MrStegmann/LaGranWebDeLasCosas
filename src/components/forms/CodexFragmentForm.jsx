import ReactMarkdown from "react-markdown";
import { useState } from "react";
import MinimalForm from "../../framework/MinimalForm";

const CodexFragmentForm = ({ fragment = {} }) => {
  const [title, setTitle] = useState(fragment?.title || "");
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

  const onSubmit = () => {
    console.log("hace algo");
  };

  return (
    <div className="absolute left-48 top-10 w-2/5 border border-mana rounded-2xl bg-blue-dragon/30 backdrop-blur-md h-[75dvh] p-5 space-y-5 flex flex-col">
      <MinimalForm onSubmit={onSubmit} buttonText={"Guardar fragmento"}>
        {/* Input para nombre del fragmento */}
        <div>
          <label className="block mb-2 font-bold">Nombre del fragmento</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del fragmento"
            className="w-full p-2 rounded bg-black/40 border border-mana"
          />
        </div>

        {/* Toolbar básica de Markdown */}
        <div className="space-x-2">
          <button
            type="button"
            className="px-2 py-1 border rounded font-bold"
            onClick={() => insertMarkdown("**{text}**")}
          >
            B
          </button>
          <button
            type="button"
            className="px-2 py-1 border rounded italic"
            onClick={() => insertMarkdown("*{text}*")}
          >
            I
          </button>
          <button
            type="button"
            className="px-2 py-1 border rounded underline"
            onClick={() => insertMarkdown("# {text}")}
          >
            H1
          </button>
          <button
            type="button"
            className="px-2 py-1 border rounded underline"
            onClick={() => insertMarkdown("## {text}")}
          >
            H2
          </button>
          <button
            type="button"
            className="px-2 py-1 border rounded underline"
            onClick={() => insertMarkdown("### {text}")}
          >
            H3
          </button>
          <button
            type="button"
            className="px-2 py-1 border rounded"
            onClick={() => insertMarkdown("- {text}\n")}
          >
            Lista
          </button>
          <button
            type="button"
            className="px-2 py-1 border rounded"
            onClick={() => setShowMarkdown(!showMarkdown)}
          >
            Previsualizar
          </button>
        </div>

        {/* Área de texto y preview */}
        <div className="flex flex-row h-full max-h-full overflow-y-auto">
          <textarea
            id="codex-textarea"
            className={`resize-none ${showMarkdown ? "w-1/2" : "w-full"} h-full p-2 border border-mana rounded-lg`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {showMarkdown && (
            <div className="prose text-sm p-5 w-1/2 overflow-y-auto">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </MinimalForm>
    </div>
  );
};

export default CodexFragmentForm;
