import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { Avatar } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';
import Icon from 'react-native-vector-icons/Ionicons';

import { SelectPayMember } from '../../model/payment';
import numberWithCommas from '../../services/NumberWithCommas';
import removeCommaAndParseInt from '../../services/removeCommaAndParseInt';
import { TextStyles } from '../../styles/CommonStyles';
interface partyItemprops {
	memberUuid: string;
	amount: number;
	name: string;
	img: AvatarImageSource;
	involveCheck: boolean;
	isPayer: boolean;
	block: boolean; //
	onAmountChange: (amount: string) => void;
	onInvolveChange: (involveCheck: boolean) => void;
	setTagedMemberCount: (prevState: number | ((prevState: number) => number)) => void;
	setPartyMembers: (
		partyMembers: SelectPayMember[] | ((prevState: SelectPayMember[]) => SelectPayMember[]),
	) => void;
	setIsDivideMode?: (status: boolean) => void;
}
function PartyListItem(props: partyItemprops) {
	// console.log(
	// 	'name ',
	// 	props.name,
	// 	' amount ',
	// 	props.amount + '',
	// 	' involveCheck ',
	// 	props.involveCheck,
	// 	' isPayer ',
	// 	props.isPayer,
	// );
	const [involveCheck, setInvolveCheck] = useState(props.involveCheck);
	const [amount, setAmount] = useState(props.amount + '');
	const handleAmountChange = (input: string) => {
		const removed_input = removeCommaAndParseInt(input);
		// const parsedInput = parseFloat(removed_input);
		if (props.setIsDivideMode !== undefined) props.setIsDivideMode(false);

		if (!isNaN(removed_input)) {
			setAmount(removed_input.toString());
			props.onAmountChange(removed_input.toString());
		} else {
			setAmount('0');
			props.onAmountChange('0');
		}
		// setAmount(input); // 입력값 업데이트
		// props.onAmountChange(input); // 상위 컴포넌트로 입력값 전달
	};
	const handleInVolveChange = () => {
		// console.log(`handleInVolveChange ${props.name} ${involveCheck}`);
		if (props.setIsDivideMode !== undefined) props.setIsDivideMode(true);
		if (involveCheck) {
			props.setTagedMemberCount((prev) => {
				// console.log('setTagedMemberCount minus');
				return prev - 1;
			});
		} else
			props.setTagedMemberCount((prev) => {
				// console.log('setTagedMemberCount plus');
				return prev + 1;
			});
		props.onInvolveChange(!involveCheck);

		props.setPartyMembers((prevMembers: SelectPayMember[]) => {
			const updatedInvolveState = prevMembers.map((member: SelectPayMember) => {
				if (member.member_uuid === props.memberUuid) {
					return {
						...member,
						checked: !involveCheck,
					};
				} else {
					return { ...member };
				}
			});
			// console.log('updatedInvolveState 22', updatedInvolveState);
			return updatedInvolveState;
		});
	};

	useEffect(() => {
		// console.log('partyItem amount useEffect');
		setAmount(numberWithCommas(props.amount + ''));
	}, [props.amount]);

	return (
		<TouchableOpacity
			style={styles.partyItem}
			disabled={props.block}
			onPress={() => {
				setInvolveCheck(!involveCheck);
				handleInVolveChange();
			}}
		>
			<View style={styles.profile_group}>
				<Avatar.Image size={36} source={props.img} style={styles.profile_img} />
				<Text style={styles.nickname}>{props.name}</Text>
				{props.isPayer ? <Text style={styles.prayer}>결제자</Text> : null}
			</View>
			<TextInput
				style={styles.priceTextInput}
				value={amount === '0' ? '' : amount}
				onChangeText={(input) => {
					handleAmountChange(input);
				}}
				returnKeyType="next"
				keyboardType="numeric"
				selectionColor="#91C0EB"
				placeholder={amount + ''}
				editable={involveCheck && !props.block}
			/>
			<Text style={{ ...TextStyles({ align: 'left', mRight: 10 }).regular, lineHeight: 23 }}>
				원
			</Text>
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
		</TouchableOpacity>
	);
}
export default PartyListItem;

const styles = StyleSheet.create({
	profile_img: {
		marginRight: 10,
	},
	nickname: {
		...TextStyles({ align: 'left', mRight: 5 }).regular,
		lineHeight: 23,
	},
	prayer: {
		...TextStyles({ color: '#FFFFFF' }).small,
		backgroundColor: '#91C0EB',
		borderRadius: 10,
		paddingHorizontal: 4,
		paddingTop: 1,
		paddingBottom: 3,
		verticalAlign: 'middle',
		textAlignVertical: 'center',
	},
	profile_group: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	partyItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 5,
	},
	priceTextInput: {
		...TextStyles({ align: 'right' }).regular,
		minWidth: 50,
		// flex: 1,
	},
});
