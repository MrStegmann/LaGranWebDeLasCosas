import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const AlertContext = createContext();

export default () => {
	return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
	const [alert, setAlert] = useState({});
	const [show, setShow] = useState(false);

	const { msg, type = 'info' } = alert;

	useEffect(() => {
		if (msg) {
			setShow(true);
			const timeout = setTimeout(() => {
				if (type === 'error') window?.api?.logFrontendError(alert);

				setShow(false);
				setTimeout(() => setAlert({}), 300); // Espera a que termine la animación antes de limpiar
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [msg]);

	const typeStyles = {
		success: 'bg-green-500',
		error: 'bg-red-500',
		falta: 'bg-red-500',
		warning: 'bg-yellow-500 text-black',
		info: 'bg-blue-500',
	};

	const contextValue = useMemo(
		() => ({
			setAlert,
		}),
		[alert]
	);

	return (
		<AlertContext.Provider value={contextValue}>
			{children}

			{/* Tarjeta de alerta con animación */}
			{msg && (
				<div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
					<div
						className={`transition-all duration-300 ease-in-out transform
              ${show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
              px-6 py-4 rounded-xl shadow-lg text-white
              ${typeStyles[type] || typeStyles.info}
            `}
					>
						{msg}
					</div>
				</div>
			)}
		</AlertContext.Provider>
	);
};

AlertProvider.propTypes = {
	children: PropTypes.element.isRequired,
};
