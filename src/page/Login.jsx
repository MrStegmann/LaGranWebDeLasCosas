import FormGAC from '../framework/FormGAC';
import InputGAC from '../framework/InputGAC';
import SaveButtonCAG from '../framework/SaveButtonGAC';
import useAlert from '../context/AlertContext';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Login = ({ onSubmit }) => {
	const { setAlert } = useAlert();
	const [username, setUsername] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (username.length === 0) return setAlert({ type: 'error', msg: 'Debes añadir un nombre de usuario' });
		onSubmit(username);
	};
	return (
		<div className="min-h-screen bg-[#2f1f17] bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] bg-repeat flex flex-col justify-center items-center p-6 font-['Tex Gyre Schola',serif] antialiased">
			<div className="w-1/3">
				<FormGAC onSubmit={handleSubmit}>
					<h2 className="text-3xl">Login</h2>
					<div className="col-span-3">
						<label htmlFor="username" className="block mb-1 font-semibold">
							Usuario
						</label>
						<InputGAC id="username" customClass={'w-full'} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
					</div>
					<SaveButtonCAG>Acceder</SaveButtonCAG>
				</FormGAC>
			</div>
		</div>
	);
};

Login.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default Login;
