import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { useRecoilValue } from 'recoil';

import { CurTripInfoState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

function AnalysisScreen() {
	const curTripInfo = useRecoilValue(CurTripInfoState);
	return (
		<View style={styles.viewContainer}>
			<View style={styles.topView}>
				<View style={styles.top}>
					<Text style={styles.title}>{curTripInfo.title}</Text>
					<Text style={styles.info}>{curTripInfo.location}</Text>
				</View>
				<Text style={styles.info}>
					{curTripInfo.startDay} ~ {curTripInfo.endDay}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		padding: 15,
		backgroundColor: '#ffffff',
	},
	topView: {},
	top: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginBottom: 5,
	},
	title: {
		...TextStyles({ align: 'left', weight: 'bold', mRight: 5 }).title,
	},
	info: {
		...TextStyles({ align: 'left', color: '#666666' }).small,
	},
});

export default AnalysisScreen;
