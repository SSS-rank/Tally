import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import bankName from '../../Data/BankName';
import BankIcon from '../BankIcon/BankIcon';

interface accountListItemProps {
	balance: number;
	bankcode: string;
	accountNum: string;
}

function AccountSelectList({ balance, bankcode, accountNum }: accountListItemProps) {
	const accountNumRef = useRef<HTMLDivElement | null>(null);

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
				<CardContent sx={{ flexGrow: 1 }}>
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
							sx={{ ml: 2, mb: 0, fontWeight: 'bold' }}
						>
							{accountNum}
						</Typography>
					</Box>
					<Typography>{formattedBalance}원</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default AccountSelectList;
