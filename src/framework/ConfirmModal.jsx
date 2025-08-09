import PropTypes from 'prop-types';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white rounded-2xl shadow-2xl p-6 w-80 animate-fade-in">
				<p className="text-gray-800 text-lg mb-4 text-center">{message}</p>
				<div className="flex justify-between gap-4">
					<button onClick={onCancel} className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
						Cancelar
					</button>
					<button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
						Confirmar
					</button>
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
