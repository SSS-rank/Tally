import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Modal, TextInput, Alert, Pressable, FlatList } from 'react-native';
import { Button } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import PaymentItem from '../../components/Adjust/PaymentItem';
import DashLine from '../../components/DashLine';
import Line from '../../components/Line';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { responseList } from '../../model/adjust';
import { GetAdjustScreenProps } from '../../model/tripNavigator';
import { TextStyles } from '../../styles/CommonStyles';

const GetAdjustScreen = ({ navigation, route }: GetAdjustScreenProps) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [responseAdjust, setResponseAdjust] = useState<responseList>();
	const { adjustId, requesterName, adjustStatus } = route.params;
	const [rejectMessage, setRejectMessage] = useState('');
	const api = useAxiosWithAuth();

	const reset = () => {
		setRejectMessage('');
	};

	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				try {
					const res = await api.get(`calculate/receive-detail/${adjustId}`);
					if (res.status === 200) {
						setResponseAdjust(res.data);
					}
				} catch (err) {
					console.log(err);
				}
			};

			fetchData(); // 화면이 focus될 때마다 데이터를 가져옴
		}, []),
	);

	const rejectAdjust = async () => {
		try {
			const requestBody = {
				calculate_group_uuid: adjustId,
				content: rejectMessage === '' ? '금액 조정이 필요합니다.' : rejectMessage,
			};
			const res = await api.patch(`/calculate/rejection`, requestBody);
			if (res.status === 200) {
				console.log(res.data);
			}
		} catch (err) {
			console.log(err);
		}
		setModalVisible(false);
		setRejectMessage('');
		navigation.goBack();
	};

	return (
		<View style={styles.viewContainer}>
			<View style={{ paddingHorizontal: 15 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text
						style={{
							...TextStyles({ align: 'left', weight: 'bold', color: '#91C0EB' }).header,
						}}
					>
						{requesterName}
					</Text>
					<Text
						style={{
							...TextStyles({ align: 'left', weight: 'bold' }).header,
						}}
					>
						님이 요청한
					</Text>
				</View>
				<Text style={TextStyles({ align: 'left', weight: 'bold', mBottom: 20 }).header}>
					정산 상세 내역입니다.
				</Text>
				<DashLine />
			</View>
			<View style={{ paddingHorizontal: 15, flex: 1 }}>
				<View style={{ marginVertical: 10 }}>
					<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
						<Text style={TextStyles({ align: 'left', weight: 'bold' }).title}>
							{responseAdjust?.travel_name}
						</Text>
						<Text style={TextStyles({ align: 'left', color: '#666666' }).small}>
							{' '}
							{responseAdjust?.travel_type}
						</Text>
					</View>
					<Text style={TextStyles({ align: 'left', color: '#666666' }).small}>
						{responseAdjust?.request_date}
					</Text>
				</View>
				{/* <Text style={{ ...TextStyles({ align: 'left' }).small }}>9월 1일</Text>
				<Line marginVertical={10} /> */}
				<FlatList
					data={responseAdjust?.detail_list}
					renderItem={({ item }) => (
						<PaymentItem
							my_amount={item.my_amount}
							all_amount={item.all_amount}
							payment_date={item.payment_date}
							payment_name={item.payment_name}
						/>
					)}
				/>
			</View>

			<View>
				<View style={{ marginBottom: 20, marginHorizontal: 15 }}>
					<DashLine />
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginVertical: 10,
						}}
					>
						<Text style={{ ...TextStyles().regular }}>합계</Text>
						<Text
							style={{
								...TextStyles({ color: '#91C0EB', align: 'right', weight: 'bold' }).title,
								flex: 1,
							}}
						>
							-{responseAdjust?.total_amount.toLocaleString()}원
						</Text>
					</View>
				</View>
				{adjustStatus === 'ONGOING' && !responseAdjust?.status && (
					<View style={{ flexDirection: 'row', marginBottom: 20, marginHorizontal: 15 }}>
						<Button
							mode="contained"
							buttonColor="#E6E6E6"
							textColor="#A0A0A0"
							style={{ flex: 1, marginHorizontal: 5 }}
							onPress={() => setModalVisible(true)}
						>
							반려
						</Button>

						<Button
							mode="contained"
							buttonColor="#91C0EB"
							textColor="white"
							style={{ flex: 1, marginHorizontal: 5 }}
							onPress={() => navigation.navigate('PayAdjust', { adjustId: adjustId })}
						>
							정산
						</Button>
					</View>
				)}
				{adjustStatus === 'ONGOING' && responseAdjust?.status && (
					<View style={{ flexDirection: 'row', marginBottom: 20, marginHorizontal: 15 }}>
						<Button
							mode="contained"
							buttonColor="#E6E6E6"
							textColor="#A0A0A0"
							style={{ flex: 1, marginHorizontal: 5 }}
							onPress={() => Alert.alert('', '이미 확인한 정산입니다')}
						>
							확인 완료
						</Button>
					</View>
				)}
			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}
			>
				<Pressable
					style={{ backgroundColor: '#00000070', flex: 1 }}
					onPress={() => setModalVisible(!modalVisible)}
				/>
				<View style={styles.modalView}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ flex: 1 }}>
							<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).regular, flex: 1 }}>
								반려 사유
							</Text>
							<Text style={{ ...TextStyles({ align: 'left' }).small, flex: 1 }}>
								정산을 취소하는 이유를 작성해주세요.
							</Text>
						</View>
						<Icon
							name="close"
							size={32}
							color={'#666666'}
							onPress={() => setModalVisible(!modalVisible)}
						/>
					</View>
					<View style={styles.inputBox}>
						<TextInput
							style={{
								...TextStyles({ align: 'left' }).regular,
								flex: 1,
							}}
							value={rejectMessage}
							onChangeText={setRejectMessage}
							placeholder="금액 조정이 필요합니다."
						/>
						<Icon
							name="close-circle"
							style={{
								color: '#666666',
								fontSize: 24,
							}}
							onPress={reset}
						/>
					</View>
					<Button
						mode="contained"
						buttonColor="#91C0EB"
						textColor="white"
						style={{ marginVertical: 15 }}
						onPress={() => rejectAdjust()}
					>
						보내기
					</Button>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	viewContainer: {
		flexGrow: 1,
		// justifyContent: 'center',
		// alignItems: 'center',

		backgroundColor: 'white',
	},
	modalView: {
		bottom: 0,
		// height: '50%',
		width: '100%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: 'white',
		padding: 35,
		position: 'absolute',
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

	inputBox: {
		alignItems: 'center',
		borderBottomColor: '#A0A0A0',
		borderBottomWidth: 0.5,
		flexDirection: 'row',
		marginVertical: 5,
		marginTop: 50,
	},
});
export default GetAdjustScreen;
