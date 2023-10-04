import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import api from '../api/api';
import clipboard from '../asset/image/icon/clipboard.png';
import AccountDetailListItem from '../components/AccountItem/AccountDetailListItem';
import BankIcon from '../components/BankIcon/BankIcon';
import BankName from '../Data/BankName';

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
	const myLocation = useLocation();
	const accountNumber = myLocation.state.accountNum;
	const balance = myLocation.state.balance;
	const bankcode = myLocation.state.bankcode;
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const handleCopyClipBoard = () => {
		const accountNumElement = accountNumber;
		if (accountNumElement) {
			const accountNumValue = accountNumElement.innerText;
			try {
				navigator.clipboard.writeText(accountNumValue);
				alert('클립보드에 복사되었습니다.');
			} catch (error) {
				alert('클립보드 복사에 실패하였습니다.');
			}
		}
	};

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
					setTransactions(response.data);
				} else {
					console.error('계정 내역 조회 실패:', response.data);
				}
			} catch (error: any) {
				if (error.response.status == 401) {
					window.location.replace('/main');
				} else {
					window.alert('계좌 내역 조회 실패');
				}
			}
		};

		fetchTransactionData();
	}, [accountNumber]);

	const formattedBalance = balance.toLocaleString();
	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<Container sx={{ width: '100%' }}>
				<Box
					sx={{
						mt: 10,
						mb: 3,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						flexDirection: 'row', // 기본 값
						'@media (max-width: 427px)': {
							flexDirection: 'column', // 화면 너비가 425px 이하일 때 column으로 변경
						},
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
						<BankIcon code={bankcode} />
						<Typography sx={{ color: '#666', ml: 1, fontWeight: 'bold' }}>
							{BankName[bankcode]}
						</Typography>
						<Typography sx={{ color: '#666', ml: 1, mr: 1 }}>{accountNumber}</Typography>
						<img
							src={clipboard}
							alt="Clipboard"
							onClick={handleCopyClipBoard}
							style={{ width: '17px', height: '17px' }}
						/>
					</Box>
					<Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
						{formattedBalance}원
					</Typography>
				</Box>
				<List sx={{ width: '100%' }}>
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
				</List>
			</Container>
		</ThemeProvider>
	);
}
export default AccountDetail;
