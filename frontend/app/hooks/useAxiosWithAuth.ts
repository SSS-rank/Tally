import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import api from '../api/api';
import { TokenState } from '../recoil/recoil';

const useAxiosWithAuth = () => {
	const accessToken = useRecoilValue(TokenState).accessToken;

	useEffect(() => {
		console.log('accessToken ', accessToken);
		const requestInterceptor = api.interceptors.request.use(async (config) => {
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		});

		return () => {
			api.interceptors.request.eject(requestInterceptor);
		};
	}, [accessToken, api.interceptors.request]);

	return api;
};

export default useAxiosWithAuth;
