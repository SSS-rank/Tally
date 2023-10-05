import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type JoinScreenProps = BottomTabScreenProps<RootStackProps, 'Join'>;
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilState, useRecoilValue } from 'recoil';

import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { RootStackProps } from '../../navigation/RootStack';
import { JoinState } from '../../recoil/joinRecoil';
import { TokenState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

function JoinScreen({ navigation, route }: any) {
	const { travelId, host, travelName } = route.params;
	const api = useAxiosWithAuth();
	const tokenState = useRecoilValue(TokenState);
	const [joinInfo, setJoinInfo] = useRecoilState(JoinState);

	// eslint-disable-next-line @typescript-eslint/no-shadow
	const joinTravel = async (travelId: number) => {
		const data = {
			travel_id: travelId,
		};
		try {
			console.log(tokenState.accessToken);
			if (tokenState.accessToken) {
				const res = await api.post(`/group`, data);
				if (res.status === 200) {
					console.log(res.data);
					navigation.navigate('MainTabs', { screen: 'TripStack' });
				}
			} else {
				//로그인이 안되어있는 경우
				setJoinInfo({ isAgreed: true, travel_id: travelId });
				navigation.navigate('SignIn');
			}
		} catch (err: any) {
			console.error(err.response);
		}
	};

	return (
		<View style={styles.viewContainer}>
			<View style={styles.ticketContainer}>
				<Text style={styles.ticketTitle}>TALLY TICKET</Text>
				<View style={{ flexDirection: 'row', flex: 1 }}>
					<View style={styles.ticketLeftBox}>
						<Icon name="airplane-ticket" size={72} color="white" />
					</View>
					<View style={styles.ticketRightBox}>
						<Text style={styles.travelNameInTicket}>{travelName}</Text>
						<Text style={styles.hostNameInTicket}>From. {host}</Text>
					</View>
				</View>
				<View style={styles.ticketBottom}></View>
				<View
					style={{
						width: 30,
						height: 30,
						position: 'absolute',
						backgroundColor: 'white',
						borderRadius: 100,
						left: -20,
					}}
				></View>
			</View>

			<Text style={TextStyles({ mTop: 20 }).regular}>
				<Text style={styles.pointText}>{host}</Text>님이 '
				<Text style={styles.pointText}>{travelName}</Text>' 일정에 초대했어요
			</Text>
			<Text style={TextStyles({ mTop: 5, mBottom: 100 }).small}>
				초대를 수락하면, 정산을 편리하게 할 수 있어요!
			</Text>
			<View style={styles.buttonContainer}>
				<Button
					mode="contained"
					style={styles.buttonCancel}
					onPress={() =>
						tokenState.accessToken ? navigation.navigate('MainTabs') : navigation.navigate('SignIn')
					}
				>
					취소
				</Button>
				<Button mode="contained" style={styles.button} onPress={() => joinTravel(travelId)}>
					수락
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15,
		backgroundColor: '#ffffff',
	},
	ticketContainer: {
		width: '90%',
		backgroundColor: '#dce6f5',
		height: 150,
		borderRadius: 10,
		// marginBottom: 100,
		elevation: 5,
		justifyContent: 'center',
	},
	ticketTitle: {
		...TextStyles({ color: 'white', align: 'left' }).title,
		backgroundColor: '#91C0EB',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		paddingVertical: 5,
		paddingHorizontal: 15,
	},
	ticketBottom: {
		backgroundColor: '#91C0EB',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		paddingVertical: 5,
		height: 15,
	},
	ticketLeftBox: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderStyle: 'dashed',
		borderRightWidth: 1,
		borderColor: '#A0A0A0',
	},
	ticketRightBox: {
		flex: 1.5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	travelNameInTicket: {
		...TextStyles({ color: '#91C0EB' }).regular,
		backgroundColor: 'white',
		margin: 5,
		width: '80%',
		paddingVertical: 2,
	},
	hostNameInTicket: {
		...TextStyles({ color: '#91C0EB' }).small,
		backgroundColor: 'white',
		margin: 5,
		width: '80%',
		paddingVertical: 2,
	},
	pointText: {
		...TextStyles({ color: '#91C0EB', weight: 'bold' }).regular,
	},
	buttonContainer: {
		flexDirection: 'row',
		// flex: 1,
	},
	button: {
		backgroundColor: '#91C0EB',
		// width: '100%',
		marginBottom: 15,
		flex: 1,
		marginLeft: 10,
	},
	buttonCancel: {
		backgroundColor: '#D0D0D0',
		// width: '100%',
		marginBottom: 15,
		flex: 1,
		marginRight: 10,
	},
});

export default JoinScreen;
