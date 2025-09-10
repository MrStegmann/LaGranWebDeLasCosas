import PropTypes from "prop-types";

const InputGAC = ({ customClass, ...props }) => {
  return (
    <input
      {...props}
      className={`${customClass} px-2 py-1 rounded bg-blue-dragon placeholder-arcane-bright border border-mana text-mana focus:outline-none focus:ring-2 focus:ring-arcane-spell`}
    />
  );
};

InputGAC.propTypes = {
  customClass: PropTypes.string.isRequired,
};

export default InputGAC;
