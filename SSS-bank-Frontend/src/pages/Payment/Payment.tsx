import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import api from '../../api/api';

// 숫자를 1000단위로 콤마를 추가하여 포맷팅하는 함수
const formatNumber = (number: string) => {
	return number.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

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

			try {
				const res = await api.post(`/payment`, paymentReq);
				if (res.status === 200) {
					alert('결제가 완료되었습니다');
					navigate('/shop');
				}
			} catch (error: any) {
				console.log(error);
				if (error.response.status == 401) {
					window.location.replace('/main');
				} else {
					window.alert('결제 실패');
				}
			}
		}
	};

	const [amount, setAmount] = useState('');

	// 사용자가 입력한 값이 바뀔 때마다 호출되는 함수
	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		const formattedValue = formatNumber(inputValue); // 숫자 포맷팅 함수 호출
		setAmount(formattedValue);
	};

	return (
		<Container component="main">
			<CssBaseline />

			<Box
				sx={{
					my: 3,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Stack
					display="flex"
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					width="100%"
					mb={5}
				>
					<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
						결제
					</Typography>
					<IconButton onClick={clickCancleBtn}>
						<CloseIcon />
					</IconButton>
				</Stack>
				<Box component="form" sx={{ mt: 3, width: '100%' }} onSubmit={handleSubmit}>
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
							<TextField
								required
								fullWidth
								id="amount"
								label="보낼 금액"
								name="amount"
								value={amount}
								onChange={handleAmountChange}
							/>
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
