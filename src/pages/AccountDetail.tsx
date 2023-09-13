import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import api from '../api/api';
import AccountDetailListItem from '../components/AccountItem/AccountDetailListItem';
import BankIcon from '../components/BankIcon/BankIcon';

interface Transaction {
	transfer_date: string; //이체날짜
	flag: string; //입금 출금 구분자
	amount: number; //이체금액
	content: string; //통장인자
	transfer_uuid: string; //거래 고유 아이디
}
const defaultTheme = createTheme();
function AccountDetail() {
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};
	const location = useLocation();
	const accountNumber = location.state.accountNum;
	const balance = location.state.balance;
	const bankcode = location.state.bankcode;
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	useEffect(() => {
		const fetchTransactionData = async () => {
			try {
				const transactionReqDto = {
					account_num: accountNumber,
					page: 0,
					limit: 1000,
				};
				const response = await api.post('/transfer/history', transactionReqDto);
				if (response.status === 200) {
					console.log('계좌 내역 조회 성공!');
					console.log(response.data);
					setTransactions(response.data);
				} else {
					console.error('계정 내역 조회 실패:', response.data);
				}
			} catch (error) {
				window.alert('계좌 내역 조회 오류 입니다.');
			}
		};

		fetchTransactionData();
	}, [accountNumber]);
	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<Container sx={{ width: '800px' }}>
				<Box sx={{ mt: 10, mb: 6 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
						<BankIcon code={bankcode} />
						<Typography sx={{ color: '#666', ml: 1 }}>{accountNumber}</Typography>
					</Box>
					<Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
						{balance}원
					</Typography>
				</Box>
				<List sx={{ width: '100%' }}>
					{/* <Grid item spacing={4} xs={12} marginTop={1} mb={10} width="100%"> */}
					{transactions.length > 0 &&
						transactions.map((trans) => (
							<AccountDetailListItem
								transfer_date={trans.transfer_date}
								flag={trans.flag}
								amount={trans.amount}
								content={trans.content}
								key={trans.transfer_uuid}
							/>
						))}

					{transactions.length === 0 && (
						<Box
							sx={{
								textAlign: 'center',
								py: 3,
								borderTop: '1px dashed #d9d9d9',
								borderBottom: '1px dashed #d9d9d9',
							}}
						>
							<Typography sx={{ color: '#666' }}>거래 내역이 없습니다</Typography>
						</Box>
					)}
					{/* </Grid> */}
				</List>
			</Container>
		</ThemeProvider>
	);
}
export default AccountDetail;
