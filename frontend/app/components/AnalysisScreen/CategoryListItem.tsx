import React, { useState } from 'react';
import {
	TouchableOpacity,
	View,
	StyleSheet,
	Text,
	Modal,
	Pressable,
	TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Avatar, Button } from 'react-native-paper';

import CategoryInfo from './CatgoryInfo';
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
	const [modalVisible, setModalVisible] = useState(false);
	const [openCategory, setOpenCategory] = useState(false);
	const [category, setCategory] = useState(category_id);
	const [categoryItem, setCategoryItem] = useState<any[]>([
		{ label: '숙소', value: 1 },
		{ label: '항공', value: 2 },
		{ label: '교통', value: 3 },
		{ label: '관광', value: 4 },
		{ label: '식사', value: 5 },
		{ label: '쇼핑', value: 6 },
		{ label: '기타', value: 7 },
	]);

	return (
		<TouchableOpacity style={styles.categoryContainer} onPress={() => setModalVisible(true)}>
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
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<Pressable
					style={{ backgroundColor: '#00000070', flex: 1 }}
					onPress={() => setModalVisible(!modalVisible)}
				/>
				<View style={styles.modalView}>
					<CategoryInfo label="사용 내역" value={payment_title} />
					<CategoryInfo label="결제 금액" value={my_money} />
					<CategoryInfo label="카테고리" value="">
						<DropDownPicker
							max={50}
							style={styles.dropdown}
							containerStyle={{ width: '60%' }}
							textStyle={{ ...TextStyles({ align: 'left' }).regular }}
							open={openCategory}
							value={category}
							items={categoryItem}
							setOpen={setOpenCategory}
							setValue={setCategory}
							setItems={setCategoryItem}
							zIndex={3000}
							zIndexInverse={1000}
						/>
					</CategoryInfo>

					<Button
						mode="contained"
						buttonColor="#91C0EB"
						textColor="white"
						style={{ marginVertical: 15 }}
					>
						변경
					</Button>
				</View>
			</Modal>
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
	modalView: {
		bottom: 0,
		// height: '50%',
		width: '100%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: 'white',
		padding: 35,
		position: 'absolute',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		justifyContent: 'center',
	},
	inputBox: {
		alignItems: 'center',
		borderBottomColor: '#A0A0A0',
		borderBottomWidth: 0.5,
		flexDirection: 'row',
		marginVertical: 5,
		marginTop: 50,
	},
	dropdown: {
		borderWidth: 0,
		borderBottomWidth: 1,
		paddingHorizontal: 15,
	},
});

export default CategoryListItem;
