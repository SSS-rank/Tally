import React, { useState, FC } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { TextStyles } from '../../styles/CommonStyles';

interface CustomDropDownProps {
	open: boolean;
	value: string;
	items: { label: string; value: string }[];
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	setItems: React.Dispatch<React.SetStateAction<{ label: string; value: string }[]>>;
	zIndex: number;
}

const CustomDropDown: FC<CustomDropDownProps> = (props) => {
	const { open, value, items, setOpen, setValue, setItems, zIndex } = props;

	return (
		<View style={styles.dropdownContainer}>
			<DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				textStyle={TextStyles().medium}
				placeholder="날짜"
				style={{ ...styles.selectInput, zIndex }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	selectInput: {
		// 여기에 필요한 스타일을 추가하세요.
	},
	dropdownContainer: {
		// 필요한 스타일을 추가하세요.
		// 예를 들어, 높이를 지정하여 필요할 때 스크롤이 가능하도록 만들 수 있습니다.
	},
});

export default CustomDropDown;
