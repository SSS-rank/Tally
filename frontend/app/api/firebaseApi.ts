import Config from 'react-native-config';

import axios from 'axios';
const firebaseApi = axios.create({
	baseURL: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${Config.FIREBASE_API_KEY}`,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default firebaseApi;
