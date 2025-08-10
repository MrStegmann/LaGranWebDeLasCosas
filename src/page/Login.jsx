import FormGAC from '../framework/FormGAC';
import InputGAC from '../framework/InputGAC';
import SaveButtonCAG from '../framework/SaveButtonGAC';
import useAlert from '../context/AlertContext';
import PropTypes from 'prop-types';
import { useState } from 'react';
import GAC from '../framework/GAC';

const Login = ({ onSubmit }) => {
	const { setAlert } = useAlert();
	const [username, setUsername] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (username.length === 0) return setAlert({ type: 'error', msg: 'Debes añadir un nombre de usuario' });
		onSubmit(username);
	};
	return (
		<GAC>
			<div className="w-1/3">
				<FormGAC onSubmit={handleSubmit} buttonText="Acceder">
					<h2 className="text-3xl">Inicio de sesión</h2>
					<div className="col-span-3">
						<label htmlFor="username" className="block mb-1 font-semibold">
							Usuario
						</label>
						<InputGAC id="username" customClass={'w-full'} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
					</div>
				</FormGAC>
			</div>
		</GAC>
	);
};

Login.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default Login;
