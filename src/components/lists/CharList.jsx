import { useState } from 'react';
import useSheet from '../../context/SheetContext';
import InputGAC from '../../framework/InputGAC';
import SelectGAC from '../../framework/SelectGAC';
import LiGAC from '../../framework/LiGAC';
import SUDButtonsGAC from '../../framework/SUDButtonsGAC';
import PropTypes from 'prop-types';

const CharList = ({ handleShow, handleEdit, handleDelete }) => {
	const { chars } = useSheet();
	const [search, setSearch] = useState('');
	const [levelFilter, setLevelFilter] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('');

	// Filtrar Charss por nombre
	const filteredChars = chars
		.filter((character) => character.name.toLowerCase().includes(search.toLowerCase()))
		.filter((character) => String(character.level).includes(levelFilter))
		.filter((character) => character.category.includes(categoryFilter));

	return (
		<section aria-label="Lista de Personajes" className="w-full md:w-1/2 bg-[#3c291f]/80 rounded-2xl p-6 shadow-lg shadow-black/50 border border-[#5a3b2e] text-[#f0d9b5] flex flex-col items-center">
			{/* Search Input */}
			<div className="w-full flex flex-row justify-between">
				<InputGAC id="searchInput" type="search" placeholder="Buscar Personajes por nombre..." value={search} onChange={(e) => setSearch(e.target.value)} />
				<InputGAC id="levelFilter" type="search" placeholder="Buscar Personajes por nivel..." value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} />
				<SelectGAC id={'categoryFilter'} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} disabled={false}>
					<option value="">Categoría</option>
					<option value="normal">Normal</option>
					<option value="elite">Élite</option>
					<option value="boss">Jefe</option>
				</SelectGAC>
			</div>

			{/* Chars List */}
			<ul id="characterList" className="w-full mt-5 md:w-3/4 space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]">
				{filteredChars.length > 0 ? (
					filteredChars.map((character) => (
						<LiGAC key={character._id}>
							<p className="text-base font-semibold text-yellow-100">
								{character.name}{' '}
								<span className="font-normal text-gray-300">
									{'('}Nivel {character.level}
									{')'} - {character.category}
								</span>
							</p>
							<div>
								<SUDButtonsGAC onShow={() => handleShow(character)} onUpdate={() => handleEdit(character)} onDelete={() => handleDelete(character)} />
							</div>
						</LiGAC>
					))
				) : (
					<p className="text-sm text-center text-yellow-200 italic">No se encontraron Personajes</p>
				)}
			</ul>
		</section>
	);
};

CharList.propTypes = {
	handleShow: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
};

export default CharList;
