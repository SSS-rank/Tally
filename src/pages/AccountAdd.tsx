import React from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import api from '../api/api';
function AccountAdd() {
	type ObjType = {
		[key: string]: string;
	};

	const bankCode: ObjType = {
		경남은행: '039',
		광주은행: '034',
		단위농협: '012',
		부산은행: '032',
		새마을금고: '045',
		신한은행: '088',
		씨티은행: '027',
		우리은행: '020',
		전북은행: '037',
		제주은행: '035',
		카카오뱅크: '090',
		케이뱅크: '089',
		토스뱅크: '092',
		하나은행: '081',
		기업은행: '003',
		국민은행: '004',
		대구은행: '031',
		산업은행: '002',
		농협은행: '011',
		SC제일은행: '023',
		수협은행: '007',
	};
	const defaultTheme = createTheme();
	const navigate = useNavigate();
	const [bankType, setbankType] = React.useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setbankType(event.target.value as string);
	};
	const createAccount = async (reqDto: any) => {
		try {
			const response = await api.post('account', reqDto);
			if (response.status === 201) {
				console.log('계정 생성 성공!');
				window.alert('계좌가 생성 되었습니다!');
				navigate('/main');
			} else {
				console.error('계정 생성 실패:', response.data);
			}
		} catch (error) {
			window.alert('계좌 생성 오류입니다. 다시 생성해주세요');
		}
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const accountCreateReqDto = {
			bank_code: bankCode[bankType],
			account_password: data.get('password'),
		};
		createAccount(accountCreateReqDto);
	};
	const goBack = () => {
		navigate(-1);
	};

	return (
		<ThemeProvider theme={defaultTheme}>
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
						<Grid item xs={4}>
							<ArrowBackIosNewIcon onClick={goBack} />
						</Grid>
						<Grid>
							<Typography component="h1" variant="h5">
								계좌 추가
							</Typography>
						</Grid>
					</Grid>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography>은행 선택</Typography>
								<Select value={bankType} onChange={handleChange}>
									<MenuItem value="신한은행">신한은행</MenuItem>
									<MenuItem value="국민은행">국민은행</MenuItem>
									<MenuItem value="카카오뱅크">카카오뱅크</MenuItem>
								</Select>
							</Grid>
							<Grid item xs={12}>
								<TextField name="name" required fullWidth id="name" label="예금주" autoFocus />
							</Grid>
							<Grid item xs={12}>
								<TextField required fullWidth id="password" label="비밀번호" name="password" />
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							생성하기
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
export default AccountAdd;
