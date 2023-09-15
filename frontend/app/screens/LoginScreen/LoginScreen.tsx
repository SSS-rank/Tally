import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

import * as KakaoLogin from '@react-native-seoul/kakao-login';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSetRecoilState } from 'recoil';

import api from '../../api/api';
import { RootStackProps } from '../../navigation/RootStack';
import { TokenState } from '../../recoil/recoil';

type RootStackProp = NativeStackScreenProps<RootStackProps, 'SignIn'>;

function LoginScreen({ route }: RootStackProp) {
	const { setUserToken } = route.params;
	const setTokenState = useSetRecoilState(TokenState);

	const login = async () => {
		KakaoLogin.login()
			.then(async (result) => {
				// console.log('login success', JSON.stringify(result));
				const accessToken = result.accessToken;
				getProfile();

				try {
					const data = {
						kakaoAccessToken: accessToken,
						deviceToken: `ci0kdlHsTxirohKvceSNrn:APA91bGSSysqDgEsg1CFmYB9xw0B4h7jINzWhMxem5S1__93oC9co1bitM1Kz9z7zM7FNafBVXr_rc7i-vBavYLeyM29hTJpec3B1dHcWyUo44JIxnfLDFINHXd7-ap6i4Uk1Jnyausc`,
					};
					const res = await api.post(`/login`, data);

					if (res.status === 200) {
						console.log(res.data);
						setTokenState(res.data);
						setUserToken(res.data);
					}
				} catch (error) {
					console.error(error);
				}
			})
			.catch((error) => {
				if (error.code === 'E_CANCELLED_OPERATION') {
					console.log('login cancel', error.message);
				} else {
					console.log('login fail ', error.code, error.message);
				}
			});
	};

	const getProfile = () => {
		KakaoLogin.getProfile()
			.then((result) => {
				// console.log(`getProfile Success`, JSON.stringify(result));
			})
			.catch((err) => {
				console.log(`getProfile fail ${err.code} ${err.message}`);
			});
	};

	return (
		<View style={styles.viewContainer}>
			<Text style={styles.titleText}>Tally</Text>
			<Button
				mode="contained"
				buttonColor="#FFE900"
				textColor="#232323"
				onPress={() => login()}
				style={{ borderRadius: 24, padding: 4 }}
			>
				<Image source={require('../../assets/images/kakao.png')} />
				카카오톡으로 시작하기
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleText: { fontSize: 50, fontWeight: 'bold', marginBottom: 40 },
});

export default LoginScreen;
