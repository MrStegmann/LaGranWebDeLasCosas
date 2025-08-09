import PropTypes from 'prop-types';

const UlGAC = ({ children, ...props }) => {
	return (
		<ul {...props} className="w-full md:w-3/4 space-y-3 h-auto max-h-[80vh] overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17] mt-5">
			{children}
		</ul>
	);
};

UlGAC.propTypes = {
	children: PropTypes.element.isRequired,
};

export default UlGAC;
