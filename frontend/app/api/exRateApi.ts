import Config from 'react-native-config';

import axios from 'axios';
const exRateApi = axios.create({
	baseURL: `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${Config.EX_KEY}&data=AP01`,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default exRateApi;
