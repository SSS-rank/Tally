import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';
import { Button } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeStackProps } from './../../navigation/HomeStack';
import bankApi from '../../api/bankApi';
import { TextStyles } from '../../styles/CommonStyles';

type AuthAccountScreenProps = NativeStackScreenProps<HomeStackProps, 'AuthAccount'>;

function AuthAccountScreen({ route }: AuthAccountScreenProps) {
	const [first, setFirst] = useState('');
	const [second, setSecond] = useState('');
	const [third, setThird] = useState('');
	const [last, setLast] = useState('');

	const handleFirstInput = (value: string) => {
		console.log('first ', value);
		setFirst(value);
		if (first !== '') {
			// TODO : 다음으로 포커스 이동
			console.log('포커스 이동');
		}
	};

	const handleSecondInput = (value: string) => {
		console.log('second ', value);
		setSecond(value);
		if (first !== '') {
			// TODO : 다음으로 포커스 이동
			console.log('포커스 이동');
		}
	};

	const handleThirdInput = (value: string) => {
		console.log('third ', value);
		setThird(value);
		if (first !== '') {
			// TODO : 다음으로 포커스 이동
			console.log('포커스 이동');
		}
	};

	const handleLastInput = (value: string) => {
		console.log('last ', value);
		setLast(value);
		if (first !== '') {
			// TODO : 다음으로 포커스 이동
			console.log('포커스 이동');
		}
	};

	const verifyTransfer = async () => {
		console.log(route.params);
		const { accountNumber, bankCode }: any = route.params;
		if (accountNumber !== undefined) {
			console.log(accountNumber);

			const verifyData = {
				account_num: accountNumber,
				code: `${first}${second}${third}${last}`,
			};

			console.log(verifyData);

			try {
				const res = await bankApi.post(`/transfer/1transfer-verify`, verifyData);

				if (res.status === 200) {
					console.log(res.data);

					// TODO : 첫 등록 여부에 따라 계좌 등록 다르게 처리하기
				}
			} catch (error: any) {
				console.error(error.response.data.errorMessage);
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
			<Image style={styles.img} source={require('../../assets/images/1won.png')} />
			<View style={styles.sectionView}>
				<View style={styles.inputBox}>
					<TextInput
						style={styles.input}
						value={first}
						onChangeText={handleFirstInput}
						keyboardType="number-pad"
						textAlign="center"
						autoFocus={true}
					/>
					<TextInput
						style={styles.input}
						value={second}
						onChangeText={handleSecondInput}
						keyboardType="number-pad"
						textAlign="center"
					/>
					<TextInput
						style={styles.input}
						value={third}
						onChangeText={handleThirdInput}
						keyboardType="number-pad"
						textAlign="center"
					/>
					<TextInput
						style={styles.input}
						value={last}
						onChangeText={handleLastInput}
						keyboardType="number-pad"
						textAlign="center"
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
		// height: 50,
		resizeMode: 'contain',
		// marginVertical: 50,
	},
	button: {
		backgroundColor: '#91C0EB',
		shadowColor: 'transparent',
	},
});
export default AuthAccountScreen;
