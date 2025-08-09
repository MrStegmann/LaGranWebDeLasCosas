import React, { useEffect, useState } from 'react';
import IdGenerator from '../../helpers/IdGenerator';
import InputGAC from '../../framework/InputGAC';
import SelectGAC from '../../framework/SelectGAC';
import TextareaGAC from '../../framework/TextareaGAC';
import SaveButtonCAG from '../../framework/SaveButtonGAC';
import useSaS from '../../context/SaSContext';
import PropTypes from 'prop-types';

const SpellForm = ({ spellData, handleSubmit }) => {
	const { Spell } = useSaS();
	const [id, setId] = useState(IdGenerator());
	const [category, setCategory] = useState('trick');
	const [attribute, setAttribute] = useState('intelligence');
	const [talent, setTalent] = useState('arcane');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [cost, setCost] = useState(0);
	const [power, setPower] = useState(0);
	const [actions, setActions] = useState(0);
	const [turns, setTurns] = useState(0);
	const [level, setLevel] = useState(0);

	const [base, setBase] = useState({});

	useEffect(() => {
		if (spellData?.name) {
			setId(spellData._id || IdGenerator());
			setCategory(spellData.category);
			setAttribute(spellData.attribute);
			setTalent(spellData.talent);
			setName(spellData.name);
			setDescription(spellData.description);
			setPower(spellData.power);
			setActions(spellData.actions);
			setTurns(spellData.turns);
			setLevel(spellData.level);
		}
	}, [spellData]);

	useEffect(() => {
		const { cost, power, actions, turns } = Spell.getDataByCategory(category);
		setBase({ cost, power, actions, turns });
		setCost(cost);
		setPower(power);
		setActions(actions);
		setTurns(turns);
		setLevel(0);
	}, [category]);

	useEffect(() => {
		setLevel(0);
		if (base.cost - cost > 0) {
			setLevel((before) => before + (base.cost - cost));
		}
		if (power - base.power > 0) {
			setLevel((before) => before + (power - base.power));
		}
		if (base.actions - actions > 0) {
			setLevel((before) => before + (base.actions - actions));
		}
		if (base.turns - turns > 0) {
			setLevel((before) => before + (base.turns - turns));
		}
	}, [cost, power, actions, turns]);

	const onReset = () => {
		setId(IdGenerator());
		setCategory('trick');
		setAttribute('intelligence');
		setTalent('arcane');
		setName('');
		setDescription('');
		setPower(0);
		setActions(0);
		setTurns(0);
		setLevel(0);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		handleSubmit({
			id,
			category,
			attribute,
			talent,
			name,
			description,
			cost,
			power,
			actions,
			turns,
			level,
		});

		onReset();
	};

	return (
		<form onSubmit={handleFormSubmit} className="space-y-6 bg-[#3c291f]/80 p-6 rounded-2xl shadow-lg shadow-black/50 border-2 border-[#5a3b2e] text-[#f0d9b5] w-1/2">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label htmlFor="category" className="block font-semibold text-yellow-100">
						Categoría
					</label>
					<SelectGAC id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
						<option value="trick">Truco</option>
						<option value="fast">Rápido</option>
						<option value="basic">Básico</option>
						<option value="powerful">Potente</option>
					</SelectGAC>
				</div>

				<div>
					<label htmlFor="attribute" className="block font-semibold text-yellow-100">
						Atributo
					</label>
					<SelectGAC id="attribute" value={attribute} onChange={(e) => setAttribute(e.target.value)}>
						<option value="intelligence">Inteligencia</option>
						<option value="willpower">Voluntad</option>
					</SelectGAC>
				</div>

				<div>
					<label htmlFor="talent" className="block font-semibold text-yellow-100">
						Talento
					</label>
					<SelectGAC id="talent" value={talent} onChange={(e) => setTalent(e.target.value)}>
						{attribute === 'intelligence' ? (
							<>
								<option value="">Selecciona un talento</option>
								<option value="arcane">Arcano</option>
								<option value="fel">Vil</option>
								<option value="nature">Naturaleza</option>
								<option value="shadows">Sombras</option>
								<option value="astral">Astral</option>
								<option value="nicromancy">Nigromancia</option>
							</>
						) : (
							<>
								<option value="">Selecciona un talento</option>
								<option value="faith">Fe</option>
								<option value="elemental">Elemental</option>
								<option value="chi">Chi</option>
							</>
						)}
					</SelectGAC>
				</div>

				<div>
					<label htmlFor="name" className="block font-semibold text-yellow-100">
						Nombre
					</label>
					<InputGAC type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
				</div>

				<div>
					<label htmlFor="cost" className="block font-semibold text-yellow-100">
						Coste
					</label>
					<InputGAC type="number" id="cost" value={cost} onChange={(e) => setCost(Number(e.target.value))} />
				</div>

				<div>
					<label htmlFor="power" className="block font-semibold text-yellow-100">
						Poder
					</label>
					<InputGAC type="number" id="power" value={power} onChange={(e) => setPower(Number(e.target.value))} />
				</div>

				<div>
					<label htmlFor="actions" className="block font-semibold text-yellow-100">
						Acciones
					</label>
					<InputGAC type="number" id="actions" value={actions} onChange={(e) => setActions(Number(e.target.value))} />
				</div>

				<div>
					<label htmlFor="turns" className="block font-semibold text-yellow-100">
						Turnos
					</label>
					<InputGAC type="number" id="turns" value={turns} onChange={(e) => setTurns(Number(e.target.value))} />
				</div>

				<div>
					<label htmlFor="level" className="block font-semibold text-yellow-100">
						Nivel
					</label>
					<InputGAC type="number" id="level" value={level} onChange={(e) => setLevel(Number(e.target.value))} />
				</div>
			</div>

			<div>
				<label htmlFor="description" className="block font-semibold text-yellow-100">
					Descripción
				</label>
				<TextareaGAC id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
			</div>

			<SaveButtonCAG>Guardar Hechizo</SaveButtonCAG>
		</form>
	);
};

SpellForm.propTypes = {
	spellData: PropTypes.array.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default SpellForm;
