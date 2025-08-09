import { useState } from 'react';
import useOEC from '../../context/OECContext';
import LiGAC from '../../framework/LiGAC';
import InputGAC from '../../framework/InputGAC';
import SUDButtonsGAC from '../../framework/SUDButtonsGAC';
import PropTypes from 'prop-types';

const OneShotList = ({ handleShow, handleEdit, handleDelete }) => {
	const { oneshots } = useOEC();
	const [search, setSearch] = useState('');

	// Filtrar NPCs por nombre
	const filteredOneshots = oneshots.filter((os) => os.title.toLowerCase().includes(search.toLowerCase()));

	return (
		<section aria-label="Lista de NPCs" className="w-full md:w-1/2 bg-[#3c291f]/80 rounded-2xl p-6 shadow-lg shadow-black/50 border border-[#5a3b2e] text-[#f0d9b5] flex flex-col items-center">
			<div className="w-full flex flex-row justify-between">
				<InputGAC id="searchInput" type="search" placeholder="Buscar Oneshot por nombre..." value={search} onChange={(e) => setSearch(e.target.value)} />
			</div>

			<ul id="osList" className="w-full mt-5 md:w-3/4 space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]">
				{filteredOneshots.length > 0 ? (
					filteredOneshots.map((os) => (
						<LiGAC key={os._id}>
							<div className="flex flex-row">
								<div className="flex flex-col">
									<p className="text-base font-semibold text-yellow-100">{os.title}</p>
									<p>{os.flags}</p>
									<div className="flex flex-row">
										<SUDButtonsGAC onShow={() => handleShow(os)} onUpdate={() => handleEdit(os)} onDelete={() => handleDelete(os)} />
									</div>
								</div>
							</div>
						</LiGAC>
					))
				) : (
					<p className="text-sm text-center text-yellow-200 italic">No se encontraron Oneshots</p>
				)}
			</ul>
		</section>
	);
};

OneShotList.propTypes = {
	handleShow: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
};

export default OneShotList;
