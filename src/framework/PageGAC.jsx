import PropTypes from 'prop-types';

const PageGAC = ({ children }) => {
	return (
		<div
			onContextMenu={(e) => e.preventDefault()}
			aria-hidden="true"
			className="max-h-screen min-h-screen cursor-default select-none bg-[url('/bg-magic.png')] bg-cover flex flex-col justify-center items-center p-6 antialiased w-full max-w-screen overflow-hidden"
		>
			{children}
		</div>
	);
};

PageGAC.propTypes = {
	children: PropTypes.element.isRequired,
};

export default PageGAC;
