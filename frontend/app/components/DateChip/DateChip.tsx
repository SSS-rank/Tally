import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Chip } from 'react-native-paper';

import { TextStyles } from '../../styles/CommonStyles';
interface DateChipProps {
	date: Date;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function DateChip({ date, open, setOpen, setDate }: DateChipProps) {
	return (
		<View style={styles.date_box}>
			<Text style={TextStyles({ align: 'left', mBottom: 5 }).regular}>날짜 선택</Text>
			<Chip style={styles.chip} onPress={() => setOpen(true)}>
				{date.getFullYear() +
					'년 ' +
					(date.getMonth() + 1) +
					'월 ' +
					date.getDate() +
					'일 ' +
					date.getHours() +
					'시 ' +
					date.getMinutes() +
					'분 '}
			</Chip>
			<DatePicker
				modal
				open={open}
				date={date}
				onConfirm={(p_date) => {
					setOpen(false);
					setDate(p_date);
				}}
				onCancel={() => {
					setOpen(false);
				}}
			/>
		</View>
	);
}
export default DateChip;
const styles = StyleSheet.create({
	date_box: {
		paddingTop: 30,
		// flex: 2,
		// justifyContent: 'flex-start',
	},
	chip: {
		backgroundColor: 'transparent',
		borderBottomWidth: 0.5,
		borderBottomColor: '#A0A0A0',
		borderRadius: 0,
	},
	inputBox: {
		borderBottomColor: '#A0A0A0',
		borderBottomWidth: 0.5,
		marginVertical: 5,
		justifyContent: 'center',
		// alignItems: 'center',

		// width: '100%',
		flex: 3,
		verticalAlign: 'middle',
	},
});
