import { useEffect, useState } from 'react';
import IdGenerator from '../../helpers/IdGenerator';
import InputGAC from '../../framework/InputGAC';
import SelectGAC from '../../framework/SelectGAC';
import SaveButtonCAG from '../../framework/SaveButtonGAC';
import useAlert from '../../context/AlertContext';
import races from '@json/races.json';
import FormGAC from '../../framework/FormGAC';
import FieldSetGAC from '../../framework/FieldSetGAC';
import TextareaGAC from '../../framework/TextareaGAC';
import AttirubteExtension from '../extensions/AttirubteExtension';
import PerkExtension from '../extensions/PerkExtension';
import ProsConsExtension from '../extensions/ProsConsExtension';
import GearExtension from '../extensions/GearExtension';
import SpellExtension from '../extensions/SpellExtension';
import SkillExtension from '../extensions/SkillExtension';
import useSheet from '../../context/SheetContext';
import { BasicStat } from '@models/extensions/BasicStat';
import _ from '../../helpers/Translator';
import { Gear } from '@models/extensions/Gear';
import { Attribute } from '@models/extensions/Attribute';
import PropTypes from 'prop-types';

const CharForm = ({ title, charData, handleSubmit }) => {
	const { setAlert } = useAlert();
	const { Character } = useSheet();

	const [id, setId] = useState(IdGenerator());
	const [name, setName] = useState('');
	const [lore, setLore] = useState('');
	const [level, setLevel] = useState(1);
	const [category, setCategory] = useState('noob');
	const [race, setRace] = useState('human');
	const [isHuargen, setIsHuargen] = useState(false);

	const [perks, setPerks] = useState([]);
	const [attributes, setAttributes] = useState([]);
	const [inventory, setInventory] = useState([]);
	const [gear, setGear] = useState({});
	const [spells, setSpells] = useState([]);
	const [skills, setSkills] = useState([]);

	const [gearRequirements, setGearRequirements] = useState([]);
	const [canAffordThisGear, setCanAffordThisGear] = useState(false);

	const [pros, setPros] = useState();
	const [cons, setCons] = useState();

	const [hp, setHp] = useState(15);
	const [mp, setMp] = useState(10);
	const [spiritP, setSpiritP] = useState(10);
	const [ap, setAp] = useState(0);
	const [sp, setSp] = useState(2);

	const [maxPosPerks, setMaxPosPerks] = useState(1);
	const [minNegPerks, setMinNegPerks] = useState(1);

	const [apRemaining, setApRemaining] = useState(ap);
	const [spRemaining, setSpRemaining] = useState(sp);

	const [ppRemaining, setPPRemaining] = useState(1);

	const [toAdapt, setToAdapt] = useState('');
	const [toImprove, setToImprove] = useState('');

	useEffect(() => {
		if (charData?.name) {
			setId(charData._id);
			setName(charData.name);
			setLore(charData.lore);
			setLevel(charData.level);
			setCategory(charData.category);
			setRace(charData.race);
			setIsHuargen(charData.isHuargen);
			setPerks(charData.perks);
			setAttributes(charData.attributes.map(Attribute.fromRaw));
			setInventory(charData.inventory);
			setGear(Gear.fromRaw(charData.gear));
			setSpells(charData.spells);
			setSkills(charData.skills);
		}
	}, []);

	useEffect(() => {
		const { hp, ap, sp } = BasicStat.stimateStats(level, category);
		let charCat = 1;
		if (category === 'elite') {
			charCat = 2;
		} else if (category === 'boss') {
			charCat = 3;
		}
		setMaxPosPerks(charCat);
		setMinNegPerks(charCat);

		setHp(hp);
		setAp(ap);
		setSp(sp);
	}, [level, category]);

	useEffect(() => {
		setMp(BasicStat.stimateMP(attributes));
		setSpiritP(BasicStat.stimateSpiritP(attributes));

		setApRemaining(ap - Character.getAttributeTotalPoints(attributes));
	}, [attributes]);

	useEffect(() => {
		setApRemaining(ap - Character.getAttributeTotalPoints(attributes));
	}, [ap]);

	useEffect(() => {
		const totalSkills = skills.length;
		const totalSpells = spells.reduce((pre, actual) => pre + Number(actual.level), 0);

		setSpRemaining(sp - totalSkills - totalSpells);
	}, [skills, spells, sp]);

	useEffect(() => {
		let total = 0;
		const PositivePerks = perks.filter((perk) => perk.type === 'positive');
		PositivePerks.forEach((perk) => {
			total += perk.level;
		});
		setPPRemaining(maxPosPerks - total);
	}, [perks, ppRemaining, maxPosPerks]);

	useEffect(() => {
		const pros = new Map();
		const cons = new Map();

		const addToMap = (map, data) => {
			for (const [key, value] of Object.entries(data)) {
				const cleanKey = key.includes(':') ? key : 'TALENT:' + key;
				const current = map.get(cleanKey) || 0;
				const delta = Number(value);

				map.set(cleanKey, current + delta);
			}
		};

		const raceFound = races.find((ra) => ra.code === race);
		if (raceFound) {
			addToMap(pros, raceFound.pros);
			addToMap(cons, raceFound.cons);
		}

		if (isHuargen) {
			addToMap(pros, {
				athletics: 2,
				brutality: 2,
				magicResistance: 2,
				resilience: 2,
				perception: 2,
			});
			addToMap(cons, {
				clResistance: 5,
				stealth: 3,
				sleightHand: 2,
			});
		}

		if (Object.values(gear).length > 0) {
			const gearCons = gear.getCons();
			addToMap(cons, Object.fromEntries(gearCons));
		}

		setPros(Object.fromEntries(pros));
		setCons(Object.fromEntries(cons));
	}, [race, isHuargen, perks, category, gear]);

	useEffect(() => {
		if (Object.values(gear).length > 0) {
			setGearRequirements(Object.fromEntries(gear.getRequirements()));
			console.log(gear);
			setCanAffordThisGear(gear.canWearThisGear(attributes, race, isHuargen));
		}
	}, [gear, attributes, race, isHuargen]);

	const handleSetAttributes = (attributes) => setAttributes(attributes);
	const handleSetPerks = (perks) => setPerks(perks);
	const handleSetGear = (gear) => setGear(gear);
	const handleSetInventory = (inventory) => setInventory(inventory);
	const handleSetSpells = (spells) => setSpells(spells);
	const handleSetSkills = (skills) => setSkills(skills);

	const handleSpecialsPros = (key, value) => {
		const setters = {
			adapt: setToAdapt,
			improvement: setToImprove,
		};
		setters[key](value);
	};

	const onReset = () => {
		setId(IdGenerator());
		setName('');
		setLore('');
		setLevel(1);
		setCategory('noob');
		setRace('');
		setIsHuargen(false);

		setPerks([]);
		setAttributes([]);
		setGear({});
		setInventory([]);
		setSpells([]);
		setSkills([]);

		setPros();
		setCons();
	};

	const validateBasicInfo = () => {
		if (!name.trim()) return 'Debes introducir un nombre para tu personaje';
		if (!lore.trim()) return 'Debes escribir una breve historia de tu personaje.';
		if (lore.length > 500) return 'La historia de tu personaje es demasiado larga.';
		return null;
	};

	const validatePoints = () => {
		if (apRemaining < 0) return 'No tienes suficientes puntos de atributo';
		if (spRemaining < 0) return 'No tienes suficientes puntos de Hechizo/habilidad';
		if (ppRemaining < 0) return 'No tienes suficientes puntos de Rasgo';
		return null;
	};

	const validateTalents = () => {
		const maxTP = ap * 2;
		let totalTalentPoints = attributes.reduce((total, attr) => total + Attribute.calculateTalentsTotalPoints(attr.talents), 0);
		if (totalTalentPoints > maxTP) return 'No tienes suficientes puntos de talento';
		return null;
	};

	const validatePerks = () => {
		const negCount = perks.filter((perk) => perk.type === 'negative').length;
		if (negCount < minNegPerks) return `Debes elegir al menos ${minNegPerks} rasgos negativos`;
		return null;
	};

	const validateRaceSpecials = (mappedPros) => {
		if (mappedPros.get('TALENT:adapt') && toAdapt.length === 0) return 'Debes seleccionar un talento para mejorar en Adaptabilidad (Pros)';
		if (mappedPros.get('TALENT:improvement') && toImprove.length === 0) return 'Debes seleccionar un talento para mejorar en Perfeccionamiento (Pros)';
		return null;
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const validations = [validateBasicInfo, validatePoints, validateTalents, validatePerks, () => validateRaceSpecials(new Map(Object.entries(pros)))];

		for (const validate of validations) {
			const error = validate();
			if (error) {
				setAlert({ msg: error, type: 'error' });
				return;
			}
		}

		if (!canAffordThisGear) {
			setAlert({ msg: 'No cumples los requerimientos para poder llevar esta armadura', type: 'error' });
			return;
		}

		const newChar = new Character(id, name, lore, level, category, race, isHuargen, perks, attributes, inventory, gear, spells, skills);
		handleSubmit(newChar);
		onReset();
	};

	const maxLevel = category === 'noob' ? 4 : 10;

	return (
		<FormGAC title={title} onSubmit={onSubmit}>
			<p className="italic text-sm">Los modificadores de talentos por raza, rasgos y por la maldición huargen se aplicarán al terminar la ficha de forma automática</p>
			<FieldSetGAC title={'Información general'} opened={true}>
				<div className="grid grid-cols-3 gap-6 mt-4">
					<div className="col-span-3">
						<label htmlFor="name" className="block mb-1 font-semibold">
							Nombre completo
						</label>
						<InputGAC id="name" customClass={'w-full'} type="text" value={name} onChange={(e) => setName(e.target.value)} />
					</div>

					<div className="col-span-3">
						<label htmlFor="lore" className="flex mb-1 font-semibold flex-col">
							Breve historia del personaje <span className="text-sm">(Solo aquello fundamental para justificar su nivel)</span>
						</label>
						<TextareaGAC id="lore" value={lore} onChange={(e) => setLore(e.target.value)} rows="10" />
						<p className={`${lore.length > 500 && 'text-red-500'} text-sm text-center`}>Caracteres {lore.length}/500</p>
					</div>

					<div className="flex flex-col justify-center text-center">
						<label htmlFor="race" className="block mb-1 font-semibold">
							Raza
						</label>
						<SelectGAC className="p-2 rounded-md border border-gray-600" id="race" value={race} onChange={(e) => setRace(e.target.value)}>
							{races.map((race) => (
								<option key={race.code} value={race.code}>
									{race.label}
								</option>
							))}
						</SelectGAC>
					</div>
					<div className="flex flex-col justify-center text-center">
						<label htmlFor="category" className="block mb-1 font-semibold">
							Categoría
						</label>
						<SelectGAC id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
							<option value={'noob'}>Novato</option>
							<option value={'normal'}>Normal</option>
							<option value={'elite'}>Elite</option>
							<option value={'boss'}>Jefe</option>
						</SelectGAC>
					</div>
					<div className="flex flex-col justify-center text-center">
						<label htmlFor="level" className="block mb-1 font-semibold">
							Nivel
						</label>
						<InputGAC id="level" type="number" min={1} max={maxLevel} value={level} onChange={(e) => setLevel(e.target.value)} />
					</div>

					<div>
						<h3 className="block mb-1 font-semibold">Especial</h3>
						<label htmlFor="race" className="block mb-1 font-semibold">
							<input type="checkbox" className="mr-3" checked={isHuargen} onChange={(e) => setIsHuargen(e.target.checked)} />
							<span>Huargen</span>
						</label>
					</div>
				</div>

				<div className="flex flex-row w-full justify-between mt-5">
					<p className="block mb-1 font-semibold">Vida máxima: {hp}</p>
					<p className="block mb-1 font-semibold">Maná máximo: {mp}</p>
					<p className="block mb-1 font-semibold">Espíritu máximo: {spiritP}</p>
				</div>
			</FieldSetGAC>
			<FieldSetGAC title={'Atributos y talentos'}>
				<p className="block mb-1 font-semibold text-center">
					Puntos de Atributos: {apRemaining}/{ap}
				</p>
				{apRemaining < 0 && <p className="text-red-500 text-center">No tienes puntos de Atributo suficiente</p>}
				<AttirubteExtension charAtts={attributes} handleSetAttributes={handleSetAttributes} />
			</FieldSetGAC>
			<FieldSetGAC title={'Rasgos'}>
				<p className="text-center mb-1 font-semibold">
					Puntos de Rasgos Positivos: {ppRemaining}/{maxPosPerks}
				</p>
				{ppRemaining < 0 && <p className="text-red-500 text-center">No puedes tener más Rasgos positivos o baja un nivel de un Rasgo</p>}
				{(minNegPerks > perks.filter((perk) => perk.type === 'negative').length || perks.filter((perk) => perk.type === 'negative').length === 0) && (
					<p className="text-red-500 text-center">Debes elegir un mínimo de {minNegPerks} rasgos negativos</p>
				)}
				<PerkExtension charPerks={perks} handleSetPerks={handleSetPerks} />
			</FieldSetGAC>
			<FieldSetGAC title={'Pros y contras'}>
				<ProsConsExtension pros={pros} cons={cons} attributes={attributes} handleSpecialsPros={handleSpecialsPros} />
			</FieldSetGAC>

			<FieldSetGAC title={'Armadura y Armas'}>
				{Object.entries(gearRequirements).length > 0 && (
					<p className={`${canAffordThisGear ? 'text-orange-500 text-center' : 'text-red-500'}`}>{canAffordThisGear ? 'Requerimientos para llevar esta armadura' : 'No puedes llevar esta armadura'}</p>
				)}
				{Object.entries(gearRequirements).map(([key, value]) => (
					<div key={key + 'GearRequirement'}>
						<p className={`${canAffordThisGear ? '' : 'text-red-500'}`}>
							{_('es', key.includes(':') ? key.split(':')[1] : key)}: <span>{value}</span>
						</p>
					</div>
				))}
				<GearExtension charGear={gear} charInventory={inventory} handleSetGear={handleSetGear} handleSetInventory={handleSetInventory} />
			</FieldSetGAC>

			<p className="block mb-1 font-semibold text-center">
				Puntos de Hechizos y Habilidades: {spRemaining}/{sp}
			</p>
			{spRemaining < 0 && <p className="text-red-500 text-center">No puedes tener más Hechizos y/o Habilidades</p>}
			<FieldSetGAC title={'Hechizos'}>
				<SpellExtension charSpells={spells} handleSetSpells={handleSetSpells} />
			</FieldSetGAC>
			<FieldSetGAC title={'Habilidades'}>
				<SkillExtension charSkills={skills} handleSetSkills={handleSetSkills} />
			</FieldSetGAC>
			<SaveButtonCAG>Guardar</SaveButtonCAG>
		</FormGAC>
	);
};

CharForm.propTypes = {
	charData: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default CharForm;
