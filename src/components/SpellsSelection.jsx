import { useState } from 'react';
import InputGAC from '../framework/InputGAC';
import SelectGAC from '../framework/SelectGAC';
import PropTypes from 'prop-types';

const SpellsSelection = ({ mainSpells, handleOnAdd, handleOnRemove, spellList }) => {
	const [search, setSearch] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('');
	const [talentFilter, setTalentFilter] = useState('');

	const filteredSpells = spellList
		.filter((spell) => spell.name.toLowerCase().includes(search.toLowerCase()))
		.filter((spell) => spell.category.includes(categoryFilter))
		.filter((spell) => spell.talent.includes(talentFilter));
	return (
		<div className="flex flex-col mt-4">
			{/* Grimorio */}
			<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">Grimorio de personaje</h3>
			<div className="flex flex-col max-h-96 overflow-y-auto overflow-x-hidden p-5">
				{mainSpells.map((spell) => (
					<div
						key={spell._id}
						className="inline-block align-top w-full mr-4 bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 cursor-pointer hover:ring-2 hover:ring-yellow-400 transition duration-200"
					>
						<p className="text-base font-semibold text-yellow-100">
							{spell.name}
							<span className="font-normal text-gray-300 block text-sm">
								{' ( '} Poder: {spell.power} | Acciones: {spell.actions} | Turnos: {spell.turns} | Nivel: {spell.level} {' ) '}
							</span>
						</p>
						<p className="italic break-words">{spell.description}</p>
						<button id={spell._id} onClick={handleOnRemove} className="mt-2 text-red-500 hover:text-red-400 hover:underline">
							Quitar
						</button>
					</div>
				))}
			</div>

			{/* Libro de Hechizos */}
			<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1 mt-6">Libro de Hechizos</h3>
			<div className="w-full flex flex-row justify-between mb-2">
				<InputGAC id="searchInput" type="search" placeholder="Buscar hechizo por nombre..." value={search} onChange={(e) => setSearch(e.target.value)} />
				<SelectGAC id={'categoryFilter'} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} disabled={false}>
					<option value="">Tipo de hechizo</option>
					<option value="trick">Truco</option>
					<option value="fast">Rápido</option>
					<option value="basic">Básico</option>
					<option value="powerful">Potente</option>
				</SelectGAC>
				<SelectGAC id={'talentFilter'} value={talentFilter} onChange={(e) => setTalentFilter(e.target.value)} disabled={false}>
					<option value="">Talento</option>
					<option value="arcane">Arcano</option>
					<option value="fel">Vil</option>
					<option value="nature">Naturaleza</option>
					<option value="shadow">Sombras</option>
					<option value="astral">Astral</option>
					<option value="nicromancy">Nigromancia</option>
					<option value="faith">Fe</option>
					<option value="elemental">Elemental</option>
					<option value="chi">Chi</option>
				</SelectGAC>
			</div>
			<div className="w-full space-y-3 max-h-96 overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]">
				{filteredSpells
					.filter((sl) => !mainSpells.find((ms) => sl._id === ms._id))
					.map((spell) => (
						<div
							key={spell._id}
							className="inline-block w-full align-top mr-4 bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 cursor-pointer hover:ring-2 hover:ring-yellow-400 transition duration-200"
						>
							<p className="text-base font-semibold text-yellow-100">
								{spell.name}
								<span className="font-normal text-gray-300 block text-sm">
									{' ( '} Poder: {spell.power} | Acciones: {spell.actions} | Turnos: {spell.turns} | Nivel: {spell.level} {' ) '}
								</span>
							</p>
							<p className="italic break-words">{spell.description}</p>
							<button id={spell._id} onClick={handleOnAdd} className="mt-2 text-green-500 hover:text-green-400 hover:underline">
								Añadir
							</button>
						</div>
					))}
			</div>
		</div>
	);
};

SpellsSelection.propTypes = {
	mainSpells: PropTypes.array.isRequired,
	handleOnAdd: PropTypes.func.isRequired,
	handleOnRemove: PropTypes.func.isRequired,
	spellList: PropTypes.array.isRequired,
};

export default SpellsSelection;
