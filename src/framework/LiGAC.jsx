import PropTypes from 'prop-types';

const LiGAC = ({ children }) => {
	return <li className="bg-[#2a1c16] border border-[#4a342a] flex flex-row justify-between rounded-xl px-4 py-3 hover:ring-2 hover:ring-yellow-400 transition duration-200">{children}</li>;
};

LiGAC.propTypes = {
	children: PropTypes.element.isRequired,
};

export default LiGAC;
