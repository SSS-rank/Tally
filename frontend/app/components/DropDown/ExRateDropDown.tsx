import React, { useState, FC, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import exRateApi from '../../api/exRateApi';
import { TextStyles } from '../../styles/CommonStyles';

interface ExRateDropDownProps {
	open: boolean;
	value: string;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

const ExRateDropDown: FC<ExRateDropDownProps> = (props) => {
	const { open, value, setOpen, setValue } = props;
	const [items, setItems] = useState<{ label: string; value: string }[]>([]);
	const formatExchangeData = (data: any[]) => {
		return data.map((item) => ({
			label: item.cur_nm,
			value: item.deal_bas_r + ':' + item.cur_unit + '(' + item.cur_nm.split(' ')[0] + ')',
		}));
	};
	const getCurrentDate = (): string => {
		const today = new Date();
		const year = today.getFullYear();
		const month = (today.getMonth() + 1).toString().padStart(2, '0');
		const day = today.getDate().toString().padStart(2, '0');
		return `${year}${month}${day}`;
	};
	async function checkExRate() {
		// const params = { searchdate: getCurrentDate() };
		// 공휴일은 제공을 안하는 것으로 확인되어 임시로 20230927로 하드코딩
		const params = { searchdate: 20230927 };

		const res = await exRateApi.get('', { params });
		if (res) {
			const exData = formatExchangeData(res.data);
			setItems(exData);
		}
	}
	useEffect(() => {
		checkExRate();
	}, []);

	return (
		<DropDownPicker
			open={open}
			value={value}
			items={items}
			setOpen={setOpen}
			setValue={setValue}
			setItems={setItems}
			textStyle={TextStyles().medium}
			placeholder="화폐 단위 선택"
			zIndex={10000}
			zIndexInverse={1000}
		/>
	);
};

export default ExRateDropDown;
