import PropTypes from "prop-types";

const InputGAC = ({ customClass, ...props }) => {
  return (
    <input
      {...props}
      className={`${customClass} px-2 py-1 rounded bg-arcane-spell/50 placeholder-arcane-bright border border-mana text-mana focus:outline-none focus:ring-2 focus:ring-arcane-spell disabled:opacity-60`}
    />
  );
};

InputGAC.propTypes = {
  customClass: PropTypes.string.isRequired,
};

export default InputGAC;
