import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';

import CategoryListItem from '../../components/AnalysisScreen/CategoryListItem';
import DashLine from '../../components/DashLine';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { categoryListItem } from '../../model/analysis';
import { AnalysisCategoryScreenProps } from '../../model/tripNavigator';
import { CurTripInfoState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

function AnalysisCategoryScreen({ navigation, route }: AnalysisCategoryScreenProps) {
	const { category_id, title, member_uuid } = route.params;
	const curTripInfo = useRecoilValue(CurTripInfoState);
	const [paymentList, setPaymentList] = useState<categoryListItem[]>([]);

	useFocusEffect(
		useCallback(() => {
			navigation.setOptions({ title: title });
			getCategoryPaymentList();
		}, []),
	);

	const api = useAxiosWithAuth();
	const getCategoryPaymentList = async () => {
		const res = await api.get(`/analysis/${curTripInfo.id}/${member_uuid}/${category_id}`);
		setPaymentList(res.data);
	};
	return (
		<View style={styles.viewContainer}>
			<Text style={styles.title}>25900원</Text>
			<DashLine />
			<FlatList
				data={paymentList}
				renderItem={({ item }) => (
					<CategoryListItem
						category_id={category_id}
						payment_korea_date={item.payment_korea_date}
						payment_uuid={item.payment_uuid}
						payment_title={item.payment_title}
						tag_member={item.tag_member}
						total_money={item.total_money}
						my_money={item.my_money}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		padding: 15,
		backgroundColor: '#ffffff',
	},
	title: {
		...TextStyles({ align: 'left', weight: 'bold', mBottom: 30 }).title,
	},
});

export default AnalysisCategoryScreen;
