import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';

import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';
import Icon from 'react-native-vector-icons/Ionicons';

import { TextStyles } from '../../styles/CommonStyles';
interface partyItemprops {
	amount: number;
	name: string;
	img: AvatarImageSource;
	involveCheck: boolean;
	isPayer: boolean;
	onAmountChange: (amount: string) => void;
	onInvolveChange: (involveCheck: boolean) => void;
}
function PartyListItem(props: partyItemprops) {
	const [involveCheck, setInvolveCheck] = useState(props.involveCheck);
	const [amount, setAmount] = useState(props.amount + '');
	const handleAmountChange = (input: string) => {
		setAmount(input); // 입력값 업데이트
		props.onAmountChange(input); // 상위 컴포넌트로 입력값 전달
	};
	const handleInVolveChange = () => {
		props.onInvolveChange(!involveCheck);
	};
	return (
		<View style={styles.partyItem}>
			<View style={styles.profile_group}>
				<Avatar.Image size={32} source={props.img} style={styles.profile_img} />
				<Text style={(TextStyles().small, { marginRight: 5 })}>{props.name}</Text>
				{props.isPayer ? <Text style={TextStyles().small}>결제자</Text> : null}
			</View>

			<View style={styles.input_group}>
				<TextInput
					value={amount}
					onChangeText={(input) => {
						handleAmountChange(input);
					}}
					returnKeyType="next"
					placeholder={amount + ''}
					style={styles.textInput}
				/>
				<Text>원</Text>

				<Icon
					name={involveCheck ? 'checkmark-circle' : 'checkmark-circle-outline'}
					size={32}
					color={involveCheck ? '#91C0EB' : '#D0D0D0'}
					style={{ marginLeft: 5 }}
					onPress={() => {
						setInvolveCheck(!involveCheck);
						handleInVolveChange();
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
