import { createContext } from 'react';
import { useState } from 'react';
import api from '../api';

export const ExtrasContext = createContext();

export const ExtraStorage = ({ children }) => {
	const [extras, setExtras] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const getExtras = () => {
		setLoading(true);

		api.get('/inputs')
			.then((res) => {
				setExtras(
					res.data.input.sort(
						(a, b) => (a.code > b.code) - (a.code < b.code)
					)
				);
			})
			.catch((err) => {
				setErrorMessage(err.response.data.error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const createExtra = (extra) => {
		setErrorMessage('');
		setLoading(true);

		const {
			name,
			description = null,
			active = true,
			initialQuantity,
			totalPrice
		} = extra;

		api.post('/inputs', {
			name,
			description,
			active,
			initialQuantity,
			totalPrice
		})
			.then((res) => {
				getExtras();
			})
			.catch((err) => {
				console.log({err});
				setErrorMessage(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const deleteExtra = (name) => {
		setLoading(true);
		api.delete(`/inputs/${name}`)
			.then((res) => {
				getExtras();
			})
			.catch((err) => {
				setErrorMessage(err.response.data.error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<ExtrasContext.Provider
			value={{
				getExtras,
				createExtra,
				deleteExtra,
				extras,
				loading,
				errorMessage,
				setErrorMessage,
			}}
		>
			{children}
		</ExtrasContext.Provider>
	);
};
