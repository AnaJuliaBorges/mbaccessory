import axios from 'axios';

const localhost = 'http://localhost:3333';

const api = axios.create({
	baseURL: localhost,
});

export default api;
