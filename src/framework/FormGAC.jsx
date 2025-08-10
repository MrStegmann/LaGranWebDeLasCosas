import PropTypes from 'prop-types';

const FormGAC = ({ title, onSubmit, buttonText, children }) => (
	<form onSubmit={onSubmit} className="space-y-8 p-8 bg-blue-dragon/95 rounded-2xl shadow-fantasy border-2 border-arcane-spell animate-pulseGlow text-mana w-full mx-auto">
		<h2 className="text-center text-3xl font-bold underline font-family-medieval">{title}</h2>
		{children}

				<button
			type="submit"
			className="px-6 py-2 bg-gradient-to-tr from-blue-dragon to-arcane-spell  text-mana font-semibold rounded-lg shadow-md hover:scale-105 hover:ring-2 hover:ring-mana transition-transform duration-300"
		>
			{buttonText}
		</button>
	</form>
);

FormGAC.propTypes = {
	children: PropTypes.element.isRequired,
	onSubmit: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired
};

export default FormGAC;
