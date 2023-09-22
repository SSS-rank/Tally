import axios from 'axios';

const bankApi = axios.create({
	baseURL: 'http://j9a108.p.ssafy.io:8011/',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default bankApi;
