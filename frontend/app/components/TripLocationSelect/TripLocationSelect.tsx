import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { useRecoilState } from 'recoil';

import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { TripInfoState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

interface tripLocationSelectItem {
	label: string;
	value: string;
}

function TripLocationSelect() {
	const [openTripType, setOpenTripType] = useState(false);
	const [tripType, setTripType] = useState(''); // 국내(domestic) , 해외(overseas) 여부
	const [tripTypeItems, setTripTypeItems] = useState<tripLocationSelectItem[]>([
		{ label: '국내', value: 'state' },
		{ label: '해외', value: 'global' },
	]);

	// 해외 선택 시 국가
	const [openCountry, setOpenCountry] = useState(false);
	const [country, setCountry] = useState(0);
	const [tripCountryItems, setTripCountryItems] = useState<tripLocationSelectItem[]>([]);

	// 국내 선택 시 도
	const [openState, setOpenState] = useState(false);
	const [state, setState] = useState(0);
	const [tripStateItems, setTripStateItems] = useState<tripLocationSelectItem[]>([]);

	// recoil
	const [tripInfo, setTripInfo] = useRecoilState(TripInfoState);

	useEffect(() => {
		if (tripType === 'state') {
			getState();
			setCountry(0);
		} else if (tripType === 'global') {
			setTripCountryItems([
				{ label: '일본', value: 'japan' },
				{ label: '태국', value: 'taiwan' },
			]);
			setState(0);
			setCity(0);
		}
	}, [tripType]);

	const api = useAxiosWithAuth();
	const getState = async () => {
		try {
			const res = await api.get(`/destination/state`);

			if (res.status === 200) {
				const states: tripLocationSelectItem[] = res.data.map((item: any) => ({
					label: item.state_name,
					value: item.state_id,
				}));

				setTripStateItems(states);
			}
		} catch (error) {
			console.error(error);
		}
	};

	// 국내 선택 시 도시
	const [openCity, setOpenCity] = useState(false);
	const [city, setCity] = useState(0);
	const [tripCityItems, setTripCityItems] = useState<tripLocationSelectItem[]>([]);

	useEffect(() => {
		if (state !== 0) {
			setTripCityItems([]);
			setCity(0);
			getCity();
		}
	}, [state]);

	const getCity = async () => {
		try {
			const res = await api.get(`/destination/city?code=${state}`);

			if (res.status === 200) {
				const cities: tripLocationSelectItem[] = res.data.map((item: any) => ({
					label: item.city_name,
					value: item.city_id,
				}));

				if (cities.length !== 0) setTripCityItems(cities);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const changeTripType = (value: any) => {
		const updatedTripInfo = {
			...tripInfo,
			type: value,
		};
		setTripInfo(updatedTripInfo);
	};

	const changeCountry = (value: any) => {
		const updatedTripInfo = { ...tripInfo, location: value, type: 'global' };
		setTripInfo(updatedTripInfo);
	};

	const changeState = (value: any) => {
		const updatedTripInfo = { ...tripInfo, location: value, type: 'state' };
		setTripInfo(updatedTripInfo);
	};
	const changeCity = (value: any) => {
		const updatedTripInfo = { ...tripInfo, location: value, type: 'city' };
		setTripInfo(updatedTripInfo);
	};

	return (
		<View>
			<DropDownPicker
				open={openTripType}
				value={tripType}
				items={tripTypeItems}
				setOpen={setOpenTripType}
				setValue={setTripType}
				setItems={setTripTypeItems}
				style={styles.selectInput}
				textStyle={styles.text}
				placeholder="선택해 주세요"
				zIndex={3000}
				zIndexInverse={1000}
				onChangeValue={changeTripType}
			/>
			{tripType === 'state' && (
				<DropDownPicker
					open={openState}
					value={state}
					items={tripStateItems}
					setOpen={setOpenState}
					setValue={setState}
					setItems={setTripStateItems}
					style={styles.domesticInput}
					textStyle={styles.text}
					placeholder="선택해 주세요"
					zIndex={2000}
					zIndexInverse={2000}
					onChangeValue={changeState}
				/>
			)}
			{tripType === 'state' && tripCityItems.length !== 0 && (
				<DropDownPicker
					open={openCity}
					value={city}
					items={tripCityItems}
					setOpen={setOpenCity}
					setValue={setCity}
					setItems={setTripCityItems}
					style={styles.domesticInput}
					textStyle={styles.text}
					placeholder="선택해 주세요"
					zIndex={1000}
					zIndexInverse={3000}
					onChangeValue={changeCity}
				/>
			)}
			{tripType === 'global' && (
				<DropDownPicker
					open={openCountry}
					value={country}
					items={tripCountryItems}
					setOpen={setOpenCountry}
					setValue={setCountry}
					setItems={setTripCountryItems}
					style={styles.domesticInput}
					textStyle={styles.text}
					placeholder="선택해 주세요"
					zIndex={2000}
					zIndexInverse={2000}
					onChangeValue={changeCountry}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	selectInput: {
		borderWidth: 0,
		borderBottomWidth: 1,
		marginBottom: 20,
	},
	text: {
		...TextStyles({ align: 'left' }).regular,
	},
	domesticView: {
		justifyContent: 'flex-start',
	},
	domesticInput: {
		borderWidth: 0,
		borderBottomWidth: 1,
		marginBottom: 20,
	},
});

export default TripLocationSelect;
