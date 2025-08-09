import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import useAlert from './AlertContext';
import { Perk } from '@models/Perk';
import perksList from '@json/perks';
import PropTypes from 'prop-types';

const PerkContext = createContext();

export default () => {
	return useContext(PerkContext);
};

export const PerkProvider = ({ children }) => {
	const { setAlert } = useAlert();
	const [perks, setPerks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(async () => {
			try {
				setPerks(perksList);
			} catch (error) {
				setAlert({ type: 'error', msg: error.message });
				setPerks([]);
			}
			setLoading(false);
		}, 25);

		return () => clearTimeout(timeout);
	}, []);

	const contextValue = useMemo(
		() => ({
			Perk,
			perks,
		}),
		[perks]
	);

	return (
		<PerkContext.Provider value={contextValue}>
			{loading ? (
				<div className="min-h-screen bg-[#2f1f17] bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] bg-repeat flex flex-col justify-center items-center p-6 font-['Tex Gyre Schola',serif] antialiased">
					<h2 className="text-center w-full text-6xl md:text-7xl font-extrabold text-[#dca34c] tracking-widest select-none drop-shadow-[0_0_8px_rgba(143,87,5,0.6)]"> Cargando Rasgos</h2>
				</div>
			) : (
				children
			)}
		</PerkContext.Provider>
	);
};

PerkProvider.propTypes = {
	children: PropTypes.element.isRequired,
};
