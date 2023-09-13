import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import api from '../../api/api';

function Payment() {
	const navigate = useNavigate();
	const { state } = useLocation();

	// 결제 취소
	const clickCancleBtn = () => {
		navigate('/shop');
	};

	// 결제하기
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		if (state.shopId !== '') {
			const paymentReq = {
				sender_account_num: data.get('accountNum'),
				shop_id: state.shopId,
				payment_amount: data.get('amount'),
				password: data.get('accountPassword'),
			};

			const res = await api.post(`/payment`, paymentReq);
			if (res.status === 200) {
				alert('결제가 완료되었습니다');
				navigate('/shop');
			}
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />

			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Grid container spacing={2}>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Typography component="h1" variant="h5">
							결제
						</Typography>
						<IconButton onClick={clickCancleBtn}>
							<CloseIcon />
						</IconButton>
					</Box>
				</Grid>
				<Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								name="accountNum"
								id="accountNum"
								required
								fullWidth
								label="결제할 계좌번호 입력"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField required fullWidth id="amount" label="보낼 금액" name="amount" />
						</Grid>
						<Grid item xs={12} sx={{ mt: 6 }}>
							<TextField
								required
								fullWidth
								id="accountPassword"
								label="계좌 비밀번호 입력"
								name="accountPassword"
								variant="standard"
								type="password"
							/>
						</Grid>
					</Grid>
					<Button
						fullWidth
						type="submit"
						variant="contained"
						sx={{
							mt: 3,
							mb: 2,
							background: '#7BC6F6',
							boxShadow: 'none',
							':hover': {
								boxShadow: 'none',
							},
						}}
					>
						결제하기
					</Button>
				</Box>
			</Box>
		</Container>
	);
}

export default Payment;
