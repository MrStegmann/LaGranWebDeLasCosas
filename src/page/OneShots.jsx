import { useState } from 'react';
import { Link } from 'react-router-dom';
import useOEC from '../context/OECContext';
import OneShotForm from '../components/forms/OneShotForm';
import OneShotList from '../components/lists/OneShotList';
import OneShotInfo from '../components/infos/OneShotInfo';
import PageGAC from '../framework/PageGAC';
import ConfirmModal from '../framework/ConfirmModal';

const OneShotsManager = () => {
	const { handleCreateOneshot, handleUpdateOneshot, handleDeleteOnehsot } = useOEC();
	const [openModal, setOpenModal] = useState(false);
	const [createOneShot, setCreateOneShot] = useState(false);
	const [editOneShot, setEditOneShot] = useState(false);
	const [selectedOneShot, setSelectedOneShot] = useState(null);

	const createNewOneShot = async (oneshot) => {
		const newOneShot = await handleCreateOneshot(oneshot);
		setCreateOneShot(false);
		setEditOneShot(false);
		setSelectedOneShot(newOneShot);
	};

	const onCreateOneShot = () => {
		setEditOneShot(false);
		setSelectedOneShot({});
		if (createOneShot) {
			setCreateOneShot(false);
			setSelectedOneShot(null);
		} else {
			setCreateOneShot(true);
		}
	};

	const updateOneShot = async (oneshot) => {
		const updated = await handleUpdateOneshot(oneshot);
		setCreateOneShot(false);
		setEditOneShot(false);
		setSelectedOneShot(updated);
	};

	const handleEdit = (oneshot) => {
		setSelectedOneShot(oneshot);
		setEditOneShot(true);
		setCreateOneShot(false);
	};

	const deleteOneShot = async () => {
		handleDeleteOnehsot(selectedOneShot);
		setSelectedOneShot(null);
		setOpenModal(false);
	};

	const handleDelete = (oneshot) => {
		setSelectedOneShot(oneshot);
		setOpenModal(true);
		setEditOneShot(false);
		setCreateOneShot(false);
	};

	const handleShow = (oneshot) => {
		setEditOneShot(false);
		setCreateOneShot(false);
		setSelectedOneShot(oneshot);
	};

	return (
		<PageGAC>
			<ConfirmModal isOpen={openModal} message={'¿Estás seguro de que quieres eliminar este OneShot? Esta acción es irreversible.'} onConfirm={deleteOneShot} onCancel={() => setOpenModal(false)} />

			<Link
				to="/oec-menu"
				aria-label="Volver al menú principal"
				className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] border-4 border-[#3b2b1b] rounded-xl px-5 py-3 font-semibold text-yellow-200 text-lg shadow-xl hover:scale-105 hover:ring-4 hover:ring-yellow-400/70 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-400/80"
			>
				{'<'}
			</Link>

			<div className="mb-16 text-center">
				<h1 className="relative text-6xl md:text-7xl font-extrabold text-[#dca34c] tracking-widest select-none drop-shadow-[0_0_8px_rgba(143,87,5,0.6)]">
					Forja de OneShots
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

			<div className="flex flex-wrap gap-6 justify-center mb-8">
				{!createOneShot && !editOneShot && (
					<button
						onClick={onCreateOneShot}
						className="px-8 py-4 rounded-lg bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] text-yellow-100 border-2 border-[#3b2b1b] shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
					>
						Crear
					</button>
				)}
				{(createOneShot || editOneShot) && (
					<button
						onClick={() => handleShow(null)}
						className="px-8 py-4 rounded-lg bg-gradient-to-tr from-[#3b2b1b] to-[#5c3d2e] text-yellow-100 border-2 border-[#3b2b1b] shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
					>
						Volver
					</button>
				)}
			</div>

			{/* Contenedor principal */}
			<div className="flex flex-row justify-justify p-5 w-full">
				{createOneShot ? (
					<OneShotForm title={'Oneshot nuevo'} oneshotData={selectedOneShot} handleSubmit={createNewOneShot} />
				) : (
					<>
						{editOneShot ? (
							selectedOneShot && <OneShotForm title={'Editando oneshot'} oneshotData={selectedOneShot} handleSubmit={updateOneShot} />
						) : (
							<>
								<OneShotList handleShow={handleShow} handleEdit={handleEdit} handleDelete={handleDelete} />
								{selectedOneShot && <OneShotInfo oneshot={selectedOneShot} />}
							</>
						)}
					</>
				)}
			</div>
		</PageGAC>
	);
};

export default OneShotsManager;
