import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import AuthBridge from '../bridges/AuthBridge';
import useAlert from './AlertContext';
import PropTypes from 'prop-types';
import Login from '../page/Login';

const AuthContext = createContext();

export default () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const { setAlert } = useAlert();
	const [auth, setAuth] = useState({});
	const [loged, setLoged] = useState(false);

	const onLogin = async (username) => {
		try {
			const response = await AuthBridge.login(username.trim());
			localStorage.setItem("GWC-token", response.data.token);
			setAuth(response.data);
			setLoged(true);
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	const onLogout = async () => {
		try {
			const token = localStorage.getItem("GWC-token");
			await AuthBridge.logout(token);
			setAuth({});
			setLoged(false);
						localStorage.removeItem("GWC-token");

		} catch (error) {
			console.log(error);
			setAlert({ type: 'error', msg: error.message });
		}
	};

	const onAutoLogin = async () => {
		try {
			const token = localStorage.getItem("GWC-token");
			if (!token) return;
			const response = await AuthBridge.autoLogin(token);
			setAuth(response.data);
			setLoged(true);
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	useEffect(() => {
		if (loged) return;

		onAutoLogin();
	}, [auth, loged]);

	const contextValue = useMemo(
		() => ({
			auth,
			loged,
			onLogin,
			onLogout,
			onAutoLogin,
		}),
		[auth, loged]
	);

	return <AuthContext.Provider value={contextValue}>{!loged ? <Login onSubmit={onLogin} /> : children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
	children: PropTypes.element.isRequired,
};
