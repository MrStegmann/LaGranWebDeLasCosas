import PropTypes from "prop-types";

const FormGAC = ({ onSubmit, buttonText, disableButton = false, children }) => (
  <form
    onSubmit={onSubmit}
    className="p-8 bg-blue-dragon/95 rounded-2xl shadow-fantasy border-2 border-arcane-spell animate-pulseGlow text-mana w-full mx-auto"
  >
    {children}

    {!disableButton && (
      <button
        type="submit"
        className="px-6 py-2 mt-5 bg-gradient-to-tr from-blue-dragon to-arcane-spell  text-mana font-semibold rounded-lg shadow-md hover:scale-105 hover:ring-2 hover:ring-mana transition-transform duration-300"
      >
        {buttonText}
      </button>
    )}
  </form>
);

FormGAC.propTypes = {
  children: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disableButton: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default FormGAC;
