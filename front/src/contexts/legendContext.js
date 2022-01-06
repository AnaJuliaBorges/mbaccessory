import { createContext } from 'react';
import { useState } from 'react';
import api from '../api';

export const LegendContext = createContext();

export const LegendStorage = ({ children }) => {
	const [legend, setLegend] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const getLegend = () => {
		setLoading(true);

		api.get('/legend')
			.then(res => {
				setLegend(
					res.data.legend.sort(
						(a, b) => (a.name > b.name) - (a.name < b.name)
					)
				);
			})
			.catch(err => {
				console.log(err);
				setErrorMessage(err.response.data.error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const createLegend = (name, code, characteristics) => {
		setErrorMessage('');
		setLoading(true);

		api.post('/legend', {
			name: name.replace(/^\w/, c => c.toUpperCase()),
			code: code.toUpperCase(),
			characteristics,
		})
			.then(res => {
				getLegend();
			})
			.catch(err => {
				setErrorMessage(err.response.data.error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const deleteLegend = id => {
		setLoading(true);
		api.delete(`/legend/${id}`)
			.then(res => {
				getLegend();
			})
			.catch(err => {
				setErrorMessage(err.response.data.error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const zerarIdLegend = id => {
		setLoading(true);
		api.patch(`/legend/zerar/${id}`)
			.then(res => {
				console.log({res})
				getLegend();
			})
			.catch(err => {
				setErrorMessage(err.response.data.error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<LegendContext.Provider
			value={{
				getLegend,
				createLegend,
				deleteLegend,
				zerarIdLegend,
				legend,
				loading,
				errorMessage,
				setErrorMessage,
			}}
		>
			{children}
		</LegendContext.Provider>
	);
};
