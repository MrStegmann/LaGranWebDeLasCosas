import PropTypes from 'prop-types';

const InfoGAC = ({ children }) => {
	return <div className="bg-[#3c291f]/80 p-6 rounded-2xl shadow-xl shadow-black/60 border-4 border-[#5a3b2e] text-[#f0d9b5] max-w-4xl mx-auto font-serif tracking-wide">{children}</div>;
};

InfoGAC.propTypes = {
	children: PropTypes.element.isRequired,
};

export default InfoGAC;
