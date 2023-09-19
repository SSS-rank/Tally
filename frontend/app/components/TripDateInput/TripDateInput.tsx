import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Portal, Modal } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';
import { useRecoilState } from 'recoil';

import { TripInfoState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

interface Day {
	dateString: string;
	day: number;
	month: number;
	year: number;
	timestamp: number;
}

const defaultDay: Day = {
	dateString: '날짜를 선택해주세요',
	day: 0,
	month: 0,
	year: 0,
	timestamp: 0,
};

const calendarTheme = {
	todayTextColor: '#0085FF',
};

function TripDateInput() {
	const [startDay, setStartDay] = useState<Day>(defaultDay); // 시작 Day 정보
	const openStartDayCalendar = () => {
		setStartDayModalVisible(true);
	};

	// 시작 날짜 설정  캘린더 visible
	const [startDayModalVisible, setStartDayModalVisible] = useState(false);
	const hideStartModal = () => {
		setStartDayModalVisible(false);
	};

	const [endDay, setEndDay] = useState<Day>(defaultDay); // 종료 Day 정보
	const openEndDayCalendar = () => {
		setEndDayModalVisible(true);
	};

	// 종료 날짜 설정  캘린더 visible
	const [endDayModalVisible, setEndDayModalVisible] = useState(false);
	const hideEndModal = () => {
		setEndDayModalVisible(false);
	};

	// recoil
	const [tripInfo, setTripInfo] = useRecoilState(TripInfoState);
	const changeStartDay = (value: string) => {
		const updatedTripInfo = { ...tripInfo, startDay: value };
		setTripInfo(updatedTripInfo);
	};

	const changeEndDay = (value: string) => {
		const updatedTripInfo = { ...tripInfo, endDay: value };
		setTripInfo(updatedTripInfo);
	};

	return (
		<View style={styles.dateContainer}>
			<TouchableOpacity style={styles.dateView} onPress={openStartDayCalendar}>
				<Text style={styles.input}>{startDay.dateString}</Text>
				<Icon name="calendar-clear-outline" style={styles.calendarIcon} />
			</TouchableOpacity>
			<TouchableOpacity style={styles.dateView} onPress={openEndDayCalendar}>
				<Text style={styles.input}>{endDay.dateString}</Text>
				<Icon name="calendar-clear-outline" style={styles.calendarIcon} />
			</TouchableOpacity>
			<Portal>
				<Modal
					visible={startDayModalVisible}
					onDismiss={hideStartModal}
					contentContainerStyle={styles.modalContainer}
				>
					<View style={styles.modalView}>
						<Calendar
							onDayPress={(day) => {
								setStartDay(day);
								setEndDay(defaultDay);
								changeStartDay(day.dateString);
								hideStartModal();
							}}
							theme={calendarTheme}
						/>
					</View>
				</Modal>
				<Modal
					visible={endDayModalVisible}
					onDismiss={hideEndModal}
					contentContainerStyle={styles.modalContainer}
				>
					<View style={styles.modalView}>
						<Calendar
							onDayPress={(day) => {
								if (day.timestamp >= startDay.timestamp) {
									setEndDay(day);
									changeEndDay(day.dateString);
									hideEndModal();
								}
							}}
							theme={calendarTheme}
						/>
					</View>
				</Modal>
			</Portal>
		</View>
	);
}

const styles = StyleSheet.create({
	dateContainer: {
		flexDirection: 'row',
	},
	dateView: {
		position: 'relative',
		width: '48%',
		marginRight: 15,
	},
	input: {
		borderBottomColor: '#666666',
		borderBottomWidth: 1,
		paddingHorizontal: 15,
		paddingBottom: 10,
		...TextStyles({ align: 'left', color: '#666666' }).regular,
	},
	calendarIcon: {
		color: '#666666',
		fontSize: 20,
		position: 'absolute',
		bottom: 10,
		right: 10,
	},
	modalContainer: {
		width: '100%',
		paddingHorizontal: 20,
	},
	modalView: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 20,
	},
});

export default TripDateInput;
