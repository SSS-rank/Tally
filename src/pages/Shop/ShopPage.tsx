import React from 'react';

import { Icon } from '@iconify/react';
// @mui
import { Alert, Stack, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'No' },
	{ field: 'shopCategory', headerName: '분류' },
	{ field: 'shopName', headerName: '상호명' },
];

const rows = [
	{ id: 1, shopCategory: 'Snow', shopName: 'Jon' },
	{ id: 2, shopCategory: 'Snow', shopName: 'Jon' },
	{ id: 3, shopCategory: 'Snow', shopName: 'Jon' },
	{ id: 4, shopCategory: 'Snow', shopName: 'Jon' },
	{ id: 5, shopCategory: 'Snow', shopName: 'Jon' },
	{ id: 6, shopCategory: 'Snow', shopName: 'Jon' },
	{ id: 7, shopCategory: 'Snow', shopName: 'Jon' },
	{ id: 8, shopCategory: 'Snow', shopName: 'Jon' },
	{ id: 9, shopCategory: 'Snow', shopName: 'Jon' },
	{ id: 10, shopCategory: 'Snow', shopName: 'Jon' },
	{ id: 11, shopCategory: 'Snow', shopName: 'Jon' },
	{ id: 12, shopCategory: 'Snow', shopName: 'Jon' },
	{ id: 13, shopCategory: 'Snow', shopName: 'Jon' },
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
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 10 },
						},
					}}
					// pageSizeOptions={[5, 10]}
					checkboxSelection={false}
					onRowClick={handleRowClick}
				/>
			</div>
			{message && <Alert severity="info">{message}</Alert>}
		</Container>
	);
}
