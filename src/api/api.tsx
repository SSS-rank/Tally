import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8080/',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
	},
});

export default api;
