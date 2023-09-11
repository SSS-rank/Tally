import React from 'react';

import { Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const defaultTheme = createTheme();

function LoginPage() {
	const handleLoginClick = () => {
		const KAKAO_BASE_URL = 'https://kauth.kakao.com/oauth/authorize';
		window.location.href =
			KAKAO_BASE_URL +
			`?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
	};
	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<main style={{ textAlign: 'center', marginTop: '10vh', transform: 'translateY(-50%)' }}>
				<Typography variant="h2">SSS-Bank</Typography>
				<button onClick={handleLoginClick}>카카오 로그인</button>
			</main>
		</ThemeProvider>
	);
}
export default LoginPage;
