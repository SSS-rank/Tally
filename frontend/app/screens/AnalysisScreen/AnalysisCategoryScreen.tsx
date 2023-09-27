import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import CategoryListItem from '../../components/AnalysisScreen/CategoryListItem';
import DashLine from '../../components/DashLine';
import { AnalysisCategoryScreenProps } from '../../model/tripNavigator';
import { TextStyles } from '../../styles/CommonStyles';

function AnalysisCategoryScreen({ navigation, route }: AnalysisCategoryScreenProps) {
	useFocusEffect(
		useCallback(() => {
			navigation.setOptions({ title: route.params.title });
		}, []),
	);
	return (
		<View style={styles.viewContainer}>
			<Text style={styles.title}>25900원</Text>
			<DashLine />
			<CategoryListItem />
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		padding: 15,
		backgroundColor: '#ffffff',
	},
	title: {
		...TextStyles({ align: 'left', weight: 'bold', mBottom: 30 }).title,
	},
});

export default AnalysisCategoryScreen;
