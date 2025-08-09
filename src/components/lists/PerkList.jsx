import { useState } from 'react';
import usePerk from '../../context/PerksContext';
import InputGAC from '../../framework/InputGAC';
import SelectGAC from '../../framework/SelectGAC';
import _ from '../../helpers/Translator';
import UlGAC from '../../framework/UlGAC';
import SUDButtonsGAC from '../../framework/SUDButtonsGAC';
import LiGAC from '../../framework/LiGAC';
import PropTypes from 'prop-types';

const PerkList = ({ handleShow }) => {
	const [search, setSearch] = useState('');
	const [filterType, setFilterType] = useState('');
	const { perks } = usePerk();

	const filteredPerks = perks.filter((perk) => perk.name.toLowerCase().includes(search.toLowerCase())).filter((perk) => perk.type.includes(filterType));

	return (
		<section aria-label="Lista de Rasgos" className="w-full md:w-1/2 bg-[#3c291f]/80 rounded-2xl p-6 shadow-lg shadow-black/50 border border-[#5a3b2e] text-[#f0d9b5] flex flex-col items-center">
			<div className="w-full flex flex-row justify-between">
				<InputGAC id="searchInput" type="search" placeholder="Buscar habilidad por nombre..." value={search} onChange={(e) => setSearch(e.target.value)} />
				<SelectGAC value={filterType} onChange={(e) => setFilterType(e.target.value)}>
					<option value={''}>Tipo de rasgo</option>
					<option value={'positive'}>Positivo</option>
					<option value={'negative'}>Negativo</option>
				</SelectGAC>
			</div>

			<UlGAC>
				{filteredPerks.length > 0 ? (
					filteredPerks.map((perk) => (
						<LiGAC key={perk.id}>
							<div>
								<div className="flex flex-row justify-between mb-2">
									<p className="text-base font-semibold text-yellow-100">{perk.name}</p>
									<p className="font-normal text-gray-300 capitalize">{_('es', perk.type)}</p>
								</div>
								<p>{perk.description}</p>
							</div>

							<SUDButtonsGAC onShow={() => handleShow(perk)} />
						</LiGAC>
					))
				) : (
					<p className="text-sm text-center text-yellow-200 italic">No se encontraron Rasgos.</p>
				)}
			</UlGAC>
		</section>
	);
};

PerkList.propTypes = {
	handleShow: PropTypes.func.isRequired,
};

export default PerkList;
