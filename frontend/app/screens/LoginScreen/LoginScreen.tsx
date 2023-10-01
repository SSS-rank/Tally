import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

import messaging from '@react-native-firebase/messaging';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSetRecoilState } from 'recoil';

import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { RootStackProps } from '../../navigation/RootStack';
import { MemberState } from '../../recoil/memberRecoil';
import { FcmTokenState, TokenState, tallyAccountListState } from '../../recoil/recoil';

type RootStackProp = NativeStackScreenProps<RootStackProps, 'SignIn'>;

function LoginScreen({ route }: RootStackProp) {
	const { setUserToken } = route.params ?? {};
	const setTokenState = useSetRecoilState(TokenState);
	const api = useAxiosWithAuth();
	const setFcmToken = useSetRecoilState(FcmTokenState);
	const setMember = useSetRecoilState(MemberState);
	const setAccountListState = useSetRecoilState(tallyAccountListState);

	const login = async () => {
		KakaoLogin.login()
			.then(async (result) => {
				// console.log('login success', JSON.stringify(result));
				const accessToken = result.accessToken;
				getProfile();
				const fcmToken = await messaging().getToken();
				setFcmToken(fcmToken);
				console.log('fcmToken ', fcmToken);
				try {
					console.log(accessToken);
					const data = {
						kakao_access_token: accessToken,
						device_token: fcmToken,
					};

					const res = await api.post(`/login`, data);

					if (res.status === 200) {
						console.log(res.data);

						const tokenState = {
							accessToken: res.data.accessToken,
							refreshToken: res.data.refreshToken,
							accessTokenExpireTime: res.data.accessTokenExpireTime,
							refreshTokenExpireTime: res.data.refreshTokenExpireTime,
						};

						if (res.data.accessToken) {
							api.defaults.headers.Authorization = `Bearer ${tokenState.accessToken}`;
							const memberRes = await api.get(`member`);
							const memberData = {
								member_uuid: memberRes.data.memberUuid,
								nickname: memberRes.data.nickname,
								profile_image: memberRes.data.profileImage,
							};
							setMember(memberData);
						}
						getAccountList();
						setTokenState(tokenState);
						setUserToken(res.data.accessToken);
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

	const getAccountList = async () => {
		try {
			const res = await api.get(`/account`);
			console.log(res.data);

			if (res.status === 200) {
				setAccountListState(res.data);
			}
		} catch (err) {
			console.error(err);
		}
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
