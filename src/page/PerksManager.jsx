import { useState } from 'react';
import { Link } from 'react-router-dom';
import PerkList from '../components/lists/PerkList';
import PerkInfo from '../components/infos/PerkInfo';
import PageGAC from '../framework/PageGAC';

const PerksManager = () => {
	const [selectedPerk, setSelectedPerk] = useState(null);

	const handleShow = (perk) => {
		setSelectedPerk(perk);
	};

	return (
		<PageGAC>
			<Link
				to="/"
				aria-label="Volver al menú principal"
				className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] border-4 border-[#3b2b1b] rounded-xl px-5 py-3 font-semibold text-yellow-200 text-lg shadow-xl hover:scale-105 hover:ring-4 hover:ring-yellow-400/70 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-400/80"
			>
				{'<'}
			</Link>

			<div className="mb-16 text-center">
				<h1 className="relative text-6xl md:text-7xl font-extrabold text-[#dca34c] tracking-widest select-none drop-shadow-[0_0_8px_rgba(143,87,5,0.6)]">
					Forja de Rasgos
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						aria-hidden="true"
						className="inline-block w-9 h-9 ml-3 -mb-1 stroke-[#dca34c] stroke-2 stroke-linejoin-round stroke-linecap-round filter drop-shadow-[0_0_1px_rgba(122,84,24,0.7)] transition-colors duration-300 hover:stroke-yellow-300"
					>
						<path d="M4 20c1-6 4-11 7-14" />
						<path d="M9 18c1-4 2-8 5-10" />
						<path d="M14 18c1-3 3-6 4-7" />
					</svg>
				</h1>
			</div>

			{/* Contenedor principal */}

			<div className="flex flex-row justify-justify p-5 w-full">
				<PerkList handleShow={handleShow} />
				{selectedPerk && <PerkInfo perk={selectedPerk} />}
			</div>
		</PageGAC>
	);
};

export default PerksManager;
