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
				console.log(error);
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
			{
				children
			}
		</PerkContext.Provider>
	);
};

PerkProvider.propTypes = {
	children: PropTypes.element.isRequired,
};
