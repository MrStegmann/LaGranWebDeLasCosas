import PropTypes from 'prop-types';

const SaveButtonCAG = ({ children }) => {
	return (
		<button
			type="submit"
			className="px-6 py-2 bg-gradient-to-tr from-[#6b4e2e] to-[#c49a6c] text-[#f8e8d0] font-semibold rounded-lg shadow-md hover:scale-105 hover:ring-2 hover:ring-yellow-400 transition-transform duration-300"
		>
			{children}
		</button>
	);
};

SaveButtonCAG.propTypes = {
	children: PropTypes.element.isRequired,
};

export default SaveButtonCAG;
