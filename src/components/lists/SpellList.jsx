import React from 'react';
import useSaS from '../../context/SaSContext';
import InputGAC from '../../framework/InputGAC';
import SelectGAC from '../../framework/SelectGAC';
import LiGAC from '../../framework/LiGAC';
import SUDButtonsGAC from '../../framework/SUDButtonsGAC';
import PropTypes from 'prop-types';

const SpellList = ({ handleShow, handleEdit, handleDelete }) => {
	const [search, setSearch] = React.useState('');
	const [categoryFilter, setCategoryFilter] = React.useState('');
	const [talentFilter, setTalentFilter] = React.useState('');
	const { spells } = useSaS();

	const filteredSpells = spells
		.filter((spell) => spell.name.toLowerCase().includes(search.toLowerCase()))
		.filter((spell) => spell.category.includes(categoryFilter))
		.filter((spell) => spell.talent.includes(talentFilter));

	return (
		<section aria-label="Lista de hechizos" className="w-full md:w-1/2 bg-[#3c291f]/80 rounded-2xl p-6 shadow-lg shadow-black/50 border border-[#5a3b2e] text-[#f0d9b5] flex flex-col items-center">
			<div className="w-full flex flex-row justify-between">
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

			<ul id="spellList" className="w-full md:w-3/4 space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17] mt-5">
				{filteredSpells.length > 0 ? (
					filteredSpells.map((spell) => (
						<LiGAC key={spell._id}>
							<div>
								<p className="text-base font-semibold text-yellow-100">{spell.name}</p>
								<p className="font-normal text-gray-300">
									{' ( '} Poder: {spell.power} | Acciones: {spell.actions} | Turnos: {spell.turns} | Nivel: {spell.level} {' ) '}
								</p>
								<p className="italic">{spell.description}</p>
							</div>
							<div className="flex flex-col justify-center ml-5">
								<SUDButtonsGAC onShow={() => handleShow(spell)} onUpdate={() => handleEdit(spell)} onDelete={() => handleDelete(spell)} />
							</div>
						</LiGAC>
					))
				) : (
					<p className="text-sm text-center text-yellow-200 italic">No se encontraron hechizos.</p>
				)}
			</ul>
		</section>
	);
};

SpellList.propTypes = {
	handleShow: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
};

export default SpellList;
