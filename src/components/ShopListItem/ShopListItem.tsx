import React from 'react';

import { ListItemAvatar, Avatar, ListItem, ListItemText, Divider } from '@mui/material';

import ShopCategoryIcon from '../ShopCategoryIcon';

interface shopListItemProps {
	shopName: string;
	shopCategory: number;
}

function ShopListItem({ shopCategory, shopName }: shopListItemProps) {
	return (
		<ListItem sx={{ borderBottom: 1, borderColor: '#d9d9d9', paddingY: 2 }}>
			<ListItemAvatar>
				<Avatar sx={{ background: '#95D6FF' }}>
					<ShopCategoryIcon category={shopCategory} />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={shopName} />
		</ListItem>
	);
}

export default ShopListItem;
