import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import api from '../api/api';

function CallBack() {
	const navigate = useNavigate();
	const location = useLocation();
	const authenticateUser = async (code: string) => {
		try {
			const response = await api.get('oauth/kakao/callback', { params: { code } });
			if (response.status === 200) {
				const accessToken = response.data.access_token;

				if (accessToken) {
					sessionStorage.setItem('accessToken', accessToken);
					await api
						.post('login')
						.then((res) => {
							if (res.status === 200) {
								return res.data; // 응답 데이터 파싱
							} else {
								throw new Error('로그인에 실패했습니다.');
							}
						})
						.then((data) => {
							// 로그인에 성공한 경우에 대한 처리
							sessionStorage.setItem('accessToken', data.accessToken);
							sessionStorage.setItem('accessTokenExpireTime', data.accessTokenExpireTime);
							sessionStorage.setItem('refreshToken', data.refreshToken);
							sessionStorage.setItem('refreshTokenExpireTime', data.refreshTokenExpireTime);
							navigate('/main');
						});
				}
			}
		} catch (error) {
			console.error('카카오 로그인 콜백 실패');
		}
	};

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const code = params.get('code');

		// If code exists, authenticate the user
		if (code) {
			authenticateUser(code);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	});
	return <div></div>;
}
export default CallBack;
