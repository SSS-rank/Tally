import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import api from '../../api/api';
import DeleteAccountModal from '../Modal/DeleteAccountModal';
interface accountListItemProps {
	balance: number;
	bankcode: string;
	accountNum: string;
}

function AccountListItem({ balance, bankcode, accountNum }: accountListItemProps) {
	const navigate = useNavigate();

	const accountNumRef = useRef<HTMLDivElement | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const handleAccountClick = () => {
		const accountNumElement = accountNumRef.current;

		if (accountNumElement) {
			const accountNumValue = accountNumElement.innerText;

			console.log('클릭된 Typography의 값:', accountNumValue);
			navigate(`/accountdetail/${accountNumValue}`);
		}
	};
	const handleDeleteAccount = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleDeleteConfirm = async (password: string) => {
		try {
			const accountDeleteReqDto = {
				bank_code: { bankcode }.bankcode,
				account_num: { accountNum }.accountNum,
				account_password: password,
			};
			console.log(accountDeleteReqDto);
			const response = await api.patch('account', accountDeleteReqDto);

			if (response.status === 200) {
				console.log('계좌 삭제 성공!');
				navigate('/main');
			} else {
				console.error('계정 삭제 실패:', response.data);
			}
		} catch (error) {
			window.alert('계좌 삭제 오류 입니다.');
		}

		handleCloseModal();
	};

	return (
		<Grid item xs={12}>
			<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flexGrow: 1 }} onClick={handleAccountClick}>
					<Typography gutterBottom variant="h5" component="h2" id="accountNum" ref={accountNumRef}>
						{accountNum}
					</Typography>
					<Typography>{balance}원</Typography>
				</CardContent>
				<CardActions sx={{ alignSelf: 'flex-end', marginTop: 'auto' }}>
					<Button size="small" href="/transfer">
						이체
					</Button>
					<Button size="small" onClick={handleDeleteAccount}>
						삭제
					</Button>
				</CardActions>
			</Card>
			<DeleteAccountModal
				open={modalOpen}
				handleClose={handleCloseModal}
				handleDelete={handleDeleteConfirm}
			/>
		</Grid>
	);
}

export default AccountListItem;
