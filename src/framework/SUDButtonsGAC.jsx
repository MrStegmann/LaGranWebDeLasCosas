import PropTypes from "prop-types";

const SUDButtonsGAC = ({ onShow, onUpdate, onDelete }) => {
  return (
    <>
      {onShow && (
        <button
          onClick={onShow}
          className="text-arcane-bright hover:cursor-pointer hover:underline"
        >
          Ver
        </button>
      )}
      {onUpdate && (
        <button
          className="mx-2 text-mana hover:cursor-pointer hover:underline"
          onClick={onUpdate}
        >
          Editar
        </button>
      )}
      {onDelete && (
        <button
          className="text-arcane-spell hover:cursor-pointer hover:underline"
          onClick={onDelete}
        >
          Eliminar
        </button>
      )}
    </>
  );
};

SUDButtonsGAC.propTypes = {
  onShow: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SUDButtonsGAC;
