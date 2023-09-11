import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';

function CallBack() {
	const navigate = useNavigate();
	const location = useLocation();
	const authenticateUser = (code: string) => {
		axios
			.get('http://localhost:8080/oauth/kakao/callback', { params: { code } })
			.then((response) => {
				console.log(response);
				const accessToken = response.data.access_token;
				const refreshToken = response.data.refresh_token;
				const requestOptions = {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				};
				if (accessToken) {
					fetch('http://localhost:8080/login', requestOptions)
						.then((res) => {
							if (res.status === 200) {
								return res.json(); // 응답 데이터 파싱
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
				//
			})
			.catch((error) => {
				console.log('Error:', error);
			});
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
