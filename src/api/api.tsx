import axios from 'axios';

const api = axios.create({
	baseURL: `${process.env.REACT_APP_BACK_ADDR}`,
	headers: {
		'Content-Type': 'application/json',
		// Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
	},
});
api.interceptors.request.use((config) => {
	const access_token = sessionStorage.getItem('accessToken');
	if (access_token) {
		config.headers.Authorization = `Bearer ${access_token}`;
	}
	return config;
});

export default api;
