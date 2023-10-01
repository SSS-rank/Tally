import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
	block: boolean; //
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
		<TouchableOpacity style={styles.partyItem} disabled={props.block}>
			<View style={styles.profile_group}>
				<Avatar.Image size={48} source={props.img} style={styles.profile_img} />
				<Text style={styles.nickname}>{props.name}</Text>
				{props.isPayer ? <Text style={styles.prayer}>결제자</Text> : null}
			</View>

			<View style={styles.input_group}>
				<View style={styles.textInputView}>
					<TextInput
						value={amount}
						onChangeText={(input) => {
							handleAmountChange(input);
						}}
						returnKeyType="next"
						placeholder={amount + ''}
						style={styles.textInput}
						disabled={props.block}
					/>
					<Text style={styles.text_won}>원</Text>
				</View>
				<Icon
					name={involveCheck ? 'checkmark-circle' : 'checkmark-circle-outline'}
					size={32}
					color={involveCheck ? '#91C0EB' : '#D0D0D0'}
					style={{ marginLeft: 5 }}
					onPress={() => {
						setInvolveCheck(!involveCheck);
						handleInVolveChange();
					}}
					disabled={props.block}
				/>
			</View>
		</TouchableOpacity>
	);
}
export default PartyListItem;

const styles = StyleSheet.create({
	profile_img: {
		marginRight: 10,
	},
	nickname: {
		...TextStyles({ align: 'left', mRight: 5, weight: 'bold' }).regular,
	},
	prayer: {
		...TextStyles({ color: '#666666' }).small,
	},
	profile_group: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	input_group: {
		flexDirection: 'row',
		alignItems: 'center',
		// backgroundColor: 'blue',
	},
	partyItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	textInputView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	textInput: {
		backgroundColor: '#ffffff',
		borderBottomColor: 'rgba(102, 102, 102, 0.4)',
		borderBottomWidth: 1,
		height: 40,
		...TextStyles({ align: 'left' }).regular,
	},
	text_won: {
		...TextStyles({ align: 'left', mRight: 10 }).regular,
	},
});
