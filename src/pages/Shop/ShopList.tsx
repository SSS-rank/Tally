import React from 'react';

import { Icon } from '@iconify/react';
// @mui
import ImageIcon from '@mui/icons-material/Image';
import {
	Alert,
	Stack,
	Button,
	Container,
	Typography,
	List,
	ListItemIcon,
	ListItemAvatar,
	Avatar,
	ListItem,
	ListItemText,
	Divider,
} from '@mui/material';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';

import ShopListItem from '../../components/Shop/ShopListItem';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'No' },
	{ field: 'shopCategory', headerName: '분류' },
	{ field: 'shopName', headerName: '상호명' },
];

const rows = [
	{ id: 1, shopCategory: 1, shopName: '롯데월드 호텔' },
	{ id: 3, shopCategory: 6, shopName: '자라' },
	{ id: 4, shopCategory: 5, shopName: '바스버거' },
	{ id: 5, shopCategory: 6, shopName: '올리브영' },
	{ id: 2, shopCategory: 5, shopName: '돼지통' },
	{ id: 6, shopCategory: 3, shopName: '고속버스' },
];

export default function ShopPage() {
	const [message, setMessage] = React.useState('');

	const handleRowClick: GridEventListener<'rowClick'> = (params) => {
		setMessage(`Movie "${params.row.id}" clicked`);
	};
	return (
		<Container>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
				<Typography variant="h4" gutterBottom>
					Shop
				</Typography>
				<Button variant="contained" startIcon={<Icon icon="eva:plus-fill" />}>
					Add Shop
				</Button>
			</Stack>
			<div style={{ height: '100%', width: '100%' }}>
				<List
					sx={{
						width: '100%',
						maxWidth: 360,
						bgcolor: 'background.paper',
					}}
				>
					{rows.map((row, index) => (
						<ShopListItem key={index} shopCategory={row.shopCategory} shopName={row.shopName} />
					))}
				</List>
			</div>
			{message && <Alert severity="info">{message}</Alert>}
		</Container>
	);
}
