import { useEffect, useState } from 'react';
import FieldSetGAC from '../../framework/FieldSetGAC';
import races from '@json/races.json' with { type: 'json' };
import worgenData from '@json/worgenData.json' with { type: 'json' };
import _ from '../../helpers/Translator';
import ItemInfo from './ItemInfo';
import PropTypes from 'prop-types';

const CharInfo = ({ character }) => {
	const { basicStat, logistic, specials, attributes, perks, race, isHuargen, category, spells, skills, gear } = character;

	const [moddedTalents, setModdedTalents] = useState([]);
	useEffect(() => {
		const moddedTalents = new Map();

		const addToMap = (map, data, add) => {
			for (const [key, value] of Object.entries(data)) {
				const cleanKey = key.includes(':') ? key.split(':')[1] : key;
				const current = map.get(cleanKey) || 0;
				const delta = Number(value) * (add ? 1 : -1);
				map.set(cleanKey, current + delta);
			}
		};

		const raceFound = races.find((ra) => ra.code === race);
		if (raceFound) {
			addToMap(moddedTalents, raceFound.pros, true);
			addToMap(moddedTalents, raceFound.cons, false);
		}

		if (isHuargen) {
			addToMap(moddedTalents, worgenData.human.pros, true);
			addToMap(moddedTalents, worgenData.human.cons, false);
		}

		setModdedTalents(Object.fromEntries(moddedTalents));
	}, [race, isHuargen, perks, category]);

	const mddTals = new Map(Object.entries(moddedTalents));

	return (
		<div className="bg-[#3c291f]/80 p-6 rounded-2xl shadow-xl shadow-black/60 border-4 border-[#5a3b2e] text-[#f0d9b5] w-full max-w-4xl mx-auto font-serif tracking-wide">
			{/* Datos generales */}
			<FieldSetGAC title={'Información general'} opened={true}>
				<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">{character.name}</h3>
				<div className="flex flex-row justify-between">
					<p>
						<strong>Raza:</strong> {character.race} {character.isHuargen ? '(Huargen)' : ''}
					</p>
					<p>
						<strong>Categoría:</strong> {character.category}
					</p>
					<p>
						<strong>Nivel:</strong> {character.level}
					</p>
				</div>
				<h3 className="text-[#e0cda9] font-semibold mb-4 border-b border-[#6f553e] pb-1">Lore</h3>
				<p className="italic">{character.lore}</p>
			</FieldSetGAC>

			{/* Estadísticas principales */}
			<FieldSetGAC title={'Estadísticas básicas'}>
				<div className="flex flex-row justify-between">
					<p>
						<strong>Vida:</strong> {basicStat.hp}
					</p>
					<p>
						<strong>Maná:</strong> {basicStat.mp}
					</p>
					<p>
						<strong>Espíritu:</strong> {basicStat.spiritPoint}
					</p>
				</div>
				<div className="flex flex-row justify-between">
					<p>
						<strong>Movimiento:</strong> {logistic.movement} metros
					</p>
					<p>
						<strong>Iniciatuva (Bonus):</strong> +{logistic.initiative}
					</p>
					<p>
						<strong>Acciones:</strong> {logistic.actions}
					</p>
				</div>
				<h3 className="text-[#e0cda9] font-semibold mt-4 mb-2 border-b border-[#6f553e] pb-1">Características Especiales</h3>
				<div className="flex flex-row justify-between text-sm">
					{specials.superStrength && (
						<p>
							<strong>Super fuerza</strong>
						</p>
					)}
					{specials.superAudition && (
						<p>
							<strong>Audición superior</strong>
						</p>
					)}
					{specials.nightVision && (
						<p>
							<strong>Visión nocturna</strong>
						</p>
					)}
				</div>
				<div className="flex flex-row justify-between">
					{specials.conjurer && (
						<p>
							<strong>Prestigitador</strong>
						</p>
					)}
					{specials.nemberReplacement && (
						<p>
							<strong>Reemplazo de miembros</strong>
						</p>
					)}
					{specials.hugeMovement && (
						<p>
							<strong>Gran movilidad:</strong>
						</p>
					)}
				</div>
			</FieldSetGAC>

			{/* Atributos y talentos */}
			<FieldSetGAC title={'Atributos y talentos'}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
					{attributes.map((at) => (
						<div key={at.code} className="p-4">
							<h3 className="text-[#e0cda9] font-semibold mt-4 mb-2 border-b border-[#6f553e] pb-1 flex flex-row justify-between">
								{at.label} <span>{at.value}</span>
							</h3>
							<div className="grid grid-cols-1 gap-2 text-sm">
								{at.talents.map((tal) => {
									const baseBonus = mddTals.get(tal.code);
									let huargenBonus = '';

									if (isHuargen) {
										if (worgenData.worgen.pros[tal.code]) {
											huargenBonus = `(${worgenData.worgen.pros[tal.code]} Huargen)`;
										} else if (worgenData.worgen.cons[tal.code]) {
											huargenBonus = `(-${worgenData.worgen.cons[tal.code]} Huargen)`;
										}
									}

									return (
										<p key={tal.code} className="flex flex-row justify-between">
											<strong>{tal.label}:</strong>{' '}
											<span>
												{baseBonus ? `(${baseBonus}) ` : ''}
												{huargenBonus} {tal.value}
											</span>
										</p>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</FieldSetGAC>

			{/* Perks */}
			<FieldSetGAC title={'Rasgos'}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
					{perks.map(
						(perk, index) =>
							perk?.name && (
								<div key={`${perk.id}-${index}`} className="bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 transition duration-200">
									<div className="flex flex-row justify-between mb-2">
										<p className="text-base font-semibold text-yellow-100">{perk.name}</p>
										<p className="font-normal text-gray-300 capitalize">{_('es', perk.type)}</p>
									</div>
									<p>{perk.description}</p>
									<div className="flex flex-row justify-between mt-2">
										{perk.levelOne && perk.level === 1 && (
											<div className="min-w-1/3 p-2 flex flex-col">
												<p className="underline font-black">Nivel 1</p>
												{Object.entries(perk.levelOne).map(([talent, value], i) => (
													<p key={`${talent}-${value}-${i}`}>
														{_('es', talent)}: {perk.type === 'negative' && '-'}
														{value}
													</p>
												))}
											</div>
										)}

										{perk.levelTwo && perk.level === 2 && (
											<div className="min-w-1/3 p-2 flex flex-col">
												<p className="underline font-black">Nivel 2</p>
												{Object.entries(perk.levelTwo).map(([talent, value], i) => (
													<p key={`${talent}-${value}-${i}`}>
														{_('es', talent)}: {perk.type === 'negative' && '-'}
														{value}
													</p>
												))}
											</div>
										)}

										{perk.levelThree && perk.level === 3 && (
											<div className="min-w-1/3 p-2 flex flex-col">
												<p className="underline font-black">Nivel 3</p>
												{Object.entries(perk.levelThree).map(([talent, value], i) => (
													<p key={`${talent}-${value}-${i}`}>
														{_('es', talent)}: {perk.type === 'negative' && '-'}
														{value}
													</p>
												))}
											</div>
										)}
									</div>
								</div>
							)
					)}
				</div>
			</FieldSetGAC>

			{/* Hechizos */}
			{spells.length > 0 && (
				<FieldSetGAC title={'Hechizos'}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						{spells.map(
							(spell) =>
								spell.name && (
									<div key={spell._id} className="inline-block w-full align-top mr-4 bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 transition duration-200">
										<p className="text-base font-semibold text-yellow-100">
											{spell.name}
											<span className="font-normal text-gray-300 block text-sm">
												{' ( '} Poder: {spell.power} | Acciones: {spell.actions} | Turnos: {spell.turns} | Nivel: {spell.level} {' ) '}
											</span>
										</p>
										<p className="italic break-words">{spell.description}</p>
									</div>
								)
						)}
					</div>
				</FieldSetGAC>
			)}

			{/* Habilidades */}
			{skills.length > 0 && (
				<FieldSetGAC title={'Habilidades'}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						{skills.map(
							(skill) =>
								skill.name && (
									<div key={skill._id} className="inline-block align-top w-full mr-4 bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 transition duration-200">
										<p className="text-base font-semibold text-yellow-100">
											{skill.name}
											<span className="font-normal text-gray-300 block text-sm">
												{' ( '} Poder: {skill.power} | Acciones: {skill.actions} | Turnos: {skill.turns} {' ) '}
											</span>
										</p>
										<p className="italic break-words">{skill.description}</p>
									</div>
								)
						)}
					</div>
				</FieldSetGAC>
			)}

			{/* Equipo */}
			<FieldSetGAC title={'Equipo'}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
					{Object.entries(gear).map(
						([slot, item]) =>
							item?._id &&
							item?.name && (
								<div key={`${slot}-${item._id}`}>
									<h3 className="text-[#e0cda9] font-semibold mt-4 mb-2 border-b border-[#6f553e] pb-1 flex flex-row justify-between">{_('es', slot)}</h3>
									<ItemInfo item={item} />
								</div>
							)
					)}
				</div>
			</FieldSetGAC>
		</div>
	);
};

CharInfo.propTypes = {
	character: PropTypes.object.isRequired,
};

export default CharInfo;
