import { useState, useEffect } from 'react';
import IdGenerator from '../../helpers/IdGenerator';
import InputGAC from '../../framework/InputGAC';
import SelectGAC from '../../framework/SelectGAC';
import TextareaGAC from '../../framework/TextareaGAC';
import SaveButtonCAG from '../../framework/SaveButtonGAC';
import useAlert from '../../context/AlertContext';
import FormGAC from '../../framework/FormGAC';
import PropTypes from 'prop-types';

const PerkForm = ({ title, perkData, handleSubmit }) => {
	const { setAlert } = useAlert();
	const [id, setId] = useState(IdGenerator());
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [type, setType] = useState('positive');
	const [level, setLevel] = useState(1);
	const [levels, setLevels] = useState([]);

	const [levelAttributes, setLevelAttributes] = useState({ name: '', value: '', level: 1 });

	useEffect(() => {
		if (perkData?.name) {
			setId(perkData._id || IdGenerator());
			setName(perkData.name);
			setDescription(perkData.description);
			setType(perkData.type);
			setLevel(perkData.level);
			setLevels(perkData.levels);
		}
	}, [perkData]);

	const handleAddLevel = (e) => {
		e.preventDefault();
		setLevels((previor) => [...previor, { ...levelAttributes, id: IdGenerator() }]);
		setLevelAttributes({ name: '', value: '', level: 1 });
	};

	const handleSetLevelAttributes = (e) => {
		e.preventDefault();
		setLevelAttributes((previor) => ({ ...previor, [e.target.name]: e.target.value }));
	};

	const handleRemoveLevel = (level) => {
		setLevels((previor) => previor.filter((l) => l.id !== level.id));
	};

	const onReset = () => {
		setId(IdGenerator());
		setName('');
		setDescription('');
		setType('positive');
		setLevel(1);
		setLevels([]);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (name.length === 0) {
			setAlert({ msg: 'Debes escribir un nombre para este Rasgo', type: 'error' });
			return;
		}
		if (description.length === 0) {
			setAlert({ msg: 'Debes escribir una descripción para este Rasgo', type: 'error' });
			return;
		}
		handleSubmit({ id, type, name, description, level, levels });

		onReset();
	};

	return (
		<FormGAC title={title} onSubmit={onSubmit}>
			<div>
				<label htmlFor="name" className="block mb-1 font-semibold tracking-wide">
					Nombre
				</label>
				<InputGAC id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
			</div>

			<div>
				<label htmlFor="description" className="block mb-1 font-semibold tracking-wide">
					Descripción
				</label>
				<TextareaGAC id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" />
			</div>

			<div className="flex flex-row justify-between">
				<div className="flex flex-col">
					<label>
						Nivel{' '}
						<SelectGAC id="level" name="level" value={levelAttributes.level} onChange={handleSetLevelAttributes}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</SelectGAC>
					</label>
					<label>
						Nombre <InputGAC name="name" value={levelAttributes.name} onChange={handleSetLevelAttributes} />
					</label>
					<label>
						Valor <InputGAC name="value" value={levelAttributes.value} onChange={handleSetLevelAttributes} />
					</label>
					<input type="button" value="Agregar Nivel" onClick={handleAddLevel} className="mt-2 text-green-500 hover:text-green-400 hover:underline" />
				</div>

				<div>
					<label htmlFor="type" className="block mb-1 font-semibold tracking-wide">
						Tipo
					</label>
					<SelectGAC id="type" value={type} onChange={(e) => setType(e.target.value)}>
						<option value="positive">Positivo</option>
						<option value="negative">Negativo</option>
					</SelectGAC>
				</div>
			</div>

			{levels.map((l, i) => (
				<div key={`${l.id}-${i}`}>
					<p>
						Nivel {l.level} - {l.name}: {l.value}
					</p>
					<button className="mt-2 text-red-500 hover:text-red-400 hover:underline" onClick={() => handleRemoveLevel(l)}>
						Quitar
					</button>
				</div>
			))}

			<div className="text-right">
				<SaveButtonCAG>Guardar</SaveButtonCAG>
			</div>
		</FormGAC>
	);
};

PerkForm.propTypes = {
	title: PropTypes.string.isRequired,
	perkData: PropTypes.array.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default PerkForm;
