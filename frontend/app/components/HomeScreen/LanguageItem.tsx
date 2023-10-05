import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { TranslateInfo } from '../../model/translate';
import { TextStyles } from '../../styles/CommonStyles';

interface LanguageItemProp {
	language: string;
	language_code: string;
	cur_language_code: string;
	setter: ({ language, language_code }: TranslateInfo) => void;
	modalSetter: (status: boolean) => void;
}

function LanguageItem({
	language,
	language_code,
	cur_language_code,
	setter,
	modalSetter,
}: LanguageItemProp) {
	const handleOnPress = () => {
		setter({ language, language_code });
		modalSetter(false);
	};
	return (
		<TouchableOpacity style={styles.itemContainer} onPress={handleOnPress}>
			{language_code === cur_language_code && (
				<>
					<Text style={styles.textBold}>{language}</Text>
					<Icon name="check" size={30} color="#91C0EB" />
				</>
			)}
			{language_code !== cur_language_code && (
				<>
					<Text style={styles.text}>{language}</Text>
				</>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	text: {
		...TextStyles({ align: 'left' }).regular,
	},
	textBold: {
		...TextStyles({ align: 'left', weight: 'bold', color: '#91C0EB' }).regular,
	},
});

export default LanguageItem;
