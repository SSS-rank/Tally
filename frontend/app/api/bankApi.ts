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
			// console.log(config);
			console.log(response.data.errorMessage);
			console.log(response.data.Code);
			Alert.alert(response.data.errorMessage);

			console.log('응답결과:' + response.status);
			console.log('메세지:' + response.message);
		}
	},
);

export default bankApi;
