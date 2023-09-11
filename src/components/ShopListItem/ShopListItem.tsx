import React from 'react';

import { ListItemAvatar, Avatar, ListItem, ListItemText } from '@mui/material';

import ShopCategoryIcon from '../ShopCategoryIcon';

interface shopListItemProps {
	shopName: string;
	shopType: number;
}

function ShopListItem({ shopType, shopName }: shopListItemProps) {
	return (
		<ListItem sx={{ borderBottom: 1, borderColor: '#d9d9d9', paddingY: 2 }}>
			<ListItemAvatar>
				<Avatar sx={{ background: '#95D6FF' }}>
					<ShopCategoryIcon category={shopType} />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={shopName} />
		</ListItem>
	);
}

export default ShopListItem;
