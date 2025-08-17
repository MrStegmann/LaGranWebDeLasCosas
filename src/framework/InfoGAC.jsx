import PropTypes from "prop-types";

const InfoGAC = ({ children }) => {
  return (
    <div className="space-y-8 p-8 bg-blue-dragon/95 rounded-2xl shadow-fantasy border-2 border-arcane-spell text-mana w-full mx-auto">
      {children}
    </div>
  );
};

InfoGAC.propTypes = {
  children: PropTypes.element.isRequired,
};

export default InfoGAC;
