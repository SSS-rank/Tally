import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TextStyles } from '../../styles/CommonStyles';
import { ViewStyles } from '../../styles/HomeStyles';
function PassportButton({ navigation }: any) {
	return (
		<TouchableOpacity
			style={ViewStyles().bannerButton}
			onPress={() => navigation.navigate('Stamp')}
		>
			<Text
				style={{
					...TextStyles({ align: 'left', color: 'white', weight: 'bold' }).regular,
					textAlignVertical: 'center',
				}}
			>
				MY PASSPORT
			</Text>
			<MaterialIcon
				name="arrow-right-thin"
				size={32}
				style={{ color: 'white', textAlignVertical: 'center' }}
			/>
			<MaterialIcon
				name="passport"
				size={40}
				style={{ color: 'white', flex: 1, textAlign: 'right', textAlignVertical: 'center' }}
			/>
		</TouchableOpacity>
	);
}
export default PassportButton;
