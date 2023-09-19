import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { TextStyles } from '../../styles/CommonStyles';

interface tripLocationSelectItem {
	label: string;
	value: string;
}

function TripLocationSelect() {
	const [openTripType, setOpenTripType] = useState(false);
	const [tripType, setTripType] = useState(''); // 국내(domestic) , 해외(overseas) 여부
	const [tripTypeItems, setTripTypeItems] = useState<tripLocationSelectItem[]>([
		{ label: '국내', value: 'domestic' },
		{ label: '해외', value: 'overseas' },
	]);

	// 해외 선택 시 국가
	const [openCountry, setOpenCountry] = useState(false);
	const [country, setCountry] = useState('');
	const [tripCountryItems, setTripCountryItems] = useState<tripLocationSelectItem[]>([]);

	// 국내 선택 시 도
	const [openArea, setOpenArea] = useState(false);
	const [area, setArea] = useState('');
	const [tripAreaItems, setTripAreaItems] = useState<tripLocationSelectItem[]>([]);

	useEffect(() => {
		if (tripType === 'domestic') {
			setTripAreaItems([
				{ label: '서울', value: 'seoul' },
				{ label: '부산', value: 'busan' },
			]);
		} else if (tripType === 'overseas') {
			setTripCountryItems([
				{ label: '일본', value: 'japan' },
				{ label: '태국', value: 'taiwan' },
			]);
		}
	}, [tripType]);

	// 국내 선택 시 도시
	const [openCity, setOpenCity] = useState(false);
	const [city, setCity] = useState('');
	const [tripCityItems, setTripCityItems] = useState<tripLocationSelectItem[]>([]);

	useEffect(() => {
		if (area !== '') {
			setTripCityItems([
				{ label: '강남', value: 'gangnam' },
				{ label: '잠실', value: 'samsil' },
			]);
		}
	}, [area]);

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
			/>
			{tripType === 'domestic' && (
				<DropDownPicker
					open={openArea}
					value={area}
					items={tripAreaItems}
					setOpen={setOpenArea}
					setValue={setArea}
					setItems={setTripAreaItems}
					style={styles.domesticInput}
					textStyle={styles.text}
					placeholder="선택해 주세요"
					zIndex={2000}
					zIndexInverse={2000}
				/>
			)}
			{tripType === 'domestic' && area !== '' && (
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
				/>
			)}
			{tripType === 'overseas' && (
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
