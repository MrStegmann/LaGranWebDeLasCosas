import PropTypes from 'prop-types';

const InputGAC = ({ customClass, ...props }) => {
	return (
		<input {...props} className={`${customClass} px-4 py-2 rounded bg-arcane-spell border border-mana text-mana focus:outline-none focus:ring-2 focus:ring-arcane-spell disabled:opacity-60`} />
	);
};

InputGAC.propTypes = {
	customClass: PropTypes.string.isRequired,
};

export default InputGAC;
