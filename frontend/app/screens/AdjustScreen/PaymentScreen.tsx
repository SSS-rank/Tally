import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';

import PaymentAccountItem from '../../components/Adjust/PaymentAccountItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { TextStyles } from '../../styles/CommonStyles';

const PaymentScreen = () => {
	const api = useAxiosWithAuth();
	const [accountListState, setAccountListState] = useState();
	const [representativeAccountChange, setRepresentativeAccountChange] = useState('');

	useFocusEffect(
		useCallback(() => {
			getAccountList();
		}, []),
	);

	useEffect(() => {
		console.log(representativeAccountChange);
		// if (representativeAccountChange) {
		// 	setRepresentativeAccountChange(true);
		// }
	}, [representativeAccountChange]);

	const getAccountList = async () => {
		try {
			const res = await api.get(`/account`);
			if (res.status === 200) {
				setAccountListState(res.data);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<View style={styles.viewContainer}>
			<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).title, marginVertical: 10 }}>
				결제 계좌 선택
			</Text>
			<FlatList
				data={accountListState}
				renderItem={({ item }) => (
					<PaymentAccountItem
						key={item.accountNumber}
						accountNumber={item.accountNumber}
						balance={item.balance}
						bankCode={item.bankCode}
						bankName={item.bankName}
						representativeAccount={item.representativeAccount}
						setSelectedAccountChange={setRepresentativeAccountChange}
					/>
				)}
				keyExtractor={(item) => item.accountNumber}
			/>
			<View style={{ justifyContent: 'flex-end', flex: 1, marginVertical: 30 }}>
				<Button mode="elevated" buttonColor="#91C0EB" textColor="white">
					완료
				</Button>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		backgroundColor: 'white',
		paddingHorizontal: 15,
	},
});
export default PaymentScreen;
