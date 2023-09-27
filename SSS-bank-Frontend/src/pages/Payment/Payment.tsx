import React, { useState, useEffect } from 'react';
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
import AccountSelectList from '../../components/AccountItem/AccountSelectList';
import useNumberFormat from '../../hooks/useNumberFormat';

interface Account {
	account_number: string;
	balance: number;
	bank_code: string;
}
function Payment() {
	const navigate = useNavigate();
	const { state } = useLocation();

	// 결제 취소
	const clickCancleBtn = () => {
		navigate('/shop');
	};

	const [accounts, setAccounts] = useState<Account[]>([]);
	const fetchAccountData = async () => {
		try {
			const response = await api.get('account');
			if (response.status === 200) setAccounts(response.data);
		} catch (error: any) {
			console.log(error);
		}
	};

	// 결제하기
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const amountString = data.get('amount'); // '1,000' 형태의 문자열
		if (state.shopId !== '' && amountString != null && typeof amountString === 'string') {
			const amountNumber = parseFloat(amountString.replace(/,/g, ''));
			const paymentReq = {
				sender_account_num: data.get('accountNum'),
				shop_id: state.shopId,
				payment_amount: amountNumber,
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

	useEffect(() => {
		fetchAccountData();
	}, []);

	const { formattedValue, handleValueChange } = useNumberFormat('');
	const [showAccounts, setShowAccounts] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

	const handleAccountSelect = (account: Account) => {
		setSelectedAccount(account);
		setShowAccounts(false); // 선택 후 리스트 숨기기 (선택한 항목을 옆에 표시하면서)
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
							<Button onClick={() => setShowAccounts(!showAccounts)}>
								{showAccounts ? '계좌를 선택해 주세요.' : '결제할 계좌 선택'}
							</Button>
							{showAccounts && (
								<div>
									{accounts.map((account) => (
										<div
											key={account.account_number}
											onClick={() => handleAccountSelect(account)} // 항목을 클릭하면 선택하도록 핸들러 호출
										>
											<AccountSelectList
												key={account.account_number}
												balance={account.balance}
												bankcode={account.bank_code}
												accountNum={account.account_number}
											/>
										</div>
									))}
								</div>
							)}
							{selectedAccount &&
								!showAccounts && ( // 선택한 계좌가 있을 때만 표시
									<div>
										<AccountSelectList
											key={selectedAccount.account_number}
											balance={selectedAccount.balance}
											bankcode={selectedAccount.bank_code}
											accountNum={selectedAccount.account_number}
										/>
									</div>
								)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="amount"
								label="보낼 금액"
								name="amount"
								value={formattedValue}
								onChange={handleValueChange}
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
