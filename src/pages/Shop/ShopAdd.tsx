import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
	Container,
	Stack,
	Typography,
	Button,
	Box,
	TextField,
	IconButton,
	Modal,
	Grid,
} from '@mui/material';
import axios from 'axios';

import ShopCategoryIcon from '../../components/ShopCategoryIcon';

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '60%',
	bgcolor: 'background.paper',
	borderRadius: 4,
	boxShadow: 24,
	p: 4,
};

// 카테고리 리스트
const shops = [
	{
		shopType: 1,
		shopName: '숙소',
	},
	{
		shopType: 2,
		shopName: '항공',
	},
	{
		shopType: 3,
		shopName: '교통',
	},
	{
		shopType: 4,
		shopName: '관광',
	},
	{
		shopType: 5,
		shopName: '식사',
	},
	{
		shopType: 6,
		shopName: '쇼핑',
	},
	{
		shopType: 7,
		shopName: '기타',
	},
];

function ShopAdd() {
	// modal 조작
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// 카테고리 선택
	const [type, setType] = useState(0);
	const selectShopType = (e: React.MouseEvent<HTMLButtonElement>) => {
		setType(Number(e.currentTarget.dataset.shopType));
		handleClose();
	};

	// shop 이름
	const [shopName, setShopName] = useState('');
	const changeShopName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setShopName(e.target.value);
	};

	const navigate = useNavigate();

	// 등록 취소
	const clickCancleBtn = () => {
		navigate('/shop');
	};

	// shop 등록
	const submitShop = async () => {
		console.log('shop 등록');
		const data = {
			shop_type: type,
			shop_name: shopName,
			shop_nation_code: 'KR',
		};
		const res = await axios.post(`http://localhost:8080/shop`, data);
		console.log(res);
	};

	return (
		<Container sx={{ my: 3, maxWidth: 500 }}>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
				<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
					SHOP 등록
				</Typography>
				<IconButton onClick={clickCancleBtn}>
					<CloseIcon />
				</IconButton>
			</Stack>
			<Stack direction="column" alignItems="flex-start">
				<TextField
					fullWidth
					type="text"
					id="outlined-basic"
					label="이름"
					variant="outlined"
					name="shop_name"
					onChange={changeShopName}
					value={shopName}
				/>
				<Box sx={{ my: 4 }}>
					<Typography variant="h6">카테고리</Typography>
					<IconButton
						sx={{
							background: '#7BC6F6',
							color: '#fff',
							borderRadius: 2,
							mr: 2,
							':hover': {
								background: '#1976d2',
							},
						}}
						onClick={handleOpen}
					>
						{type === 0 ? <AddIcon /> : <ShopCategoryIcon category={type} />}
					</IconButton>
				</Box>
			</Stack>
			<Button
				component="label"
				variant="contained"
				fullWidth
				sx={{
					background: '#7BC6F6',
					boxShadow: 'none',
					my: 3,
					borderRadius: 2,
					':hover': {
						boxShadow: 'none',
					},
				}}
				onClick={submitShop}
			>
				등록하기
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography id="modal-modal-title" variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
						카테고리 선택
					</Typography>
					<Grid container spacing={3}>
						{shops.map((shop, index) => (
							<Grid item xs={4} key={index}>
								<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
									<IconButton
										sx={{
											background: '#95D6FF',
											color: '#fff',
											borderRadius: 2,
											':hover': {
												background: '#1976d2',
											},
										}}
										data-shop-type={shop.shopType}
										onClick={selectShopType}
									>
										<ShopCategoryIcon category={shop.shopType} />
									</IconButton>
									<Typography sx={{ fontWeight: 'bold', mt: 1 }}>{shop.shopName}</Typography>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			</Modal>
		</Container>
	);
}

export default ShopAdd;
