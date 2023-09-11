import React, { useState, useEffect } from 'react';

import { Icon } from '@iconify/react';
// @mui
import { Stack, Button, Container, Typography, List } from '@mui/material';
import axios from 'axios';

import ShopListItem from '../../components/ShopListItem/ShopListItem';

// TODO : 가짜 데이터 바꾸기
const rows = [
	{ id: 1, shopCategory: 1, shopName: '롯데월드 호텔' },
	{ id: 3, shopCategory: 6, shopName: '자라' },
	{ id: 4, shopCategory: 5, shopName: '바스버거' },
	{ id: 5, shopCategory: 6, shopName: '올리브영' },
	{ id: 2, shopCategory: 5, shopName: '돼지통' },
	{ id: 6, shopCategory: 3, shopName: '고속버스' },
];

export default function ShopPage() {
	const [shops, setShops] = useState([]);

	const getShops = async () => {
		const res = await axios.get('/shop');
		console.log(res);
	};

	useEffect(() => {
		getShops();
	}, []);

	return (
		<Container sx={{ my: 3, maxWidth: 500 }}>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
				<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
					SHOP 목록
				</Typography>
				<Button
					variant="contained"
					startIcon={<Icon icon="eva:plus-fill" />}
					sx={{
						borderRadius: 6,
						background: '#7BC6F6',
						boxShadow: 'none',
						':hover': {
							boxShadow: 'none',
						},
					}}
				>
					SHOP 등록
				</Button>
			</Stack>
			<div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
				<List
					sx={{
						width: '100%',
						bgcolor: 'background.paper',
					}}
				>
					{rows.map((row, index) => (
						<ShopListItem key={index} shopCategory={row.shopCategory} shopName={row.shopName} />
					))}
				</List>
			</div>
		</Container>
	);
}
