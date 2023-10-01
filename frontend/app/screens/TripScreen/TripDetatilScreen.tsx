import React, { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Modal,
	Pressable,
	Alert,
} from 'react-native';
import { Button, Text } from 'react-native-paper';

import Clipboard from '@react-native-clipboard/clipboard';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilState, useRecoilValue } from 'recoil';

import DetailListItem from '../../components/DetailList/DetailListItem';
import SortItem from '../../components/TripScreen/SortItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { Payment } from '../../model/payment';
import { TripMember } from '../../model/trip';
import { TripDetailScreenProps } from '../../model/tripNavigator';
import { MemberState } from '../../recoil/memberRecoil';
import { CurTripInfoState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

function TripDetailScreen({ navigation, route }: TripDetailScreenProps) {
	const api = useAxiosWithAuth();
	const [payData, setPayData] = useState<Payment[]>([]);
	const currentDate = new Date();
	const [modalVisible, setModalVisible] = useState(false);
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
	const day = currentDate.getDate();
	const [title, setTitle] = useState('');
	const { travel_id } = route.params ?? {};
	const [orderType, setOrderType] = useState('최신순');
	const [location, setLocation] = useState(0);
	const [curTripInfo, setCurTripInfo] = useRecoilState(CurTripInfoState);

	const [period, setPeriod] = useState('');
	const [totalAmount, setTotalAmount] = useState(0);
	const [participants, setParticipants] = useState<TripMember[]>([]);
	const [inviteModalVisible, setInviteModalVisible] = useState(false);

	const userInfo = useRecoilValue(MemberState);

	useFocusEffect(
		React.useCallback(() => {
			setPayData([]);
			const fetchData = async () => {
				try {
					const res = await api.get(`/travel/${travel_id}`);
					if (res.status === 200) {
						const trip_data = res.data;
						console.log(trip_data);
						setTitle(trip_data.travel_title);
						setLocation(trip_data.travel_location);
						setPeriod(trip_data.travel_period);
						setTotalAmount(trip_data.total_amount);
						const updatedTripInfo = {
							id: travel_id,
							title: trip_data.travel_title,
							location: trip_data.travel_location,
							startDay: trip_data.travel_period.split('~')[0],
							endDay: trip_data.travel_period.split('~')[1],
							participants: trip_data.participants,
						};
						setParticipants(trip_data.participants);
						setCurTripInfo(updatedTripInfo);
						setPayData(trip_data.payment_list);
					}
				} catch (err) {
					console.log(err);
				}
			};

			fetchData(); // 화면이 focus될 때마다 데이터를 가져옴
		}, []),
	);
	async function handleAdjust() {
		const adjust_data = payData.map((item) => {
			return { payment_uuid: item.payment_uuid };
		});
		console.log(adjust_data);
		const res = await api.post('calculate', adjust_data);
		if (res.status == 200) {
			console.log(res.data);
		}
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.header_button_group}>
					<Button
						style={[styles.outlineBtn, { marginRight: 10 }]}
						mode="outlined"
						labelStyle={TextStyles({ color: '#91C0EB' }).regular}
						onPress={() => navigation.navigate('AdjustTrip', { tripId: travel_id })}
					>
						정산 현황
					</Button>
					<Button
						style={styles.outlineBtn}
						labelStyle={TextStyles({ color: '#91C0EB' }).regular}
						mode="outlined"
						onPress={() => navigation.navigate('AnalysisTrip')}
					>
						분석
					</Button>
				</View>
			</View>

			<View style={styles.title_box}>
				<View style={styles.topView}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.info}>{location}</Text>
				</View>
				<Text style={styles.info}>{period}</Text>
			</View>
			<View style={styles.party_box}>
				<Icon name="face" size={30} color="green" />
				<Icon name="face" size={30} color="green" />
				<Button
					icon="plus"
					style={[styles.outlineBtn, { marginLeft: 10 }]}
					mode="outlined"
					labelStyle={TextStyles({ color: '#91C0EB' }).regular}
					onPress={() => setInviteModalVisible(true)}
				>
					일행 추가
				</Button>
			</View>
			<View style={styles.center_box}>
				<Text style={styles.info}>
					{year}년 {month}월 {day}일까지
				</Text>
				<Text style={styles.money}>{totalAmount}원</Text>
			</View>
			<View style={styles.body_button_group}>
				<Button
					icon="plus"
					style={styles.lightSolidBtn}
					labelStyle={TextStyles().regular}
					mode="contained"
					onPress={() =>
						navigation.navigate('AddPayment', {
							travel_id: travel_id ?? 0,
							travel_title: title,
							participants: participants,
						})
					}
				>
					내역 추가
				</Button>
				<Button
					style={styles.solidBtn}
					labelStyle={TextStyles({ color: '#ffffff' }).regular}
					mode="contained"
					onPress={() => handleAdjust()}
				>
					정산
				</Button>
			</View>

			<View style={styles.order_button}>
				<Button
					mode="text"
					labelStyle={TextStyles().regular}
					icon="chevron-down"
					contentStyle={{ flexDirection: 'row-reverse' }}
					onPress={() => setModalVisible(!modalVisible)}
				>
					{orderType}
				</Button>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<Pressable
					style={{ backgroundColor: '#00000070', flex: 1 }}
					onPress={() => setModalVisible(!modalVisible)}
				/>
				<View style={styles.modalView}>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
						<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).regular, flex: 1 }}>
							정렬 선택
						</Text>
						<Icon
							name="close"
							size={32}
							color={'#666666'}
							onPress={() => setModalVisible(!modalVisible)}
						/>
					</View>
					<View style={styles.order_type_container}>
						<SortItem
							text="최신순"
							orderType={orderType}
							setOrderType={setOrderType}
							setModalVisible={setModalVisible}
						/>
						<SortItem
							text="오래된 순"
							orderType={orderType}
							setOrderType={setOrderType}
							setModalVisible={setModalVisible}
						/>
					</View>
				</View>
			</Modal>
			<Modal
				animationType="fade"
				transparent={true}
				visible={inviteModalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setInviteModalVisible(!inviteModalVisible);
				}}
				style={{ justifyContent: 'center' }}
			>
				<Pressable
					style={{
						backgroundColor: '#00000070',
						flex: 1,
						position: 'absolute',
						width: '100%',
						height: '100%',
					}}
					onPress={() => setInviteModalVisible(!inviteModalVisible)}
				></Pressable>
				<View style={styles.centeredView}>
					<View style={styles.inviteModalView}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).regular, flex: 1 }}>
								일행 추가
							</Text>
							<Icon
								name="close"
								size={32}
								color={'#666666'}
								onPress={() => setInviteModalVisible(!inviteModalVisible)}
							/>
						</View>
						<Text style={TextStyles({ align: 'left' }).small}>
							함께 여행갈 친구나 가족을 초대해보세요{'\n'}
							여행에 사용한 금액을 편리하게 정산할 수 있습니다.
						</Text>
						<Button
							mode="contained"
							buttonColor="#91C0EB"
							textColor="white"
							style={{ marginTop: 30 }}
							icon="link"
							onPress={() =>
								Clipboard.setString(
									`tally://join/${userInfo.nickname}/${curTripInfo.title}/${travel_id}`,
								)
							}
						>
							초대링크 복사
						</Button>
					</View>
				</View>
			</Modal>
			{payData.map((item) => (
				<View key={item.payment_uuid}>
					<TouchableOpacity
						style={styles.detail_item_box}
						onPress={() =>
							navigation.navigate('ModifyPayment', {
								payment_uuid: item.payment_uuid,
								payer: item.payer,
								method: item.payment_method,
							})
						}
					>
						<Text>{item.payment_date.split('T')[0]}</Text>
						<DetailListItem
							title={item.payment_name}
							time={item.payment_date}
							balance={item.amount}
							party={item.participants ? item.participants.join(',') : ''}
							abroad={false}
							calculateStatus={item.calculate_status}
							visible={item.visible}
						/>
					</TouchableOpacity>
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	order_type_container: {
		width: '100%',
	},
	modalView: {
		width: '100%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: 'white',
		padding: 35,
		position: 'absolute',
		bottom: 0,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	order_button: {
		flexDirection: 'row',
	},
	container: {
		flexDirection: 'column',
		paddingTop: 10,
		paddingHorizontal: 15,
		backgroundColor: 'white',
	},
	center_box: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: 50,
	},
	party_box: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	title_box: {
		padding: 10,
	},
	detail_item_box: {
		padding: 10,
	},
	topView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
	},
	title: {
		...TextStyles({ weight: 'bold', mRight: 10 }).title,
	},
	info: {
		...TextStyles({ align: 'left', color: '#666666' }).small,
	},
	body_button_group: {
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	// balance: {
	//     justifyContent: 'center',
	//     alignItems: 'center',
	// },
	money: {
		...TextStyles({ weight: 'bold' }).header,
	},
	period: {
		fontSize: 13,
	},
	// title: {
	//     fontSize: 30,
	// },
	type: {
		alignSelf: 'flex-end',
	},
	button: {
		padding: 0,
		borderRadius: 20,
		flexWrap: 'wrap',
	},
	outlineBtn: {
		borderColor: '#91C0EB',
		borderRadius: 32,
		padding: 0,
	},
	lightSolidBtn: {
		backgroundColor: '#E0E6EC',
		borderRadius: 32,
	},
	solidBtn: {
		backgroundColor: '#91C0EB',
		borderRadius: 32,
	},
	header_button_group: {
		flexDirection: 'row',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
	},
	inviteModalView: {
		marginHorizontal: 15,
		borderRadius: 20,
		backgroundColor: 'white',
		padding: 35,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		justifyContent: 'center',
	},
});
export default TripDetailScreen;
