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
		const input_date = getCurrentDate();
		console.log(input_date);
		const params = { search_date: getCurrentDate() };
		const res = await exRateApi.get('', { params });
		if (res) {
			console.log();
			const exData = formatExchangeData(res.data);
			const tmp = exData.map((item) => {
				return item.value.split(':')[1];
			});
			console.log(tmp);
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
			placeholder="국가를 선택하세요"
			zIndex={10000}
			zIndexInverse={1000}
		/>
	);
};

export default ExRateDropDown;
