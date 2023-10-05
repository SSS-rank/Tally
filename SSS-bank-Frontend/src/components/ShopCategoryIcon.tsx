import React from 'react';

import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalPlayIcon from '@mui/icons-material/LocalPlay';
import PendingIcon from '@mui/icons-material/Pending';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

interface ShopCategoryIconProps {
	category: number;
}

function ShopCategoryIcon({ category }: ShopCategoryIconProps): any {
	let icon = null;

	if (category === 1) icon = <HotelIcon />; // 숙소
	else if (category === 2) icon = <FlightIcon />; // 항공
	else if (category === 3) icon = <DirectionsBusIcon />; // 교통
	else if (category === 4) icon = <LocalPlayIcon />; // 관광
	else if (category === 5) icon = <RestaurantIcon />; // 식사
	else if (category === 6) icon = <ShoppingBasketIcon />; // 쇼핑
	else icon = <PendingIcon />; // 기타

	return icon;
}

export default ShopCategoryIcon;
