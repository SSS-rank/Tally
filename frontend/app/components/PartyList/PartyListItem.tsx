import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';

import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';
import Icon from 'react-native-vector-icons/Ionicons';
interface partyItemprops {
	name: string;
	img: AvatarImageSource;
	self: boolean;
}
function PartyListItem(props: partyItemprops) {
	const [payCheck, setPayCheck] = useState(false);
	const [involveCheck, setInvolveCheck] = useState(false);
	const [amount, setAmount] = useState('');
	return (
		<View style={styles.partyItem}>
			<View style={styles.profile_group}>
				<Avatar.Image size={32} source={props.img} style={styles.profile_img} />
				<Text>{props.name}</Text>
			</View>

			<View style={styles.input_group}>
				<TextInput
					value={amount}
					onChangeText={(input) => {
						setAmount(input);
						console.log(amount);
					}}
					returnKeyType="next"
					style={[styles.textInput, props.self ? { color: 'gray' } : null]}
				/>
				<Text>원</Text>
				<Icon
					name={payCheck ? 'checkmark-circle' : 'checkmark-circle-outline'}
					size={32}
					color={payCheck ? '#91C0EB' : '#D0D0D0'}
					style={{ marginLeft: 5 }}
					onPress={() => {
						setPayCheck(!payCheck);
					}}
				/>
				<Icon
					name={involveCheck ? 'checkmark-circle' : 'checkmark-circle-outline'}
					size={32}
					color={involveCheck ? '#91C0EB' : '#D0D0D0'}
					style={{ marginLeft: 5 }}
					onPress={() => {
						setInvolveCheck(!involveCheck);
					}}
				/>
			</View>
		</View>
	);
}
export default PartyListItem;

const styles = StyleSheet.create({
	profile_img: {
		marginRight: 10,
	},
	profile_group: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,
	},
	input_group: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	partyItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textInput: {
		backgroundColor: 'white',
		borderBottomWidth: 1,
	},
});
