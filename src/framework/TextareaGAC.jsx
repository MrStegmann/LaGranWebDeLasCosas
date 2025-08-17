const TextareaGAC = ({ ...props }) => {
  return (
    <textarea
      {...props}
      className="w-full px-4 py-2 rounded bg-blue-dragon border border-mana text-arcane-bright focus:outline-none focus:ring-2 focus:ring-arcane-spell disabled:opacity-60 resize-none"
    />
  );
};

export default TextareaGAC;
