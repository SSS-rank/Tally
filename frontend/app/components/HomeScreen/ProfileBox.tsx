import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import { useRecoilState } from 'recoil';

import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { MemberState } from '../../recoil/memberRecoil';
import { TextStyles } from '../../styles/CommonStyles';
import { ViewStyles } from '../../styles/HomeStyles';

function ProfileBox() {
	const [memberinfo, setMemberInfo] = useRecoilState(MemberState);
	const [nationalCount, setNationalCount] = useState(0);
	const [overseasCount, setOverseasCount] = useState(0);

	const api = useAxiosWithAuth();

	useFocusEffect(
		useCallback(() => {
			async function fetchData() {
				const res = await api.get('travel/visit/count');
				if (res.status == 200) {
					const count_data = res.data;
					setOverseasCount(count_data.overseas);
					setNationalCount(count_data.national);
				}
			}
			fetchData();
		}, []),
	);
	return (
		<>
			<View style={ViewStyles({ alignItems: 'center', height: 100 }).box}>
				<Text style={TextStyles({ weight: 'bold', color: '#91C0EB' }).title}>
					국내파 여행가
					<Text style={TextStyles().regular}> {memberinfo.nickname}</Text>
				</Text>
			</View>
			<View style={ViewStyles({ alignItems: 'center', height: 180 }).box}>
				<Text style={TextStyles({ align: 'left' }).regular}>내가 다녀 온 여행지</Text>
				<View style={ViewStyles({ flexDirection: 'row', alignItems: 'center' }).innerProfile}>
					<View style={ViewStyles({ alignItems: 'center' }).innerProfile}>
						<Text style={TextStyles().regular}>국내</Text>
						<Text style={TextStyles().header}>{nationalCount}</Text>
					</View>
					<View style={ViewStyles({ alignItems: 'center' }).innerProfile}>
						<Text style={TextStyles().regular}>해외</Text>
						<Text style={TextStyles().header}>{overseasCount}</Text>
					</View>
				</View>
			</View>
		</>
	);
}
export default ProfileBox;
