import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

import { categoryListItem } from '../../model/analysis';
import { TextStyles } from '../../styles/CommonStyles';

interface listItem extends categoryListItem {
	category_id: number;
}

function CategoryListItem({
	category_id,
	payment_korea_date,
	payment_uuid,
	payment_title,
	tag_member,
	total_money,
	my_money,
}: listItem) {
	return (
		<TouchableOpacity style={styles.categoryContainer}>
			<View style={styles.categoryItemView}>
				<View style={styles.textView}>
					<Avatar.Image
						size={50}
						style={styles.categoryImage}
						source={{
							uri: `https://sss-tally.s3.ap-northeast-2.amazonaws.com/category_${category_id}.png`,
						}}
					/>
					<View>
						<Text style={styles.name}>{payment_title}</Text>
						<Text style={styles.info}>{tag_member}</Text>
						<Text style={{ marginLeft: 12 }}>{payment_korea_date}</Text>
					</View>
				</View>
				<View>
					<Text style={styles.text}>{my_money}원</Text>
					<Text style={styles.totalMoney}>{total_money}원</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	categoryContainer: {
		marginVertical: 14,
	},
	categoryItemView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	categoryImage: {
		backgroundColor: 'transparent',
	},
	textView: {
		flex: 1,
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
		...TextStyles({ align: 'left', mLeft: 10, weight: 'bold' }).regular,
	},
	totalMoney: {
		...TextStyles({ align: 'right', mLeft: 10, color: '#666666' }).small,
	},
});

export default CategoryListItem;
