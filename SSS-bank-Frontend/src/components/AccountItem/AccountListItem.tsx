import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import api from '../../api/api';
import bankName from '../../Data/BankName';
import BankIcon from '../BankIcon/BankIcon';

interface accountListItemProps {
	balance: number;
	bankcode: string;
	accountNum: string;
}

function AccountListItem({ balance, bankcode, accountNum }: accountListItemProps) {
	const navigate = useNavigate();

	const accountNumRef = useRef<HTMLDivElement | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [password, setPassword] = useState('');
	const handleAccountClick = () => {
		const accountNumElement = accountNumRef.current;

		if (accountNumElement) {
			const accountNumValue = accountNumElement.innerText;

			console.log('클릭된 Typography의 값:', accountNumValue);
			navigate(`/accountdetail`, {
				state: { accountNum: accountNumValue, balance: balance, bankcode: bankcode },
			});
		}
	};
	const handleCopyClipBoard = () => {
		const accountNumElement = accountNumRef.current;
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

	const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};
	const handleDeleteAccount = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleDeleteConfirm = async () => {
		try {
			const accountDeleteReqDto = {
				bank_code: { bankcode }.bankcode,
				account_num: { accountNum }.accountNum,
				account_password: password,
			};
			console.log(accountDeleteReqDto);
			const res = await api.patch('account', accountDeleteReqDto);
			if (res.status === 200) {
				window.location.replace('/main');
			}
		} catch (error: any) {
			console.log(error);
			if (error.response.status == 401) {
				window.location.replace('/main');
			} else {
				window.alert('계좌 삭제 실패');
			}
		}

		handleCloseModal();
	};
	const clickTransfer = () => {
		navigate(`/transfer`, {
			state: {
				senderAccountNum: accountNum,
			},
		});
	};

	const formattedBalance = balance.toLocaleString();

	return (
		<Grid item xs={12}>
			<Card
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
					':hover': {
						cursor: 'pointer',
						background: '#efefef',
					},
				}}
			>
				<CardContent sx={{ flexGrow: 1 }} onClick={handleAccountClick}>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
						<BankIcon code={bankcode} />
						<Typography
							gutterBottom
							variant="h6"
							component="h2"
							id="accountNum"
							ref={accountNumRef}
							sx={{ ml: 1, mb: 0, fontFamily: 'OTWelcomeRA' }}
						>
							{bankName[bankcode]}
						</Typography>
						<Typography
							gutterBottom
							variant="h6"
							component="h2"
							id="accountNum"
							ref={accountNumRef}
							sx={{ ml: 1, mb: 0, fontWeight: 'bold', fontFamily: 'OTWelcomeRA' }}
						>
							{accountNum}
						</Typography>
					</Box>
					<Typography>{formattedBalance}원</Typography>
				</CardContent>
				<CardActions
					sx={{
						alignSelf: 'flex-end',
						marginTop: 'auto',
						position: 'absolute',
						top: '50%',
						fontFamily: 'OTWelcomeRA',
					}}
				>
					<Button size="small" onClick={clickTransfer}>
						이체
					</Button>
					<Button size="small" onClick={handleDeleteAccount}>
						삭제
					</Button>
					<Button size="small" onClick={handleCopyClipBoard}>
						계좌 번호 복사
					</Button>
				</CardActions>
			</Card>
			<Modal
				open={modalOpen}
				onClose={handleCloseModal}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
						maxWidth: 400,
						width: '90%',
						textAlign: 'center',
					}}
				>
					<h2 id="modal-title">계좌 삭제</h2>
					<p id="modal-description">정말로 계좌를 삭제하시겠습니까?</p>
					<TextField
						label="비밀번호"
						type="password"
						variant="outlined"
						fullWidth
						value={password}
						onChange={handleChangePassword}
						sx={{ mb: 2 }}
					/>
					<Button variant="contained" onClick={handleDeleteConfirm}>
						삭제
					</Button>
					<Button variant="contained" onClick={handleCloseModal} sx={{ ml: 2 }}>
						취소
					</Button>
				</Box>
			</Modal>
		</Grid>
	);
}

export default AccountListItem;
