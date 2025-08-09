import PropTypes from 'prop-types';

const PageGAC = ({ children }) => {
	return (
		<div
			onContextMenu={(e) => e.preventDefault()}
			aria-hidden="true"
			className="min-h-screen cursor-default select-none bg-[#2f1f17] bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] bg-repeat flex flex-col justify-center items-center p-6 font-['Tex Gyre Schola',serif] text-[#f0d9b5] antialiased w-full max-w-screen overflow-hidden"
		>
			{children}
		</div>
	);
};

PageGAC.propTypes = {
	children: PropTypes.element.isRequired,
};

export default PageGAC;
