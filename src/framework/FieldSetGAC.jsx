import { useState } from 'react';
import PropTypes from 'prop-types';

const FieldSetGAC = ({ title, opened, children }) => {
	const [isOpen, setIsOpen] = useState(opened || true);

	return (
		<fieldset className="border border-mahogany rounded-xl w-full my-2">
			<legend className="text-lg font-bold px-2 cursor-pointer select-none">
				<input type="button" onClick={() => setIsOpen(!isOpen)} value={`${isOpen ? '▼' : '►'}`} /> {title}
			</legend>
			<div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-full p-6 mt-1 space-y-2' : 'max-h-0 p-0'}`}>{isOpen && children}</div>
		</fieldset>
	);
};

FieldSetGAC.propTypes = {
	children: PropTypes.element.isRequired,
	opened: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
};

export default FieldSetGAC;
