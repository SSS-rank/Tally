import React, { useRef, useState } from 'react';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

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
	return (
		<Grid
			marginY={6}
			borderBottom="1px solid #d9d9d9"
			container
			direction="row"
			wrap="nowrap"
			width="100%"
			paddingBottom={1}
		>
			<Grid item xs={3}>
				<Typography>{transfer_date}</Typography>
			</Grid>
			<Grid item xs zeroMinWidth>
				<Typography noWrap>{content}</Typography>
			</Grid>
			<Grid item xs={3} textAlign={'right'}>
				<Typography>{flag}</Typography>
				<Typography>{amount}</Typography>
			</Grid>
		</Grid>
	);
}

export default AccountDetailListItem;
