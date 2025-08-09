import PropTypes from 'prop-types';
const SelectGAC = ({ children, customClass, ...props }) => {
	return (
		<select {...props} className={`${customClass} px-4 py-2 rounded bg-[#2a1c16] border border-[#4a342a] text-[#f8e8d0] focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-60`}>
			{children}
		</select>
	);
};

SelectGAC.propTypes = {
	children: PropTypes.element.isRequired,
	customClass: PropTypes.string.isRequired,
};

export default SelectGAC;
