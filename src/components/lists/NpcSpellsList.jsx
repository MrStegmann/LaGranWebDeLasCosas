import { useState } from 'react';
import InputGAC from '../../framework/InputGAC';
import PropTypes from 'prop-types';

const NpcSpellsList = ({ nSpells, handleRemoveSpell }) => {
	const [search, setSearch] = useState('');
	const filteredSpells = nSpells.filter((spell) => spell.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<div aria-label="Lista de hechizos" className="w-full md:w-1/2 flex flex-col justify-start items-center">
			{/* Campo de búsqueda */}
			<InputGAC id="searchNpcSpellsInput" type="search" placeholder="Buscar hechizo por nombre..." value={search} onChange={(e) => setSearch(e.target.value)} />
			{/* Lista de hechizos */}
			<ul id="npcSpellList" className="mt-5 w-full md:w-3/4 space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]">
				{filteredSpells.length > 0 ? (
					filteredSpells.map((spell) => (
						<li key={spell._id} className="bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 hover:ring-2 hover:ring-yellow-400 transition duration-200">
							<p className="text-base font-semibold text-yellow-100">
								{spell.name}
								<span className="font-normal text-gray-300">
									{' ( '} Poder: {spell.power} | Acciones: {spell.actions} | Turnos: {spell.turns} | Nivel: {spell.level} {' ) '}
								</span>
							</p>
							<button onClick={(e) => handleRemoveSpell(e, spell)} className="mt-2 text-red-500 hover:text-red-400 hover:cursor-pointer hover:underline">
								Eliminar
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

NpcSpellsList.propTypes = {
	nSpells: PropTypes.array.isRequired,
	handleRemoveSpell: PropTypes.func.isRequired,
};

export default NpcSpellsList;
