import api from '../../api';

export let getAllLegend = (setErrorMessage) => {
	api.get('/legend')
		.then((res) => {
			return res.data.legend;
		})
		.catch((err) => {
			console.log('error', err);
			setErrorMessage('Something went wrong');
			return;
		});
};

export const createLegend = (name, code, setErrorMessage) => {
	api.post('/legend', {
		name,
		code,
	})
		.then((res) => {
			getAllLegend();
			return res.message;
		})
		.catch((err) => {
			console.log('errado', err);
			setErrorMessage('Something went wrong');
			return;
		});
};

export const deleteLegend = (id, setErrorMessage) => {
	api.delete(`/legend/${id}`)
		.then((res) => {
			getAllLegend();
			return res.message;
		})
		.catch((err) => {
			console.log(err);
			setErrorMessage('Something went wrong');
		});
};
