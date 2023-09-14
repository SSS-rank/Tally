import React from 'react';

import { Typography, Button, Box, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import kakao from '../asset/image/icon/kakao.png';
import logo from '../asset/image/sss_bank.png';
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
			<Container
				sx={{
					textAlign: 'center',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					my: 6,
					maxWidth: '500px !important',
					height: '60vh',
				}}
			>
				<Box component="img" src={logo} sx={{ width: '60%' }}></Box>
				<Button
					onClick={handleLoginClick}
					sx={{
						background: '#FFE400',
						color: '#232323',
						fontWeight: 'bold',
						borderRadius: 6,
						width: '80%',
						my: 2,
						':hover': {
							background: '#FFE400',
							color: '#fff',
						},
					}}
				>
					<Box component="img" src={kakao}></Box>
					카카오 로그인
				</Button>
			</Container>
		</ThemeProvider>
	);
}
export default LoginPage;
