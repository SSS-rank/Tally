import React from 'react';

import { Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
function LoginPage() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<main style={{ textAlign: 'center', marginTop: '10vh', transform: 'translateY(-50%)' }}>
				<Typography variant="h2">SSS-Bank</Typography>
				<button>카카오 로그인</button>
			</main>
		</ThemeProvider>
	);
}
export default LoginPage;
