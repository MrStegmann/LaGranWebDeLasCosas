import React from 'react';
import useItem from '../../context/ItemsContext';
import InputGAC from '../../framework/InputGAC';
import LiGAC from '../../framework/LiGAC';
import SUDButtonsGAC from '../../framework/SUDButtonsGAC';
import PropTypes from 'prop-types';

const ItemsList = ({ handleShow, handleEdit, handleDelete }) => {
	const [search, setSearch] = React.useState('');
	const { items } = useItem();

	const filteredItems = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<section aria-label="Lista de Objetos" className="w-full md:w-1/2 bg-[#3c291f]/80 rounded-2xl p-6 shadow-lg shadow-black/50 border border-[#5a3b2e] text-[#f0d9b5] flex flex-col items-center">
			<div className="w-full flex flex-row justify-between">
				<InputGAC id="searchInput" type="search" placeholder="Buscar habilidad por nombre..." value={search} onChange={(e) => setSearch(e.target.value)} />
			</div>

			<ul id="itemList" className="w-full md:w-3/4 space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]  mt-5">
				{filteredItems.length > 0 ? (
					filteredItems.map((item) => (
						<LiGAC key={item._id}>
							<div className="flex flex-col">
								<p className="text-base flex flex-row justify-between font-semibold text-yellow-100">
									{item.name}{' '}
									<span className="font-normal text-gray-300">
										{'('}
										{item.quality}
										{')'} - {item.code}
									</span>
								</p>
								<p className="italic">{item.description}</p>
							</div>
							<div className="flex flex-col">
								<SUDButtonsGAC onShow={() => handleShow(item)} onUpdate={() => handleEdit(item)} onDelete={() => handleDelete(item)} />
							</div>
						</LiGAC>
					))
				) : (
					<p className="text-sm text-center text-yellow-200 italic">No se encontraron Objetos.</p>
				)}
			</ul>
		</section>
	);
};

ItemsList.propTypes = {
	handleShow: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
};

export default ItemsList;
