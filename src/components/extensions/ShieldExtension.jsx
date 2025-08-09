import SelectGAC from '../../framework/SelectGAC';
import InputGAC from '../../framework/InputGAC';
import shields from '@json/shields.json';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const ShieldExtension = ({ shield, handleSetShield }) => {
	const [type, setType] = useState('light');
	const [pDefense, setPDefense] = useState(1);
	const [durability, setDurability] = useState(5);
	const [requirements, setRequirements] = useState({});
	const [cons, setCons] = useState({});

	const initialized = useRef(false);

	useEffect(() => {
		if (!initialized.current && shield?.type !== undefined) {
			setType(shield.type);
			setPDefense(shield.pDefense);
			setDurability(shield.durability);
			setRequirements(shield.requirements);
			setCons(shield.cons);

			initialized.current = true;
		}
	}, [shield]);

	useEffect(() => {
		const shieldData = shields[type];
		setPDefense(shieldData.pDefense);
		setDurability(shieldData.durability);
		setRequirements(shieldData.requirements);
		setCons(shieldData.cons);
	}, [type]);

	useEffect(() => {
		handleSetShield({ type, pDefense, durability, requirements, cons, slot: 'secondHand' });
	}, [type, pDefense, durability, requirements, cons]);

	return (
		<section className="p-4 mt-6">
			<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">Detalles de Escudo</h3>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<label htmlFor="typeShield" className="block mb-1 font-semibold tracking-wide text-[#dbc59a]">
						Tipo
					</label>
					<SelectGAC id="typeShield" value={type} onChange={(e) => setType(e.target.value)}>
						<option value="light">Ligero</option>
						<option value="medium">Medio</option>
						<option value="heavy">Pesado</option>
					</SelectGAC>
				</div>

				<div>
					<label htmlFor="pDefenseShield" className="block mb-1 font-semibold tracking-wide text-[#dbc59a]">
						Reducción Física
					</label>
					<InputGAC id="pDefenseShield" type="number" value={pDefense} min={0} onChange={(e) => setPDefense(e.target.value)} />
				</div>

				<div>
					<label htmlFor="durabilityShield" className="block mb-1 font-semibold tracking-wide text-[#dbc59a]">
						Durabilidad
					</label>
					<InputGAC id="durabilityShield" type="number" value={durability} min={0} onChange={(e) => setDurability(e.target.value)} />
				</div>
			</div>
			<div className="my-5">
				<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">Requerimientos</h3>
				{Object.entries(requirements).length ? (
					<ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc px-5">
						{Object.entries(requirements).map(([key, value]) => (
							<li key={key}>
								{key}: {value}
							</li>
						))}
					</ul>
				) : (
					<p>Sin requerimientos</p>
				)}
			</div>
			<div>
				<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">Penalizadores</h3>
				{Object.entries(cons).length ? (
					<ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc px-5">
						{Object.entries(cons).map(([key, value]) => (
							<li key={key}>
								{key}: {value}
							</li>
						))}
					</ul>
				) : (
					<p>Sin penalizadores</p>
				)}
			</div>
		</section>
	);
};

ShieldExtension.propTypes = {
	shield: PropTypes.object.isRequired,
	handleSetShield: PropTypes.func.isRequired,
};

export default ShieldExtension;
