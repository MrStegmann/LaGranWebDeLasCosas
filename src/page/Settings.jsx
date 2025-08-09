import { useState, useEffect } from 'react';
import SelectGAC from '../framework/SelectGAC';
import { Link } from 'react-router-dom';
import PageGAC from '../framework/PageGAC';

const Settings = () => {
	const [screenOption, setScreenOption] = useState('');
	const [debbugMode, setDebbugMode] = useState('');

	useEffect(() => {
		const getScreenOption = async () => {
			const screenOptionSaved = await window.api?.getScreenSavedOption();
			if (screenOptionSaved) {
				setScreenOption(screenOptionSaved);
			}
		};

		const getDebbugMode = async () => {
			const debbugModeSaved = await window.api?.getDebbugMode();
			setDebbugMode(debbugModeSaved);
		};

		getScreenOption();
		getDebbugMode();
	}, []);

	useEffect(() => {
		if (screenOption === '') return;
		window.api?.setScreenOption(screenOption);
	}, [screenOption]);

	useEffect(() => {
		if (debbugMode !== 'on' && debbugMode !== 'off') return;
		window.api?.setDebbugMode(debbugMode);
	}, [debbugMode]);

	return (
		<PageGAC>
			<Link
				to="/"
				aria-label="Volver al menú principal"
				className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] border-4 border-[#3b2b1b] rounded-xl px-5 py-3 font-semibold text-yellow-200 text-lg shadow-xl hover:scale-105 hover:ring-4 hover:ring-yellow-400/70 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-400/80"
			>
				Volver
			</Link>
			<div className="mb-16 text-center">
				<h1 className="relative text-6xl md:text-7xl font-extrabold text-[#dca34c] tracking-widest select-none drop-shadow-[0_0_8px_rgba(143,87,5,0.6)]">
					Ajustes
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
			<div className="flex flex-row items-center justify-center w-1/2">
				<label htmlFor="screenOption" className="text-white text-right px-1 mr-5 font-bold text-lg w-4/5">
					Pantalla
				</label>
				<SelectGAC id={'screenOption'} value={screenOption} onChange={(e) => setScreenOption(e.target.value)} disabled={false}>
					<option value="fullscreen">Pantalla completa</option>
					<option value="fullwindow">Ventana completa</option>
					<option value="window">Ventana</option>
				</SelectGAC>
			</div>
			<div className="flex flex-row items-center justify-center w-1/2">
				<label htmlFor="debbugMode" className="text-white text-right px-1 mr-5 font-bold text-lg w-4/5">
					Modo Debbug
				</label>
				<SelectGAC id={'debbugMode'} value={debbugMode} onChange={(e) => setDebbugMode(e.target.value)} disabled={false}>
					<option value="on">Activado</option>
					<option value="off">Desactivado</option>
				</SelectGAC>
			</div>
		</PageGAC>
	);
};

export default Settings;
