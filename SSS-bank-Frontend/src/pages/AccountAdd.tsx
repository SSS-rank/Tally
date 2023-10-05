import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import api from '../api/api';
import BankIcon from '../components/BankIcon/BankIcon';
import BankCode from '../Data/BankCode';

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

function AccountAdd() {
	const defaultTheme = createTheme();
	const navigate = useNavigate();
	const [bankName, setbankName] = React.useState('');

	const createAccount = async (reqDto: any) => {
		try {
			const response = await api.post('account', reqDto);
			if (response.status === 201) {
				window.alert('계좌가 생성 되었습니다!');
				window.location.replace('/main');
			} else {
				console.error('계정 생성 실패:', response.data);
			}
		} catch (error: any) {
			if (error.response.status == 401) {
				window.location.replace('/main');
			} else {
				window.alert('계좌 생성 실패');
			}
		}
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const accountCreateReqDto = {
			bank_code: BankCode[bankName],
			account_password: data.get('password'),
		};
		createAccount(accountCreateReqDto);
	};
	const goBack = () => {
		navigate(-1);
	};

	// modal 조작
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// 은행 선택
	const selectBank = (e: React.MouseEvent<HTMLButtonElement>) => {
		setbankName(String(e.currentTarget.dataset.bankName));
		handleClose();
	};

	const [pwd, setPwd] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

	const checkPasswordMatch = (password: string, confirmedPassword: string) => {
		if (password === confirmedPassword) {
			setPasswordMatch(true);
		} else {
			setPasswordMatch(false);
		}
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPwd(e.target.value);
		checkPasswordMatch(e.target.value, confirmPassword);
	};

	const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
		checkPasswordMatch(pwd, e.target.value);
	};

	const isFormValid = bankName && pwd && confirmPassword && passwordMatch && pwd.length == 4;

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						height: 'calc(100vh - 169px)',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Grid container alignItems="center">
						<Grid item flexGrow={1}>
							<Typography component="h1" variant="h5" align="center">
								계좌 추가
							</Typography>
						</Grid>
					</Grid>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography sx={{ marginBottom: '0.5rem' }}>은행 선택</Typography>
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
								<Typography sx={{ marginBottom: '0.5rem', marginTop: '1rem' }}>
									사용할 비밀번호 4글자를 입력하세요.
								</Typography>
								<TextField
									required
									fullWidth
									id="password"
									label="비밀번호"
									name="password"
									variant="standard"
									type="password"
									value={pwd}
									onChange={handlePasswordChange}
									inputProps={{ maxLength: 4 }}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="password"
									label="비밀번호 확인"
									name="password"
									variant="standard"
									type="password"
									value={confirmPassword}
									onChange={handleConfirmPasswordChange}
									inputProps={{ maxLength: 4 }}
								/>
								{confirmPassword && passwordMatch === true && pwd.length == 4 && (
									<Typography style={{ color: 'blue' }}>비밀번호가 일치합니다.</Typography>
								)}
								{confirmPassword && passwordMatch === false && pwd.length == 4 && (
									<Typography style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</Typography>
								)}
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disabled={!isFormValid}
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
							생성하기
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
}
export default AccountAdd;
