import axios from 'axios';

const api = axios.create({
	baseURL: `${process.env.REACT_APP_BACK_ADDR}`,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
	},
});

export default api;
