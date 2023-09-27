import React from 'react';
import { View, Text } from 'react-native';

import { AnalysisCategoryScreenProps } from '../../model/tripNavigator';

function AnalysisCategoryScreen({ route }: AnalysisCategoryScreenProps) {
	console.log(route.params);
	return (
		<View>
			<Text>상세 카테고리 페이지</Text>
		</View>
	);
}

export default AnalysisCategoryScreen;
