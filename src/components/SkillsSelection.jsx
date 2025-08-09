import { useState } from 'react';
import InputGAC from '../framework/InputGAC';
import SelectGAC from '../framework/SelectGAC';
import PropTypes from 'prop-types';

const SkillsSelection = ({ mainSkills, handleOnAdd, handleOnRemove, skillList }) => {
	const [search, setSearch] = useState('');
	const [typeFilter, setTypeFilter] = useState('');
	const filteredSkills = skillList.filter((skill) => skill.name.toLowerCase().includes(search.toLowerCase())).filter((skill) => skill.type.includes(typeFilter));
	return (
		<div className="flex flex-col mt-4">
			<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">Habilidades de personaje</h3>
			<div className="flex flex-col max-h-96 overflow-y-auto overflow-x-hidden p-5">
				{mainSkills.map((skill) => (
					<div
						key={skill._id}
						className="inline-block align-top w-full mr-4 bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 cursor-pointer hover:ring-2 hover:ring-yellow-400 transition duration-200"
					>
						<p className="text-base font-semibold text-yellow-100">
							{skill.name}
							<span className="font-normal text-gray-300 block text-sm">
								{' ( '} Poder: {skill.power} | Acciones: {skill.actions} | Turnos: {skill.turns} | Nivel: {skill.level} {' ) '}
							</span>
						</p>
						<p className="italic break-words">{skill.description}</p>
						<button id={skill._id} onClick={handleOnRemove} className="mt-2 text-red-500 hover:text-red-400 hover:underline">
							Quitar
						</button>
					</div>
				))}
			</div>

			<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1 mt-6">Libro de Habilidades</h3>
			<div className="w-full flex flex-row justify-between mb-2">
				<InputGAC id="searchInput" type="search" placeholder="Buscar habilidad por nombre..." value={search} onChange={(e) => setSearch(e.target.value)} />
				<SelectGAC id={'typeFilter'} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} disabled={false}>
					<option value={''}>Tipo de Habilidad</option>
					<option value={'active'}>Activo</option>
					<option value={'pasive'}>Pasivo</option>
				</SelectGAC>
			</div>
			<div className="w-full space-y-3 max-h-96 overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]">
				{filteredSkills
					.filter((sl) => !mainSkills.find((ms) => sl._id === ms._id))
					.map((skill) => (
						<div
							key={skill._id}
							className="inline-block w-full align-top mr-4 bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 cursor-pointer hover:ring-2 hover:ring-yellow-400 transition duration-200"
						>
							<p className="text-base font-semibold text-yellow-100">
								{skill.name}
								<span className="font-normal text-gray-300 block text-sm">
									{' ( '} Poder: {skill.power} | Acciones: {skill.actions} | Turnos: {skill.turns} | Nivel: {skill.level} {' ) '}
								</span>
							</p>
							<p className="italic break-words">{skill.description}</p>
							<button id={skill._id} onClick={handleOnAdd} className="mt-2 text-green-500 hover:text-green-400 hover:underline">
								Añadir
							</button>
						</div>
					))}
			</div>
		</div>
	);
};

SkillsSelection.propTypes = {
	mainSkills: PropTypes.array.isRequired,
	handleOnAdd: PropTypes.func.isRequired,
	handleOnRemove: PropTypes.func.isRequired,
	skillList: PropTypes.array.isRequired,
};

export default SkillsSelection;
