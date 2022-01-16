import { createContext } from 'react';
import { useState } from 'react';
import api from '../api';

export const CodeContext = createContext();

export const CodeStorage = ({ children }) => {
	const [codes, setCodes] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [lastCode, setLastCode] = useState('');

	const getCodes = () => {
		setLoading(true);

		api.get('/codes')
			.then((res) => {
				setCodes(
					res.data.codes.sort(
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

	const createCode = (code) => {
		setErrorMessage('');
		setLoading(true);

		const {
			category,
			description,
			placePurchase,
			initialQuantity,
			totalPrice, 
			oldCode,
			characteristics, box} = code;
		
		api.post('/codes', {
			category: category || 'Acabamento',
			characteristics,
			description,
			placePurchase,
			image: null,
			initialQuantity,
			totalPrice,
			oldCode,
			box,
		})
			.then((res) => {
				setLastCode(res.data.check.code);
				getCodes();
			})
			.catch((err) => {
				setErrorMessage(err.response.data.error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const deleteCode = (id) => {
		setLoading(true);
		api.delete(`/codes/${id}`)
			.then((res) => {
				getCodes();
			})
			.catch((err) => {
				setErrorMessage(err.response.data.error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<CodeContext.Provider
			value={{
				getCodes,
				createCode,
				deleteCode,
				codes,
				loading,
				errorMessage,
				lastCode,
				setErrorMessage,
			}}
		>
			{children}
		</CodeContext.Provider>
	);
};
