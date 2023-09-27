import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

import { TextStyles } from '../../styles/CommonStyles';

function CategoryListItem() {
	return (
		<TouchableOpacity style={styles.categoryItemView}>
			<View style={styles.textView}>
				<Avatar.Image
					size={50}
					style={styles.categoryImage}
					source={{ uri: `https://sss-tally.s3.ap-northeast-2.amazonaws.com/category_${7}.png` }}
				/>
				<View>
					<Text style={styles.name}>버스</Text>
					<Text style={styles.info}>김싸피, 박싸피</Text>
				</View>
			</View>
			<Text style={styles.text}>12000원</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	categoryItemView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 14,
	},
	categoryImage: {
		backgroundColor: 'transparent',
	},
	textView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	name: {
		...TextStyles({ align: 'left', mLeft: 10, weight: 'bold' }).regular,
	},
	info: {
		...TextStyles({ align: 'left', mLeft: 10, color: '#666666' }).small,
	},
	text: {
		...TextStyles({ align: 'left', mLeft: 10 }).regular,
	},
});

export default CategoryListItem;
