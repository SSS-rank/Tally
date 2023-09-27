import React, { useRef, useState } from 'react';

import PaidIcon from '@mui/icons-material/Paid';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

interface accountDetailListItemProps {
	transfer_date: string;
	flag: string;
	amount: number;
	content: string;
}

function AccountDetailListItem({
	transfer_date,
	content,
	amount,
	flag,
}: accountDetailListItemProps) {
	const formattedBalance = amount.toLocaleString();

	return (
		<ListItem
			sx={{
				marginY: 6,
				borderBottom: '1px solid #d9d9d9',
				direction: 'row',
				width: '100%',
				pb: 3,
				px: 2,
			}}
		>
			<ListItemAvatar>
				<Avatar sx={{ background: '#95D6FF' }}>
					<PaidIcon />
				</Avatar>
			</ListItemAvatar>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					mr: 'auto',
					ml: 2,
				}}
			>
				<Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{content}</Typography>
				<Typography sx={{ color: '#777' }}>{transfer_date}</Typography>
			</Box>
			<Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
				{flag === '출금' ? `-${formattedBalance}원` : `${formattedBalance}원`}{' '}
			</Typography>
		</ListItem>
	);
}

export default AccountDetailListItem;
