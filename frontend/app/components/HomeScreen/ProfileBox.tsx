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
		<View style={ViewStyles({ flexDirection: 'row', alignItems: 'center' }).box}>
			<View style={ViewStyles({ alignItems: 'center' }).innerProfile}>
				<Avatar.Image
					style={{ backgroundColor: 'transparent' }}
					size={54}
					source={{ uri: memberinfo.profile_image }}
				/>
				<Text style={TextStyles({ mTop: 10 }).regular}>{memberinfo.nickname}</Text>
			</View>
			<View style={ViewStyles({ alignItems: 'center' }).innerProfile}>
				<Text style={TextStyles().header}>{nationalCount}</Text>
				<Text style={TextStyles().regular}>국내</Text>
			</View>
			<View style={ViewStyles({ alignItems: 'center' }).innerProfile}>
				<Text style={TextStyles().header}>{overseasCount}</Text>
				<Text style={TextStyles().regular}>해외</Text>
			</View>
		</View>
	);
}
export default ProfileBox;
