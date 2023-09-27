import React, { useCallback } from 'react';
import { View, Text } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { AnalysisCategoryScreenProps } from '../../model/tripNavigator';

function AnalysisCategoryScreen({ navigation, route }: AnalysisCategoryScreenProps) {
	useFocusEffect(
		useCallback(() => {
			navigation.setOptions({ title: route.params.title });
		}, []),
	);
	return (
		<View>
			<Text>상세 카테고리 페이지</Text>
		</View>
	);
}

export default AnalysisCategoryScreen;
