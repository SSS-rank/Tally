import React, { useCallback, useState } from 'react';
import { Text, View, Image } from 'react-native';
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
	const [travelType, setTravelType] = useState('travelType1');
	const [travelerTitle, setTravelerTitle] = useState('설레는 여행가');

	const api = useAxiosWithAuth();

	useFocusEffect(
		useCallback(() => {
			async function fetchData() {
				const res = await api.get('travel/visit/count');
				if (res.status == 200) {
					const count_data = res.data;
					setOverseasCount(count_data.overseas);
					setNationalCount(count_data.national);
					if (count_data.overseas - count_data.national >= 10) {
						setTravelType('travelType5');
						setTravelerTitle('내 꿈은 마일리지왕');
					} else if (count_data.national - count_data.overseas >= 10) {
						setTravelType('travelType4');
						setTravelerTitle('신토불이 여행가');
					} else if (count_data.national + count_data.overseas >= 10) {
						setTravelType('travelType3');
						setTravelerTitle('여행 미치광이');
					} else if (count_data.national + count_data.overseas >= 5) {
						setTravelType('travelType2');
						setTravelerTitle('여행 비기너');
					} else {
						setTravelType('travelType1');
						setTravelerTitle('설레는 여행가');
					}
				}
			}
			fetchData();
		}, []),
	);
	return (
		<>
			<View
				style={
					ViewStyles({
						alignItems: 'center',
						height: 100,
						flexDirection: 'row',
						color: '#91C0EB',
					}).box
				}
			>
				<Image
					style={{
						width: 100,
						height: 100,
						resizeMode: 'contain',
						flex: 1,
					}}
					source={{
						uri: `https://sss-tally.s3.ap-northeast-2.amazonaws.com/${travelType}.png`,
					}}
				/>
				<Text
					style={{
						...TextStyles({ weight: 'bold', color: 'white' }).title,
						flex: 2,
					}}
				>
					<Text style={TextStyles({ color: '#666666' }).small}>당신의 여행 레벨은{'\n'}</Text>
					{travelerTitle}
				</Text>
			</View>
			<View
				style={
					ViewStyles({
						alignItems: 'center',
						flexDirection: 'row',
						height: 170,
					}).box
				}
			>
				<View style={ViewStyles({ flexDirection: 'row', alignItems: 'center' }).innerProfile}>
					<Text
						style={{
							...TextStyles({ mBottom: 10, align: 'left' }).regular,
							flex: 2.5,
						}}
					>
						{memberinfo.nickname}님이{'\n'}
						<Text style={TextStyles({ color: '#91C0EB', weight: 'bold' }).regular}>
							방문한 국가/도시
						</Text>
						는{'\n'}몇 개일까요?
					</Text>
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
