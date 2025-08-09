import { useState } from 'react';
import useSheet from '../context/SheetContext';
import ConfirmModal from '../framework/ConfirmModal';
import { useParams, Link } from 'react-router-dom';
import PageGAC from '../framework/PageGAC';
import NpcForm from '../components/forms/NpcForm';
import NpcList from '../components/lists/NpcList';
import NpcInfo from '../components/infos/NpcInfo';
import CharList from '../components/lists/CharList';
import CharInfo from '../components/infos/CharInfo';
import CharForm from '../components/forms/CharForm';

const SheetsManager = () => {
	const { handleCreateNpc, handleUpdateNpc, handleDeleteNpc, handleCreateChar, handleUpdateChar, handleDeleteChar } = useSheet();

	const { option } = useParams();
	const sheetOption = option || 'characters';

	const [openModal, setOpenModal] = useState(false);

	const [createSheets, setCreateSheets] = useState(false);
	const [editSheets, setEditSheets] = useState(false);
	const [selectedSheets, setSelectedSheets] = useState(null);

	const handlers = {
		characters: {
			create: handleCreateChar,
			update: handleUpdateChar,
			delete: handleDeleteChar,
		},
		npcs: {
			create: handleCreateNpc,
			update: handleUpdateNpc,
			delete: handleDeleteNpc,
		},
	};

	const createNewSheet = async (sheet) => {
		const newSaS = await handlers[sheetOption].create(sheet);
		setCreateSheets(false);
		setEditSheets(false);
		setSelectedSheets(newSaS);
	};

	const onCreateSheet = () => {
		setEditSheets(false);
		setSelectedSheets({});
		if (createSheets) {
			setCreateSheets(false);
			setSelectedSheets(null);
		} else {
			setCreateSheets(true);
		}
	};

	const updateSheet = async (sheet) => {
		const updated = await handlers[sheetOption].update(sheet);
		setCreateSheets(false);
		setEditSheets(false);
		setSelectedSheets(updated);
	};

	const handleEdit = (sheet) => {
		setSelectedSheets(sheet);
		setEditSheets(true);
		setCreateSheets(false);
	};

	const handleShow = (sheet) => {
		setEditSheets(false);
		setCreateSheets(false);
		setSelectedSheets(sheet);
	};

	const deleteSheet = async () => {
		handlers[sheetOption].delete(selectedSheets);
		setSelectedSheets(null);
		setOpenModal(false);
	};

	const handleDelete = (sheet) => {
		setSelectedSheets(sheet);
		setOpenModal(true);
		setEditSheets(false);
		setCreateSheets(false);
	};

	return (
		<PageGAC>
			<ConfirmModal isOpen={openModal} message={'¿Estás seguro de que quieres eliminar este Personaje? Esta acción es irreversible.'} onConfirm={deleteSheet} onCancel={() => setOpenModal(false)} />

			<Link
				to="/sheets"
				aria-label="Volver al menú principal"
				className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] border-4 border-[#3b2b1b] rounded-xl px-5 py-3 font-semibold text-yellow-200 text-lg shadow-xl hover:scale-105 hover:ring-4 hover:ring-yellow-400/70 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-400/80"
			>
				{'<'}
			</Link>

			{!createSheets && !editSheets && (
				<div className="mb-16 text-center">
					<h1 className="relative text-6xl md:text-7xl font-extrabold text-[#dca34c] tracking-widest select-none drop-shadow-[0_0_8px_rgba(143,87,5,0.6)]">
						Forja de Fichas de Personaje
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
			)}

			<div className="flex flex-wrap gap-6 justify-center mb-8">
				{!createSheets && !editSheets && (
					<button
						onClick={onCreateSheet}
						className="px-8 py-4 rounded-lg bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] text-yellow-100 border-2 border-[#3b2b1b] shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
					>
						Crear
					</button>
				)}
				{(createSheets || editSheets) && (
					<button
						onClick={() => handleShow(null)}
						className="px-8 py-4 rounded-lg bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] text-yellow-100 border-2 border-[#3b2b1b] shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
					>
						Volver
					</button>
				)}
			</div>

			{/* Contenedor principal */}
			{sheetOption === 'characters' ? (
				<div className="flex flex-row justify-justify p-5 w-full">
					{createSheets ? (
						<CharForm title={'Nueva ficha de Personaje'} charData={selectedSheets} handleSubmit={createNewSheet} />
					) : (
						<>
							{editSheets ? (
								selectedSheets && <CharForm title={'Editando fichas de Personaje'} charData={selectedSheets} handleSubmit={updateSheet} />
							) : (
								<>
									<CharList handleShow={handleShow} handleEdit={handleEdit} handleDelete={handleDelete} />
									{selectedSheets && <CharInfo character={selectedSheets} />}
								</>
							)}
						</>
					)}
				</div>
			) : (
				<div className="flex flex-row justify-justify p-5 w-full">
					{createSheets ? (
						<NpcForm npcData={selectedSheets} handleSubmit={createNewSheet} />
					) : (
						<>
							{editSheets ? (
								selectedSheets && <NpcForm npcData={selectedSheets} handleSubmit={updateSheet} />
							) : (
								<>
									<NpcList handleShow={handleShow} handleEdit={handleEdit} handleDelete={handleDelete} />
									{selectedSheets && <NpcInfo npcData={selectedSheets} />}
								</>
							)}
						</>
					)}
				</div>
			)}
		</PageGAC>
	);
};

export default SheetsManager;
