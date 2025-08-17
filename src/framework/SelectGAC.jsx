import PropTypes from "prop-types";
const SelectGAC = ({ children, customClass, ...props }) => {
  return (
    <select
      {...props}
      className={`${customClass} px-2 py-1 rounded bg-arcane-spell/50 border border-mana text-arcane-bright focus:outline-none focus:bg-blue-dragon focus:ring-2 focus:ring-arcane-spell disabled:opacity-60`}
    >
      {children}
    </select>
  );
};

SelectGAC.propTypes = {
  children: PropTypes.element.isRequired,
  customClass: PropTypes.string.isRequired,
};

export default SelectGAC;
