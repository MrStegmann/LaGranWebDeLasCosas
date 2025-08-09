import { Link } from 'react-router-dom';
import PageGAC from '../framework/PageGAC';
import useAuth from '../context/AuthContext';

const Mainmenu = () => {
	const { onLogout } = useAuth();
	return (
		<PageGAC>
			{/* Encabezado */}
			<div className="mb-16 text-center">
				<h1 className="relative text-6xl md:text-7xl font-extrabold text-[#dca34c] tracking-widest select-none drop-shadow-[0_0_8px_rgba(143,87,5,0.6)]">
					Gran Aplicación de las Cosas
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
				<h2 className="mt-5 relative text-4xl md:text-lg font-extrabold text-[#dca34c] tracking-widest select-none drop-shadow-[0_0_8px_rgba(143,87,5,0.6)]">
					Una aplicación para gestionar todas la fichas, una aplicación para hacer hechizos, hablidades y otras cosas. Una aplicación para que todos lo usen y atarlos a la aplicación.
				</h2>
			</div>

			{/* Navegación principal */}
			<nav role="navigation" aria-label="Menú principal" className="flex flex-col gap-6 w-full max-w-sm text-center">
				{[
					{
						to: '/grimoire',
						label: 'Grimorio',
					},
					{
						to: '/perk-maker',
						label: 'Rasgos',
					},
					{
						to: '/sheets',
						label: 'Forja de Fichas',
					},
					{
						to: '/item-maker',
						label: 'Forja de Objetos',
					},
					{
						to: '/oec-menu',
						label: 'Eventos',
					},
					{
						to: '/settings',
						label: 'Ajustes',
					},
				].map(({ to, label }) => (
					<Link
						key={to}
						to={to}
						className="relative z-50 flex items-center gap-2 bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] border-4 border-[#3b2b1b] rounded-xl px-5 py-3 font-semibold text-yellow-200 text-lg shadow-xl hover:scale-105 hover:ring-4 hover:ring-yellow-400/70 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-400/80"
					>
						{label}
					</Link>
				))}

				<button
					className="relative z-50 flex items-center gap-2 bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] border-4 border-[#3b2b1b] rounded-xl px-5 py-3 font-semibold text-yellow-200 text-lg shadow-xl hover:scale-105 hover:ring-4 hover:ring-yellow-400/70 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-400/80"
					onClick={onLogout}
				>
					Cerrar sesión
				</button>

				<button
					className="relative z-50 flex items-center gap-2 bg-gradient-to-tr from-[#5a1a1a] to-[#822323] border-4 border-[#5a1a1a] rounded-xl px-5 py-3 font-semibold text-red-300 text-lg tracking-wider shadow-lg shadow-black/90 hover:scale-105 transition-transform duration-300 active:scale-95 select-none focus:outline-none focus:ring-4 focus:ring-red-500/70"
					onClick={() => window.api.exit()}
				>
					Salir
				</button>
			</nav>
		</PageGAC>
	);
};

export default Mainmenu;
