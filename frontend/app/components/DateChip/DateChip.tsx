import React from 'react';
import { StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Chip, Text } from 'react-native-paper';

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
			<Text style={TextStyles({ align: 'left' }).medium}>날짜 선택</Text>
			<Chip onPress={() => setOpen(true)}>
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
		flex: 2,
		justifyContent: 'flex-start',
		marginTop: 20,
	},
});
