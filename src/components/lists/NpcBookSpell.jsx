import useSaS from '../../context/SaSContext';
import { useState } from 'react';
import InputGAC from '../../framework/InputGAC';
import SelectGAC from '../../framework/SelectGAC';
import PropTypes from 'prop-types';

const NpcBookSpell = ({ nSpells, handleAddSpell }) => {
	const [search, setSearch] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('');
	const [talentFilter, setTalentFilter] = useState('');
	const { spells } = useSaS();
	const filteredSpells = spells
		.filter((spell) => !nSpells.find((nspell) => spell._id === nspell._id))
		.filter((spell) => spell.name.toLowerCase().includes(search.toLowerCase()))
		.filter((spell) => spell.category.includes(categoryFilter))
		.filter((spell) => spell.talent.includes(talentFilter));

	return (
		<div aria-label="Lista de hechizos" className="w-full md:w-1/2 flex flex-col justify-start items-center">
			{/* Campo de búsqueda */}

			<InputGAC id="searchInput" type="search" placeholder="Buscar hechizo por nombre..." value={search} onChange={(e) => setSearch(e.target.value)} />
			<div className="w-full flex flex-row justify-between">
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
			{/* Lista de hechizos */}
			<ul id="spellList" className="w-full mt-5 md:w-3/4 space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]">
				{filteredSpells.length > 0 ? (
					filteredSpells.map((spell) => (
						<li key={spell._id} className="bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 hover:ring-2 hover:ring-yellow-400 transition duration-200">
							<p className="text-base font-semibold text-yellow-100">
								{spell.name}
								<span className="font-normal text-gray-300">
									{' ( '} Poder: {spell.power} | Acciones: {spell.actions} | Turnos: {spell.turns} | Nivel: {spell.level} {' ) '}
								</span>
							</p>
							<button className="mt-2 text-green-500 hover:text-green-400 hover:cursor-pointer hover:underline" onClick={(e) => handleAddSpell(e, skill)}>
								Añadir
							</button>
						</li>
					))
				) : (
					<p className="text-sm text-center text-yellow-200 italic">No se encontraron hechizos disponibles</p>
				)}
			</ul>
		</div>
	);
};

NpcBookSpell.propTypes = {
	nSpells: PropTypes.array.isRequired,
	handleAddSpell: PropTypes.func.isRequired,
};

export default NpcBookSpell;
