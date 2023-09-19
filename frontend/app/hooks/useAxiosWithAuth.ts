import { useEffect, useState } from 'react';
import Config from 'react-native-config';

import axios from 'axios';
import { useRecoilValue } from 'recoil';

import { TokenState } from '../recoil/recoil';

const useAxiosWithAuth = () => {
	const accessToken = useRecoilValue(TokenState).accessToken;
	const api = axios.create({
		baseURL: `${Config.BACK_ADDR}`,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	useEffect(() => {
		const requestInterceptor = api.interceptors.request.use(async (config) => {
			console.log(accessToken);
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
