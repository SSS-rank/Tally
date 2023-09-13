import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import api from '../api/api';
import AccountListItem from '../components/AccountListItem/AccountListItem';

interface Account {
	account_number: string;
	balance: number;
	bank_code: string;
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
function MainPage() {
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [token, setToken] = useState(sessionStorage.getItem('accessToken'));
	const navigate = useNavigate();
	const fetchAccountData = async () => {
		try {
			const response = await api.get('account');
			if (response.status === 200) {
				console.log('계좌 조회 성공!');
				console.log(response.data);
				setAccounts(response.data);
				// console.log(accounts);
			} else {
				console.error('계정 조회 실패:', response.data);
			}
		} catch (error) {
			window.alert('계좌 조회 오류 입니다.');
		}
	};

	useEffect(() => {
		if (token) {
			fetchAccountData();
		}
	}, [token]);

	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<main>
				<Box
					sx={{
						bgcolor: 'background.paper',
					}}
				>
					<Container sx={{ py: 2 }} maxWidth="md">
						<Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="">
							<Typography component="h1" variant="h5">
								계좌 목록
							</Typography>
						</Stack>
					</Container>
				</Box>
				<Container sx={{ py: 2 }} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{accounts.map((account) => (
							<AccountListItem
								key={account.account_number}
								balance={account.balance}
								bankcode={account.bank_code}
								accountNum={account.account_number}
							/>
						))}
						<Grid item xs={12}>
							<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
								<Button variant="contained" href="/add" className="btn btn-primary">
									추가
								</Button>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</main>
		</ThemeProvider>
	);
}
export default MainPage;
