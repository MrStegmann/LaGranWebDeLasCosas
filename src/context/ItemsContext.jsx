import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import ItemBridge from '../bridges/ItemBridge';
import useAlert from './AlertContext';
import { Item } from '@models/Item';
import PropTypes from 'prop-types';

const ItemContext = createContext();

export default () => {
	return useContext(ItemContext);
};

export const ItemProvider = ({ children }) => {
	const { setAlert } = useAlert();
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleCreateItem = async (item) => {
		try {
			const response = await ItemBridge.createItem(item);
			setItems([...items, response.data]);
			return response.data;
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	const handleUpdateItem = async (item) => {
		try {
			const response = await ItemBridge.updateItem(item);
			setItems((before) => [...before.filter((it) => it._id !== response.data._id), response.data]);
			return response.data;
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	const handleDeleteItem = async (item) => {
		try {
			await ItemBridge.deleteItem(item._id);
			setItems((before) => [...before.filter((it) => it._id !== item._id)]);
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	useEffect(() => {
		const timeout = setTimeout(async () => {
			try {
				const response = await ItemBridge.getItems();
				setItems(response.data);
			} catch (error) {
				setAlert({ type: 'error', msg: error.message });
				setItems([]);
			}

			setLoading(false);
		}, 25);

		return () => clearTimeout(timeout);
	}, []);

	const contextValue = useMemo(
		() => ({
			Item,
			items,
			handleCreateItem,
			handleUpdateItem,
			handleDeleteItem,
		}),
		[items]
	);

	return (
		<ItemContext.Provider value={contextValue}>
			{loading ? (
				<div className="min-h-screen bg-[#2f1f17] bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] bg-repeat flex flex-col justify-center items-center p-6 font-['Tex Gyre Schola',serif] antialiased">
					<h2 className="text-center w-full text-6xl md:text-7xl font-extrabold text-[#dca34c] tracking-widest select-none drop-shadow-[0_0_8px_rgba(143,87,5,0.6)]"> Cargando Objetos</h2>
				</div>
			) : (
				children
			)}
		</ItemContext.Provider>
	);
};

ItemProvider.propTypes = {
	children: PropTypes.element.isRequired,
};
