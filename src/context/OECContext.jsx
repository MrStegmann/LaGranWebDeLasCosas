import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import useAlert from './AlertContext';
import PropTypes from 'prop-types';
import OneshotBridge from '../bridges/OneshotBridge';

const OECContext = createContext();

export default () => {
	return useContext(OECContext);
};

export const OECProvider = ({ children }) => {
	const { setAlert } = useAlert();
	const [oneshots, setOneshots] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleCreateOneshot = async (oneshot) => {
		try {
			const response = await OneshotBridge.create(oneshot);
			setOneshots((before) => [...before, response.data]);
			return response.data;
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	const handleUpdateOneshot = async (oneshot) => {
		try {
			const response = await OneshotBridge.update(oneshot);
			setOneshots((before) => [...before.filter((os) => os._id !== response.data._id), response.data]);
			return response.data;
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	const handleDeleteOneshot = async (oneshot) => {
		try {
			await OneshotBridge.deleteSpell(oneshot._id);
			setOneshots((before) => [...before.filter((os) => os._id !== oneshot._id)]);
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	useEffect(() => {
		const timeout = setTimeout(async () => {
			try {
				const response = await OneshotBridge.get();
				setOneshots(response.data);
			} catch (error) {
				console.log(error);
				setAlert({ type: 'error', msg: error.message });
				setOneshots([]);
			}

			setLoading(false);
		}, 25);

		return () => clearTimeout(timeout);
	}, []);

	const contextValue = useMemo(
		() => ({
			oneshots,
			handleCreateOneshot,
			handleUpdateOneshot,
			handleDeleteOneshot,
		}),
		[oneshots]
	);

	return (
		<OECContext.Provider value={contextValue}>
			{
				children
			}
		</OECContext.Provider>
	);
};

OECProvider.propTypes = {
	children: PropTypes.element.isRequired,
};
