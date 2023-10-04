import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useFocusEffect } from '@react-navigation/native';

import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { TextStyles } from '../../styles/CommonStyles';

type visitedCountryProp = {
	overseas: string[];
	national: string[];
};

function StampScreen() {
	const [visitedCountries, setVisitedCountries] = useState<visitedCountryProp>();
	useFocusEffect(
		useCallback(() => {
			getVisitedCountry();
		}, []),
	);
	const api = useAxiosWithAuth();

	const getVisitedCountry = async () => {
		try {
			const res = await api.get(`/travel/visit/detail`);
			if (res.status === 200) {
				console.log(res.data);
				setVisitedCountries(res.data);
				console.log(visitedCountries);
			}
		} catch (err: any) {
			console.error(err.response);
		}
	};
	return (
		<LinearGradient colors={['#A7BFE8', '#CFDEF3', '#F2F2F2']}>
			<ScrollView style={styles.viewContainer}>
				<View style={styles.headerContainer}>
					<Text style={TextStyles({ color: 'white' }).header}>나의 여행 도장</Text>
					<Text style={TextStyles({ color: 'white' }).regular}>
						여행을 완료하고 도장을 모아보세요!
					</Text>
				</View>
				<View style={styles.stampContainer}>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1 }}>
							{visitedCountries?.national.includes('부산광역시') ? (
								<Image
									source={{ uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/BUSAN.png' }}
									style={styles.BUSAN}
								/>
							) : (
								<Image
									source={{
										uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/BUSAN_GRAY.png',
									}}
									style={styles.BUSAN}
								/>
							)}
						</View>
						<View style={{ flex: 2 }}>
							<View style={{ flex: 1 }}>
								{visitedCountries?.national.includes('서울특별시') ? (
									<Image
										source={{ uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/SEOUL.png' }}
										style={styles.SEOUL}
									/>
								) : (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/SEOUL_GRAY.png',
										}}
										style={styles.SEOUL}
									/>
								)}
							</View>
							<View style={{ flex: 1 }}>
								{visitedCountries?.national.includes('충청북도') ? (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/CHUNGBUK.png',
										}}
										style={styles.CHUNGBUK}
									/>
								) : (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/CHUNGBUK_GRAY.png',
										}}
										style={styles.CHUNGBUK}
									/>
								)}
							</View>
						</View>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1 }}>
							{visitedCountries?.national.includes('대구광역시') ? (
								<Image
									source={{ uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/DAEGU.png' }}
									style={styles.DAEGU}
								/>
							) : (
								<Image
									source={{
										uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/DAEGU_GRAY.png',
									}}
									style={styles.DAEGU}
								/>
							)}
						</View>
						<View style={{ flex: 1 }}>
							{visitedCountries?.national.includes('충청남도') ? (
								<Image
									source={{ uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/CHUNGNAM.png' }}
									style={styles.CHUNGNAM}
								/>
							) : (
								<Image
									source={{
										uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/CHUNGNAM_GRAY.png',
									}}
									style={styles.CHUNGNAM}
								/>
							)}
						</View>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1 }}>
							<View style={{ flex: 1 }}>
								{visitedCountries?.national.includes('대전광역시') ? (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/DAEJEON.png',
										}}
										style={styles.DAEJEON}
									/>
								) : (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/DAEJEON_GRAY.png',
										}}
										style={styles.DAEJEON}
									/>
								)}
							</View>
							<View style={{ flex: 1 }}>
								{visitedCountries?.national.includes('경상북도') ? (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/GYEONGBUK.png',
										}}
										style={styles.GYEONGBUK}
									/>
								) : (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/GYEONGBUK_GRAY.png',
										}}
										style={styles.GYEONGBUK}
									/>
								)}
							</View>
						</View>
						<View style={{ flex: 1 }}>
							<View style={{ flex: 1 }}>
								{visitedCountries?.national.includes('경상남도') ? (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/GYEONGNAM.png',
										}}
										style={styles.GYEONGNAM}
									/>
								) : (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/GYEONGNAM_GRAY.png',
										}}
										style={styles.GYEONGNAM}
									/>
								)}
							</View>
						</View>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1 }}>
							<View style={{ flex: 1 }}>
								{visitedCountries?.national.includes('제주특별자치도') ? (
									<Image
										source={{ uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/JEJU.png' }}
										style={styles.JEJU}
									/>
								) : (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/JEJU_GRAY.png',
										}}
										style={styles.JEJU}
									/>
								)}
							</View>
							<View style={{ flex: 1 }}>
								{visitedCountries?.national.includes('전라북도') ? (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/JEONBUK.png',
										}}
										style={styles.JEONBUK}
									/>
								) : (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/JEONBUK_GRAY.png',
										}}
										style={styles.JEONBUK}
									/>
								)}
							</View>
						</View>
						<View style={{ flex: 1 }}>
							<View style={{ flex: 1 }}>
								{visitedCountries?.national.includes('전라남도') ? (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/JEONNAM.png',
										}}
										style={styles.JEONNAM}
									/>
								) : (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/JEONNAM_GRAY.png',
										}}
										style={styles.JEONNAM}
									/>
								)}
							</View>
							<View style={{ flex: 1 }}>
								{visitedCountries?.national.includes('울산광역시') ? (
									<Image
										source={{ uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/ULSAN.png' }}
										style={styles.ULSAN}
									/>
								) : (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/ULSAN_GRAY.png',
										}}
										style={styles.ULSAN}
									/>
								)}
							</View>
							<View style={{ flex: 1 }}>
								{visitedCountries?.national.includes('인천광역시') ? (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/INCHEON.png',
										}}
										style={styles.INCHEON}
									/>
								) : (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/INCHEON_GRAY.png',
										}}
										style={styles.INCHEON}
									/>
								)}
							</View>
						</View>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1 }}>
							<View style={{ flex: 1 }}>
								{visitedCountries?.national.includes('경기도') ? (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/GYEONGGI.png',
										}}
										style={styles.GYEONGGI}
									/>
								) : (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/GYEONGGI_GRAY.png',
										}}
										style={styles.GYEONGGI}
									/>
								)}
							</View>
							<View style={{ flex: 1 }}>
								{visitedCountries?.national.includes('강원특별자치도') ? (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/GANGWON.png',
										}}
										style={styles.GANGWON}
									/>
								) : (
									<Image
										source={{
											uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/GANGWON_GRAY.png',
										}}
										style={styles.GANGWON}
									/>
								)}
							</View>
						</View>
						<View style={{ flex: 1 }}>
							{visitedCountries?.national.includes('광주광역시') ? (
								<Image
									source={{ uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/GWANGJU.png' }}
									style={styles.GWANGJU}
								/>
							) : (
								<Image
									source={{
										uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/GWANGJU_GRAY.png',
									}}
									style={styles.GWANGJU}
								/>
							)}
						</View>
					</View>
				</View>
			</ScrollView>
		</LinearGradient>
	);
}
const styles = StyleSheet.create({
	viewContainer: {
		paddingTop: 10,
		paddingHorizontal: 15,
	},
	headerContainer: {
		alignItems: 'center',
		paddingVertical: 30,
	},
	stampContainer: {
		alignItems: 'center',
		paddingVertical: 30,
		backgroundColor: 'white',
		elevation: 5,
		borderRadius: 10,
	},
	SEOUL: {
		resizeMode: 'contain',
		height: 90,
		width: 'auto',
		transform: [{ rotate: '15deg' }],
	},
	BUSAN: {
		resizeMode: 'contain',
		height: 180,
		width: 'auto',
		flex: 1,
		transform: [{ rotate: '-5deg' }],
	},
	CHUNGBUK: {
		resizeMode: 'contain',
		transform: [{ rotate: '-1deg' }],
		height: 100,
		width: 200,
		flex: 1,
		marginVertical: 10,
	},
	DAEGU: {
		resizeMode: 'contain',
		height: 130,
		width: 'auto',
		transform: [{ rotate: '15deg' }],
		marginBottom: 20,
	},
	CHUNGNAM: {
		resizeMode: 'contain',
		height: 120,
		width: 'auto',
		// flex: 1,
		transform: [{ rotate: '-5deg' }],
	},
	DAEJEON: {
		resizeMode: 'contain',
		transform: [{ rotate: '-1deg' }],
		height: 120,
		width: 'auto',
	},
	GYEONGBUK: {
		resizeMode: 'contain',
		height: 120,
		width: 'auto',
		transform: [{ rotate: '15deg' }],
	},
	GWANGJU: {
		resizeMode: 'contain',
		height: 100,
		width: 'auto',
		transform: [{ rotate: '-56deg' }],
	},
	GYEONGNAM: {
		resizeMode: 'contain',
		height: 150,
		width: 150,
		flex: 1,
		transform: [{ rotate: '12deg' }],
	},
	GYEONGGI: {
		resizeMode: 'contain',
		height: 100,
		width: 'auto',
		transform: [{ rotate: '-5deg' }],
	},
	GANGWON: {
		resizeMode: 'contain',
		height: 120,
		width: 'auto',
		transform: [{ rotate: '15deg' }],
	},
	INCHEON: {
		resizeMode: 'contain',
		transform: [{ rotate: '0deg' }],
		height: 140,
		width: 'auto',
	},
	JEJU: {
		resizeMode: 'contain',
		transform: [{ rotate: '-1deg' }],
		height: 120,
		width: 'auto',
		flex: 1,
	},
	JEONBUK: {
		resizeMode: 'contain',
		height: 120,
		width: 'auto',
		transform: [{ rotate: '-45deg' }],
	},
	JEONNAM: {
		resizeMode: 'contain',
		height: 120,
		width: 'auto',
		transform: [{ rotate: '-5deg' }],
	},
	ULSAN: {
		resizeMode: 'contain',
		height: 120,
		width: 'auto',
		transform: [{ rotate: '5deg' }],
	},
});

export default StampScreen;
