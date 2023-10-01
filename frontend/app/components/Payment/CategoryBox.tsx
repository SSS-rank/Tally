import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TextStyles } from '../../styles/CommonStyles';
interface CategoryBoxProps {
	selectedcategory: number;
	setSelectedCategory: React.Dispatch<React.SetStateAction<number>>;
}

function CategoryBox({ selectedcategory, setSelectedCategory }: CategoryBoxProps) {
	return (
		<View style={styles.category_box}>
			<Text style={TextStyles({ align: 'left' }).medium}>카테고리</Text>
			<View style={styles.category_line}>
				<TouchableOpacity style={styles.icon_group} onPress={() => setSelectedCategory(1)}>
					<MIcon name="home" size={40} color={selectedcategory === 1 ? '#91C0EB' : 'gray'} />
					<Text style={TextStyles().small}>숙소</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.icon_group} onPress={() => setSelectedCategory(2)}>
					<FIcon name="plane" size={40} color={selectedcategory === 2 ? '#91C0EB' : 'gray'} />
					<Text style={TextStyles().small}>항공</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.icon_group} onPress={() => setSelectedCategory(3)}>
					<FIcon name="car" size={40} color={selectedcategory === 3 ? '#91C0EB' : 'gray'} />
					<Text style={TextStyles().small}>교통</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.icon_group} onPress={() => setSelectedCategory(4)}>
					<MIcon name="ticket" size={40} color={selectedcategory === 4 ? '#91C0EB' : 'gray'} />
					<Text style={TextStyles().small}>관광</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.icon_group} onPress={() => setSelectedCategory(5)}>
					<MIcon
						name="silverware-fork-knife"
						size={40}
						color={selectedcategory === 5 ? '#91C0EB' : 'gray'}
					/>
					<Text style={TextStyles().small}>식사</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.icon_group} onPress={() => setSelectedCategory(6)}>
					<MIcon name="shopping" size={40} color={selectedcategory === 6 ? '#91C0EB' : 'gray'} />
					<Text style={TextStyles().small}>쇼핑</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.icon_group} onPress={() => setSelectedCategory(7)}>
					<MIcon
						name="dots-horizontal-circle"
						size={40}
						color={selectedcategory === 7 ? '#91C0EB' : 'gray'}
					/>
					<Text style={TextStyles().small}>기타</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	category_line: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		padding: 10,
	},

	category_box: {
		marginTop: 20,
		flex: 2,
		flexDirection: 'column',
		paddingBottom: 20,
	},
	icon_group: {
		flexDirection: 'column',
	},
});
export default CategoryBox;
