import React, { RefObject, useState, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';
import { Button } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { HomeStackProps } from './../../navigation/HomeStack';
import bankApi from '../../api/bankApi';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { AccountResgistReq } from '../../model/account';
import {
	accountResgistReqState,
	tallyAccountListState,
	transferPasswordState,
} from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

type AuthAccountScreenProps = NativeStackScreenProps<HomeStackProps, 'AuthAccount'>;

function AuthAccountScreen({ navigation, route }: AuthAccountScreenProps) {
	const input1: RefObject<TextInput> = useRef<TextInput>(null);
	const input2: RefObject<TextInput> = useRef<TextInput>(null);
	const input3: RefObject<TextInput> = useRef<TextInput>(null);
	const input4: RefObject<TextInput> = useRef<TextInput>(null);

	const [first, setFirst] = useState('');
	const [second, setSecond] = useState('');
	const [third, setThird] = useState('');
	const [last, setLast] = useState('');

	const { accountNumber, bankCode }: any = route.params;
	const verifyTransfer = async () => {
		console.log(route.params);
		if (accountNumber !== undefined) {
			console.log(accountNumber);

			const verifyData = {
				account_num: accountNumber,
				code: `${first}${second}${third}${last}`,
			};

			try {
				const res = await bankApi.post(`/transfer/1transfer-verify`, verifyData);

				if (res.status === 200) {
					console.log(res.data);

					// TODO : 첫 등록 여부에 따라 계좌 등록 다르게 처리하기
					registerAccount(res.data);
				}
			} catch (error: any) {
				console.error(error.response.data.errorMessage);
			}
		}
	};

	const api = useAxiosWithAuth();
	const accountListState = useRecoilValue(tallyAccountListState);
	const setAccountRegistInfo = useSetRecoilState(accountResgistReqState);
	const transferPassword = useRecoilValue(transferPasswordState);

	const registerAccount = async (password: string) => {
		console.log('accountListState.length ', accountListState.length);

		console.log(accountListState.length);

		if (accountListState.length === 0) {
			setAccountRegistInfo({
				account_number: accountNumber,
				bank_code: bankCode,
				order_number: 1,
				account_password: password,
			});
			navigation.navigate('TransferPassword');
		} else {
			const accountResgisterReq: AccountResgistReq = {
				account_number: accountNumber,
				bank_code: bankCode,
				order_number: accountListState.length + 1,
				account_password: password,
				transfer_password: transferPassword,
			};

			try {
				const res = await api.post(`/account`, accountResgisterReq);
				console.log(res.data);
				console.log(res.status);

				if (res.status === 200) {
					navigation.navigate('Account');
				}
			} catch (error: any) {
				console.log(error.response.data.errorMessage);
			}
		}
	};

	return (
		<View style={styles.viewContainer}>
			<Text style={{ ...TextStyles({ align: 'left', weight: 'bold', mBottom: 5 }).title }}>
				인증하신 계좌로 1원을 입금하였습니다.
			</Text>
			<Text style={{ ...TextStyles({ align: 'left', mBottom: 10, color: '#666666' }).regular }}>
				입금내역에 표시된 숫자 4자리를 입력해주세요.
			</Text>
			<Image
				style={styles.img}
				source={{ uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/1won.png' }}
			/>
			<View style={styles.sectionView}>
				<View style={styles.inputBox}>
					<TextInput
						style={styles.input}
						value={first}
						keyboardType="number-pad"
						textAlign="center"
						autoFocus={true}
						ref={input1}
						blurOnSubmit={false}
						onChangeText={(input: string) => {
							setFirst(input);
							if (input !== '') input2.current?.focus();
						}}
					/>
					<TextInput
						style={styles.input}
						value={second}
						keyboardType="number-pad"
						textAlign="center"
						ref={input2}
						onChangeText={(input: string) => {
							setSecond(input);
							if (input !== '') input3.current?.focus();
						}}
					/>
					<TextInput
						style={styles.input}
						value={third}
						keyboardType="number-pad"
						textAlign="center"
						ref={input3}
						onChangeText={(input: string) => {
							setThird(input);
							if (input !== '') input4.current?.focus();
						}}
					/>
					<TextInput
						style={styles.input}
						value={last}
						onChangeText={setLast}
						keyboardType="number-pad"
						textAlign="center"
						ref={input4}
					/>
				</View>
				<Button mode="elevated" style={styles.button} textColor="#ffffff" onPress={verifyTransfer}>
					확인
				</Button>
				<Text
					style={{
						...TextStyles({ align: 'center', color: '#666666', mTop: 10 }).small,
					}}
				>
					입금내역이 없다면 등록하신 계좌 정보를 다시 확인해주세요.
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flexGrow: 1,
		backgroundColor: 'white',
		paddingHorizontal: 15,
	},
	sectionView: {
		flexGrow: 1,
		justifyContent: 'flex-start',
	},
	inputBox: {
		flexDirection: 'row',
		marginTop: 30,
		marginBottom: 60,
		justifyContent: 'space-around',
	},
	input: {
		...TextStyles().regular,
		flex: 1,
		borderWidth: 2,
		borderRadius: 16,
		borderColor: '#91C0EB',
		marginHorizontal: 20,
	},
	img: {
		alignSelf: 'center',
		width: '90%',
		height: '40%',
		resizeMode: 'contain',
	},
	button: {
		backgroundColor: '#91C0EB',
		shadowColor: 'transparent',
	},
});
export default AuthAccountScreen;
