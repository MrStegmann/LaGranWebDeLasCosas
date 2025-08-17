import PropTypes from "prop-types";
import GlowButtonGAC from "./GlowButtonGAC";

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="bg-blue-dragon rounded-2xl shadow-2xl border border-arcane-spell p-6 w-80 animate-fade-in">
        <p className="text-mana text-lg mb-4 text-center">{message}</p>
        <div className="flex justify-between gap-4">
          <GlowButtonGAC id="cancelDelete" onClick={onCancel}>
            Cancelar
          </GlowButtonGAC>
          <GlowButtonGAC id="confirmDelete" onClick={onConfirm}>
            Confirmar
          </GlowButtonGAC>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmModal;
