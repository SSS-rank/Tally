import Config from 'react-native-config';

import axios from 'axios';

const api = axios.create({
	baseURL: `${Config.BACK_ADDR}`,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
