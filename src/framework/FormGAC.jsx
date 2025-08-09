import PropTypes from 'prop-types';

const FormGAC = ({ title, onSubmit, children }) => (
	<form onSubmit={onSubmit} className="space-y-8 bg-shadow/80 p-8 rounded-2xl shadow-fantasy border-2 border-mahogany text-parchment w-full mx-auto">
		<h2 className="text-center text-3xl font-bold underline">{title}</h2>
		{children}
	</form>
);

FormGAC.propTypes = {
	children: PropTypes.element.isRequired,
	onSubmit: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
};

export default FormGAC;
