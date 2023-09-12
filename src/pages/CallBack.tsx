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
				const refreshToken = response.data.refresh_token;

				if (accessToken) {
					sessionStorage.setItem('accessToken', accessToken);
					api
						.post('login')
						.then((res) => {
							if (res.status === 200) {
								console.log(res.data);
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
				if (refreshToken) {
					sessionStorage.setItem('refreshToken', refreshToken);
				}
			} else {
				console.error('계정 생성 실패:', response.data);
			}
		} catch (error) {
			window.alert('계좌 생성 오류입니다. 다시 생성해주세요');
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
	return <div>callback</div>;
}
export default CallBack;
