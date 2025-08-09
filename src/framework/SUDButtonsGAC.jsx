import PropTypes from 'prop-types';

const SUDButtonsGAC = ({ onShow, onUpdate, onDelete }) => {
	return (
		<>
			{onShow && (
				<button onClick={onShow} className="text-yellow-500 hover:text-yellow-400 hover:cursor-pointer hover:underline">
					Ver
				</button>
			)}
			{onUpdate && (
				<button className="mx-2 text-blue-500 hover:text-blue-400 hover:cursor-pointer hover:underline" onClick={onUpdate}>
					Editar
				</button>
			)}
			{onDelete && (
				<button className="text-red-500 hover:text-red-400 hover:cursor-pointer hover:underline" onClick={onDelete}>
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
