import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const PaginatorCAG = ({ items = [], itemsPerPage = 8, render }) => {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = useMemo(() => Math.ceil(items.length / itemsPerPage), [items, itemsPerPage]);

	const paginatedItems = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return items.slice(start, start + itemsPerPage);
	}, [items, currentPage, itemsPerPage]);

	const goToPage = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<div>
			<div>{render(paginatedItems)}</div>

			<div className="flex justify-center gap-2 mt-4">
				<button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 border rounded disabled:opacity-50">
					← Anterior
				</button>

				<span>
					Página {currentPage} de {totalPages}
				</span>

				<button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 border rounded disabled:opacity-50">
					Siguiente →
				</button>
			</div>
		</div>
	);
};
PaginatorCAG.propTypes = {
	items: PropTypes.array.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	render: PropTypes.func.isRequired,
};
export default PaginatorCAG;
