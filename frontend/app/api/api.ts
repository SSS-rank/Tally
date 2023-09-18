import Config from 'react-native-config';

import axios from 'axios';
const api = axios.create({
	baseURL: `${Config.BACK_ADDR}`,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use((config) => {
	const accessToken = '';
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

export default api;
