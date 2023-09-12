import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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
					<Button size="small">삭제</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}

export default AccountListItem;
