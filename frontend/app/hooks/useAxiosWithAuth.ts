import { useEffect } from 'react';
import Config from 'react-native-config';

import axios from 'axios';
import { useRecoilState } from 'recoil';

import api from '../api/api';
import { TokenState } from '../recoil/recoil';

const useAxiosWithAuth = () => {
	const [tokenState, setTokenState] = useRecoilState(TokenState);

	useEffect(() => {
		console.log('accessToken ', tokenState.accessToken);
		const requestInterceptor = api.interceptors.request.use(async (config) => {
			if (tokenState.accessToken) {
				config.headers.Authorization = `Bearer ${tokenState.accessToken}`;
			}
			return config;
		});

		const interceptor = api.interceptors.response.use(
			(response) => {
				return response;
			},
			async (error) => {
				console.log('error ', error);
				const { config, response } = error;
				console.log('config ', config);
				if ((response && response.status === 403) || response.status == 401) {
					const refreshToken = tokenState.refreshToken;

					if (refreshToken) {
						try {
							const res = await axios.post(
								`${Config.BACK_ADDR}access-token`,
								{},
								{
									headers: {
										'Content-Type': 'application/json',
										Authorization: `Bearer ${refreshToken}`,
									},
								},
							);

							if (res.status === 200) {
								console.log('get newToken success');
								const newAccessToken = res.data.accessToken;
								const newAccessTokenExpireTime = res.data.accessTokenExpireTime;

								setTokenState((prevTokenState) => ({
									...prevTokenState,
									accessToken: newAccessToken,
									accessTokenExpireTime: newAccessTokenExpireTime,
								}));

								config.headers.Authorization = `Bearer ${newAccessToken}`;
								return await axios(config);
							}
						} catch (refreshError: any) {
							console.error('error refreshig accessToken ', refreshError);
						}
					}
				}
				return Promise.reject(error);
			},
		);

		return () => {
			api.interceptors.request.eject(requestInterceptor);
			api.interceptors.request.eject(interceptor);
		};
	}, [tokenState.accessToken, api.interceptors.request]);

	return api;
};

export default useAxiosWithAuth;
