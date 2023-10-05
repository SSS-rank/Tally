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
import Config from 'react-native-config';
import { Avatar, Button, Text, Chip } from 'react-native-paper';

import Clipboard from '@react-native-clipboard/clipboard';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilState, useRecoilValue } from 'recoil';

import firebaseApi from '../../api/firebaseApi';
import AdjustEmptyAlert from '../../components/Alert/AdjustEmptyAlert';
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
	const [isCopy, setIsCopy] = useState(false);

	const userInfo = useRecoilValue(MemberState);

	const [load, setLoad] = useState(true);

	useFocusEffect(
		React.useCallback(() => {
			fetchData(); // 화면이 focus될 때마다 데이터를 가져옴
		}, [travel_id]),
	);

	useEffect(() => {
		fetchData();
	}, [load]);

	const fetchData = async () => {
		try {
			setLoad(true);
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

				if (load) {
					setPayData(trip_data.payment_list);
					setLoad(false);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	async function handleAdjust() {
		const adjust_data = payData
			.filter((item) => item.calculate_status == 'BEFORE')
			.filter((item) => item.payer == userInfo.member_uuid)
			.map((item) => {
				return { payment_uuid: item.payment_uuid };
			});
		if (adjust_data.length == 0) {
			AdjustEmptyAlert();
			return;
		}

		const res = await api.post('calculate', adjust_data);
		if (res.status == 200) {
			console.log('정산 요청 완료');
			navigation.navigate('AdjustTrip', { tripId: travel_id });
		}
	}

	async function makeInviteLink() {
		const urlData = {
			dynamicLinkInfo: {
				domainUriPrefix: 'https://tally.page.link',
				link: `https://tally.com/join/${userInfo.nickname}/${curTripInfo.title}/${travel_id}`,
				androidInfo: {
					androidPackageName: 'com.tally',
				},
			},
			suffix: {
				option: 'SHORT',
			},
		};
		console.log(urlData);
		const res = await firebaseApi.post(``, urlData);
		console.log(res.data.shortLink);
		Clipboard.setString(res.data.shortLink);
		setIsCopy(true);
		console.log('복사d완료');
	}

	return (
		<ScrollView style={styles.container}>
			<View>
				<View style={styles.topView}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.info}>{location}</Text>
				</View>
				<Text style={styles.info}>{period}</Text>
			</View>
			<View style={styles.party_box}>
				{participants.map((member, index: number) =>
					index === 0 ? (
						<Avatar.Image
							key={member.member_uuid}
							style={{ backgroundColor: 'transparent' }}
							size={36}
							source={{ uri: member.image }}
						/>
					) : (
						<Avatar.Image
							key={member.member_uuid}
							style={{ backgroundColor: 'transparent', position: 'relative', left: -16 * index }}
							size={36}
							source={{ uri: member.image }}
						/>
					),
				)}
				<Chip
					style={styles.outlineBtn}
					textStyle={{ color: '#91C0EB' }}
					onPress={() => {
						setInviteModalVisible(true);
						setIsCopy(false);
					}}
				>
					<MaterialIcon
						name="plus"
						size={16}
						style={{ color: '#91C0EB', textAlignVertical: 'center' }}
					/>{' '}
					일행 추가
				</Chip>
			</View>
			<View style={styles.center_box}>
				<Text style={styles.info}>
					{year}년 {month}월 {day}일까지
				</Text>
				<Text style={styles.money}>{totalAmount.toLocaleString()}원</Text>
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
							buttonColor={isCopy ? '#D6D6D6' : '#91C0EB'}
							textColor="white"
							style={{ marginTop: 30 }}
							icon="link"
							onPress={() => makeInviteLink()}
						>
							{isCopy ? '복사 완료' : '초대링크 복사'}
						</Button>
					</View>
				</View>
			</Modal>
			{payData.map((item) => (
				<DetailListItem
					key={item.payment_uuid}
					item={item}
					navigation={navigation}
					setLoad={setLoad}
				/>
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
		marginTop: 10,
	},
	topView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	title: {
		...TextStyles({ weight: 'bold', mRight: 10, color: '#91C0EB' }).header,
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
	money: {
		...TextStyles({ weight: 'bold' }).header,
	},
	period: {
		fontSize: 13,
	},
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
		borderWidth: 1,
		backgroundColor: 'white',
	},
	lightSolidBtn: {
		backgroundColor: '#E0E6EC',
		borderRadius: 32,
	},
	solidBtn: {
		backgroundColor: '#91C0EB',
		borderRadius: 32,
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
