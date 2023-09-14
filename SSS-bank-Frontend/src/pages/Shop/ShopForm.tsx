import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
	Select,
	MenuItem,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import api from '../../api/api';
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
	const [shopType, setShopType] = useState(0);
	const selectShopType = (e: React.MouseEvent<HTMLButtonElement>) => {
		setShopType(Number(e.currentTarget.dataset.shopType));
		handleClose();
	};

	// shop 이름
	const [shopName, setShopName] = useState('');
	const changeShopName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setShopName(e.target.value);
	};

	const navigate = useNavigate();

	// 입력값 유효성 검사
	const validate = (type: number, name: string) => {
		if (!type || !name) {
			alert('값을 입력해주세요!');
			return false;
		}

		return true;
	};

	// 등록 취소
	const clickCancleBtn = () => {
		navigate('/shop');
	};

	// shop 등록
	const [shopCountryCode, setShopCountryCode] = useState('');
	const submitShop = async () => {
		console.log('shop 등록');
		if (confirm('등록하시겠습니까?')) {
			const data = {
				shop_type: shopType,
				shop_name: shopName,
				shop_nation_code: shopCountryCode,
			};

			if (!validate(shopType, shopName)) return; // 유효성 검사

			const res = await api.post(`/shop`, data);
			console.log(res);

			if (res.status === 200) {
				alert('등록되었습니다');
			}
		}
	};

	// 등록 or 수정인지 구분
	const { state } = useLocation();

	// 수정일 경우 기본 값 불러오기
	useEffect(() => {
		if (state.isModify) {
			setShopType(state.shopType);
			setShopName(state.shopName);
			setShopCountryCode(state.shopNationCode);
		}
	}, [state]);

	// shop 수정
	const modifyShop = async () => {
		console.log('shop 수정');
		if (confirm('수정하시겠습니까?')) {
			const data = {
				shop_id: state.shopId,
				shop_type: shopType,
				shop_name: shopName,
			};

			if (!validate(shopType, shopName)) return; // 유효성 검사

			const res = await api.patch(`/shop`, data);
			console.log(res);

			if (res.status === 200) {
				alert('수정되었습니다');
				navigate('/shop');
			}
		}
	};

	// 국가 불러오기
	interface Country {
		country_code: string;
		country_name: string;
	}
	const [countries, setCountries] = useState<Country[]>([]);

	const getCountry = async () => {
		const res = await api.get(`/country`);
		setCountries(res.data);
	};
	useEffect(() => {
		if (countries.length === 0) getCountry();
	}, [countries]);

	const handleChange = (e: SelectChangeEvent<string>) => {
		console.log(e);
		setShopCountryCode(e.target.value);
	};

	const findCountryName = (code: string) => {
		const country = countries.filter((con: Country) => con.country_code === code);
		console.log(country[0].country_name);
		return country[0].country_name;
	};

	return (
		<Container sx={{ my: 3, maxWidth: 500 }}>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
				<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
					{state.isModify ? 'SHOP 수정' : 'SHOP 등록'}
				</Typography>
				<IconButton onClick={clickCancleBtn}>
					<CloseIcon />
				</IconButton>
			</Stack>
			<Stack direction="column" alignItems="flex-start">
				<Box sx={{ my: 2, width: '100%' }}>
					<Typography>국가 선택</Typography>
					<Select fullWidth onChange={handleChange} value={shopCountryCode}>
						{countries.length !== 0 &&
							shopCountryCode === '' &&
							countries.map((country) => (
								<MenuItem
									key={country.country_code}
									value={country.country_code}
									data-country-name={country.country_name}
								>
									{country.country_name}
								</MenuItem>
							))}
						{countries.length !== 0 && shopCountryCode !== '' && (
							<MenuItem key={shopCountryCode} value={shopCountryCode} selected={true}>
								{findCountryName(shopCountryCode)}
							</MenuItem>
						)}
					</Select>
				</Box>
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
						{shopType === 0 ? <AddIcon /> : <ShopCategoryIcon category={shopType} />}
					</IconButton>
				</Box>
			</Stack>
			{state.isModify ? (
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
					onClick={modifyShop}
				>
					수정하기
				</Button>
			) : (
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
			)}

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
