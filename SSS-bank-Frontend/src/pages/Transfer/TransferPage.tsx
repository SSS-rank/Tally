import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import api from '../../api/api';
import BankIcon from '../../components/BankIcon/BankIcon';
import BankCode from '../../Data/BankCode';
import userNumberFormat from '../../hooks/useNumberFormat';
import useNumberFormat from '../../hooks/useNumberFormat';

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '60%',
	bgcolor: 'background.paper',
	borderRadius: 4,
	boxShadow: 24,
	p: 4,
};

const banks = ['신한은행', '우리은행', '카카오뱅크', '토스뱅크', '국민은행', '농협은행'];

const Transfer = () => {
	const defaultTheme = createTheme();
	const navigate = useNavigate();
	const { state } = useLocation();
	const [bankName, setbankName] = useState(''); // 은행 이름

	// 이체하기
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (confirm(`이체 하시겠습니까?`)) {
			const data = new FormData(event.currentTarget);
			const req = {
				sender_account_num: state.senderAccountNum,
				receiver_account_num: data.get('accountNum'),
				deposit_amount: data.get('amount'),
				withdraw_account_content: data.get('withdrawAccountContent'),
				deposit_account_content: data.get('depositAccountContent'),
				account_password: data.get('accountPassword'),
				bank_code: BankCode[bankName],
			};

			// console.log(req);
			try {
				const res = await api.post(`/transfer/deposit`, req);
				if (res.status === 200) {
					alert('이체가 완료되었습니다.');
					navigate('/main');
				}
			} catch (error: any) {
				console.log(error);
				if (error.response.status == 401) {
					window.location.replace('/main');
				} else {
					window.alert('이체 실패');
				}
			}
		}
	};
	const goBack = () => {
		navigate(-1);
	};

	// modal 조작
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const selectBank = (e: React.MouseEvent<HTMLButtonElement>) => {
		setbankName(String(e.currentTarget.dataset.bankName));
		handleClose();
	};

	const { formattedValue, handleValueChange } = useNumberFormat('');

	return (
		<ThemeProvider theme={defaultTheme}>
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
							계좌 이체
						</Typography>
						<IconButton onClick={goBack}>
							<CloseIcon />
						</IconButton>
					</Stack>
					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography sx={{ fontWeight: 'bold', mb: 1 }}>은행 선택</Typography>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									{bankName !== '' ? (
										<BankIcon code={BankCode[bankName]} />
									) : (
										<AccountBalanceIcon />
									)}
									<TextField
										name="bankName"
										id="bankName"
										required
										fullWidth
										value={bankName}
										placeholder="은행을 선택해주세요"
										aria-readonly={true}
										onClick={handleOpen}
										sx={{ ml: 2 }}
									/>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<TextField
									name="accountNum"
									id="accountNum"
									required
									fullWidth
									label="계좌번호 입력"
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
									value={formattedValue}
									onChange={handleValueChange}
								/>
							</Grid>
							<Grid item xs={12} sx={{ mt: 6 }}>
								<TextField
									required
									fullWidth
									id="withdrawAccountContent"
									label="나에게 표시"
									name="withdrawAccountContent"
									variant="standard"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="depositAccountContent"
									label="받는분에게 표시"
									name="depositAccountContent"
									variant="standard"
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
							이체하기
						</Button>
					</Box>
				</Box>

				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={modalStyle}>
						<Typography id="modal-modal-title" variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
							은행 선택
						</Typography>
						<Grid container spacing={3}>
							{banks.map((bank, index) => (
								<Grid item xs={4} key={index}>
									<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
										<IconButton
											sx={{
												background: '#fff',
												color: '#fff',
												borderRadius: 2,
												':hover': {
													background: '#1976d2',
												},
											}}
											data-bank-type={BankCode[bank]}
											data-bank-name={bank}
											onClick={selectBank}
										>
											<BankIcon code={BankCode[bank]} />
										</IconButton>
										<Typography sx={{ fontWeight: 'bold', mt: 1 }}>{bank}</Typography>
									</Box>
								</Grid>
							))}
						</Grid>
					</Box>
				</Modal>
			</Container>
		</ThemeProvider>
	);
};
export default Transfer;
