import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import BankIcon from '../BankIcon/BankIcon';

interface accountListItemProps {
	balance: number;
	bankcode: string;
	accountNum: string;
}

function AccountListItem({ balance, bankcode, accountNum }: accountListItemProps) {
	const navigate = useNavigate();

	const accountNumRef = useRef<HTMLDivElement | null>(null);
	const handleAccountClick = () => {
		const accountNumElement = accountNumRef.current;

		if (accountNumElement) {
			const accountNumValue = accountNumElement.innerText;

			console.log('클릭된 Typography의 값:', accountNumValue);
			navigate(`/accountdetail/${accountNumValue}`);
		}
	};

	const clickTransfer = () => {
		navigate(`/transfer`, {
			state: {
				senderAccountNum: accountNum,
			},
		});
	};

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
							sx={{ ml: 2, mb: 0, fontWeight: 'bold' }}
						>
							{accountNum}
						</Typography>
					</Box>
					<Typography>{balance}원</Typography>
				</CardContent>
				<CardActions
					sx={{ alignSelf: 'flex-end', marginTop: 'auto', position: 'absolute', top: '50%' }}
				>
					<Button size="small" onClick={clickTransfer}>
						이체
					</Button>
					<Button size="small">삭제</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}

export default AccountListItem;
