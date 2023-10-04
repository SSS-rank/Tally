import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
	ListItemAvatar,
	Avatar,
	ListItem,
	ListItemText,
	ListItemButton,
	Button,
} from '@mui/material';

import ShopCategoryIcon from '../ShopCategoryIcon';

interface shopListItemProps {
	shopId: number;
	shopName: string;
	shopType: number;
	shopNationCode: string;
}

function ShopListItem({ shopId, shopType, shopName, shopNationCode }: shopListItemProps) {
	const navigate = useNavigate();
	const modifyItem = () => {
		navigate('/shop/form', {
			state: {
				isModify: true,
				shopId: shopId,
				shopType: shopType,
				shopName: shopName,
				shopNationCode: shopNationCode,
			},
		});
	};

	// 결제
	const clickPayment = () => {
		navigate(`/payment`, {
			state: {
				shopId: shopId,
			},
		});
	};
	return (
		<ListItem
			sx={{
				borderBottom: 1,
				borderColor: '#d9d9d9',
				paddingY: 2,
				cursor: 'pointer',
				':hover': {
					background: '#efefef',
				},
			}}
		>
			<ListItemButton
				onClick={modifyItem}
				sx={{
					':hover': {
						background: 'transparent',
					},
				}}
			>
				<ListItemAvatar>
					<Avatar sx={{ background: '#95D6FF' }}>
						<ShopCategoryIcon category={shopType} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary={shopName} />
			</ListItemButton>
			<Button size="small" onClick={clickPayment}>
				결제
			</Button>
		</ListItem>
	);
}

export default ShopListItem;
