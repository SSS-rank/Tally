import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';

import PaymentAccountItem from '../../components/Adjust/PaymentAccountItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { Account } from '../../model/account';
import { PayAdjustScreenProps } from '../../model/tripNavigator';
import { TextStyles } from '../../styles/CommonStyles';

const PaymentScreen = ({ navigation, route }: PayAdjustScreenProps) => {
	const api = useAxiosWithAuth();
	const { adjustId } = route.params;
	const [accountList, setAccountList] = useState<Account[]>([]);
	const [selectedAccount, setSelectedAccount] = useState('');

	useFocusEffect(
		useCallback(() => {
			getAccountList();
		}, []),
	);

	useEffect(() => {
		const filteredAccounts = accountList.filter((item: Account) => {
			if (item.accountNumber === selectedAccount) {
				item.representativeAccount = true;
			} else {
				item.representativeAccount = false;
			}
			return item;
		});
		setAccountList(filteredAccounts);
	}, [selectedAccount]);

	const getAccountList = async () => {
		try {
			const res = await api.get(`/account`);
			if (res.status === 200) {
				setAccountList(res.data);
				const account = res.data.find((item: Account) => item.representativeAccount === true);
				if (account !== undefined) setSelectedAccount(account.accountNumber);
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
				data={accountList}
				renderItem={({ item }) => (
					<PaymentAccountItem
						key={item.accountNumber}
						accountNumber={item.accountNumber}
						balance={item.balance}
						bankCode={item.bankCode}
						bankName={item.bankName}
						representativeAccount={item.representativeAccount}
						setSelectedAccountChange={setSelectedAccount}
					/>
				)}
				keyExtractor={(item) => item.accountNumber}
			/>
			<View style={{ justifyContent: 'flex-end', flex: 1, marginVertical: 30 }}>
				<Button
					mode="contained"
					buttonColor="#91C0EB"
					textColor="white"
					onPress={() =>
						navigation.navigate('Password', {
							adjustId: adjustId,
							accountNumber: selectedAccount,
						})
					}
				>
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
