import { Alert } from 'react-native';

import axios from 'axios';

const bankApi = axios.create({
	baseURL: 'http://j9a108.p.ssafy.io:8011/',
	headers: {
		'Content-Type': 'application/json',
	},
});
bankApi.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		const { config, response } = error;
		if (response.status == 400) {
			Alert.alert(response.data.errorMessage);
		}
	},
);

export default bankApi;
