import { useState, useEffect, useRef } from 'react';
import InputGAC from '../../framework/InputGAC';
import atts from '../../../../json/atts.json';
import useSheet from '../../context/SheetContext';
import PropTypes from 'prop-types';

const AttirubteExtension = ({ charAtts, handleSetAttributes }) => {
	const { Attribute } = useSheet();
	const [attributes, setAttributes] = useState([]);

	const initialized = useRef(false);

	useEffect(() => {
		if (!initialized.current && charAtts.length > 0) {
			setAttributes(charAtts.map((at) => Attribute.setAttributeByAttribute(at)));

			initialized.current = true;
		}
	}, [charAtts]);

	useEffect(() => {
		setAttributes(() => atts.map((at) => Attribute.setAttributeByAttribute(at)));
	}, []);

	useEffect(() => {
		handleSetAttributes([...attributes]);
	}, [attributes]);

	const handleChangeAtValue = (e) => {
		setAttributes((before) => {
			const atts = [...before];
			const found = atts.find((at) => e.target.id.includes(at.code));
			if (found) {
				found.setValue(Number(e.target.value) < 0 ? 0 : Number(e.target.value));
			}

			return atts;
		});
	};

	const handleChangeTalValue = (id, value, atCode) => {
		setAttributes((before) => {
			const atts = [...before];
			const found = atts.find((at) => at.code === atCode);
			if (found) {
				found.setTalentValueByCode(id.split('-')[0], Number(value) < 0 ? 0 : Number(value));
			}

			return atts;
		});
	};
	return (
		<section className="p-1 mt-6">
			<div className="grid grid-cols-1 md:grid-cols-3 mt-2">
				{attributes.length > 0 &&
					attributes.map((at, index) => (
						<div key={at.code} className={`my-2 px-2 ${[3, 6, attributes.length].includes(index + 1) ? '' : 'md:border-r'}`}>
							<div className="flex flex-row text-center justify-between items-center border-b pb-2">
								<label htmlFor={at.code + '-input'} className="text-[#dbc59a] text-2xl px-2 font-black">
									{at.label}
								</label>

								<InputGAC id={at.code + '-input'} type="number" min={0} customClass={'w-1/3'} value={at.value} onChange={handleChangeAtValue} />
							</div>

							<p className="mt-1 text-center">
								TP {at.tp - at.getTalentsTotalPoints()}/{at.tp}
							</p>
							{at.tp - at.getTalentsTotalPoints() < 0 && <p className="text-red-500 text-center">No tienes puntos de Talento suficiente</p>}
							{at.talents.map((tal) => (
								<div key={tal.code} className="flex flex-row justify-between items-center px-2">
									<label htmlFor={tal.code + '-input'}>{tal.label}</label>

									<InputGAC id={tal.code + '-input'} type="number" min={0} value={tal.value} customClass={'w-1/3'} onChange={(e) => handleChangeTalValue(e.target.id, e.target.value, at.code)} />
								</div>
							))}
						</div>
					))}
			</div>
		</section>
	);
};

AttirubteExtension.propTypes = {
	charAtts: PropTypes.array.isRequired,
	handleSetAttributes: PropTypes.func.isRequired,
};

export default AttirubteExtension;
