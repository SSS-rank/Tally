import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import { useRecoilState } from 'recoil';

import AccountItem from '../../components/AccountItem/AccountItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { tallyAccountListState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';
const ManageAccountScreen = ({ navigation }: any) => {
	const api = useAxiosWithAuth();
	const [accountListState, setAccountListState] = useRecoilState(tallyAccountListState);
	useFocusEffect(
		useCallback(() => {
			getAccountList();
		}, [accountListState]),
	);

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
			<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
				<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).title }}>연결된 계좌</Text>
				<Button
					mode="text"
					style={{ flex: 1, alignItems: 'flex-end' }}
					onPress={() => navigation.navigate('AddAccount')}
				>
					계좌 추가
				</Button>
			</View>
			<FlatList
				data={accountListState}
				renderItem={({ item }) => (
					<AccountItem
						key={item.accountNumber}
						accountNumber={item.accountNumber}
						balance={item.balance}
						bankCode={item.bankCode}
						bankName={item.bankName}
					/>
				)}
				keyExtractor={(item) => item.accountNumber}
			/>
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
export default ManageAccountScreen;
