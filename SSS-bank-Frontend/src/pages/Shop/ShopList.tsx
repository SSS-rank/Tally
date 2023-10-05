import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@iconify/react';
// @mui
import { Stack, Button, Container, Typography, List } from '@mui/material';

import api from '../../api/api';
import ShopListItem from '../../components/ShopListItem/ShopListItem';

interface Shop {
	shop_id: number;
	shop_type: number;
	shop_name: string;
	shop_nation_code: string;
}

export default function ShopPage() {
	const [shops, setShops] = useState<Shop[]>([]);
	const navigate = useNavigate();

	const getShops = async () => {
		try {
			const res = await api.get('/shop');
			if (res.status === 200) {
				setShops(res.data);
			}
		} catch (error: any) {
			if (error.response.status == 401) {
				window.location.replace('/main');
			} else {
				window.alert('shop 조회 실패');
			}
		}
	};

	useEffect(() => {
		getShops();
	}, []);

	const clickShopAddBtn = () => {
		navigate('/shop/form', {
			state: {
				isModify: false,
			},
		});
	};

	return (
		<Container sx={{ my: 3 }}>
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
					onClick={clickShopAddBtn}
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
					{shops.map((shop) => (
						<ShopListItem
							key={shop.shop_id}
							shopId={shop.shop_id}
							shopType={shop.shop_type}
							shopName={shop.shop_name}
							shopNationCode={shop.shop_nation_code}
						/>
					))}
				</List>
			</div>
		</Container>
	);
}
