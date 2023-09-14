import axios from 'axios';

const api = axios.create({
	baseURL: `${process.env.REACT_APP_BACK_ADDR}`,
	headers: {
		'Content-Type': 'application/json',
	},
});
api.interceptors.request.use((config) => {
	const access_token = sessionStorage.getItem('accessToken');
	if (access_token) {
		config.headers.Authorization = `Bearer ${access_token}`;
	}
	return config;
});

const getNewAccessToken = async () => {
	const refresh_token = sessionStorage.getItem('refreshToken');
	console.log(refresh_token);
	if (refresh_token) {
		axios
			.post(
				`${process.env.REACT_APP_BACK_ADDR}access-token/issue`,
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${refresh_token}`,
					},
				},
			)
			.then((response) => {
				const newAccessToken = response.data.accessToken;
				const newAccessTokenExpireTime = response.data.accessTokenExpireTime;
				sessionStorage.setItem('accessTokenExpireTime', newAccessTokenExpireTime);
				sessionStorage.setItem('accessToken', newAccessToken);
			});
	}
	return null;
};
api.interceptors.response.use(
	(response) => {
		console.log(response);
		return response;
	},
	async (error) => {
		console.log(error);
		const {
			config,
			response: { status },
		} = error;
		console.log(config);
		if (status == 401) {
			await getNewAccessToken();
			const originalRequest = config;
			const accessToken = sessionStorage.getItem('accessToken');
			originalRequest.headers.Authorization = `Bearer ${accessToken}`;
			await axios(originalRequest);
		}
		return Promise.reject(error);
	},
);

export default api;
