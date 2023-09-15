import React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Dimensions } from 'react-native';
import { HomeStyles, ViewStyles } from '../../styles/HomeStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Button } from 'react-native-paper';
import Carousel from '../../components/Carousel';

function AlertScreen() {
	const screenWidth = Math.round(Dimensions.get('window').width);
	const PAGES = [
		{
			num: 1,
			color: '#86E3CE',
		},
		{
			num: 2,
			color: '#D0E6A5',
		},
		{
			num: 3,
			color: '#FFDD94',
		},
		{
			num: 4,
			color: '#FA897B',
		},
		{
			num: 5,
			color: '#CCABD8',
		},
	];
	return (
		<View style={HomeStyles.container}>
			<ScrollView style={HomeStyles.scrollView}>
				<View style={ViewStyles().header}>
					<Text>
						<Icon name="settings-sharp" size={24} color="#4F8EF7" />
					</Text>
				</View>
				<View style={ViewStyles({ flexDirection: 'row', alignItems: 'center' }).box}>
					<View style={ViewStyles({ height: 120, alignItems: 'center' }).innerProfile}>
						<Avatar.Image
							style={{ backgroundColor: 'transparent' }}
							size={54}
							source={require('../../assets/images/kakao.png')}
						/>
						<Text>김싸피</Text>
					</View>
					<View style={ViewStyles({ height: 120, alignItems: 'center' }).innerProfile}>
						<Text>0</Text>
						<Text>국내</Text>
					</View>
					<View style={ViewStyles({ height: 120, alignItems: 'center' }).innerProfile}>
						<Text>0</Text>
						<Text>해외</Text>
					</View>
				</View>
				<View style={ViewStyles({ height: 300 }).box}>
					<View style={{ alignItems: 'flex-start' }}>
						<Text style={{ fontFamily: '', fontSize: 20 }}>🇩🇪 싸피 졸업 여행 D-6</Text>
						<Text style={{ fontFamily: '', fontSize: 16 }}>2023.09.11 ~ 2023.09.15</Text>
					</View>
					<View style={{ alignItems: 'flex-start' }}>
						<Text style={{ fontFamily: '', fontSize: 24 }}>675,455원</Text>
					</View>
					<View style={ViewStyles().boxMate}>
						<Avatar.Image
							style={ViewStyles({ left: 0 }).avatarMate}
							size={32}
							source={require('../../assets/images/kakao.png')}
						/>
						<Avatar.Image
							style={ViewStyles({ left: 16 }).avatarMate}
							size={32}
							source={require('../../assets/images/kakao.png')}
						/>
						<Avatar.Image
							style={ViewStyles({ left: 32 }).avatarMate}
							size={32}
							source={require('../../assets/images/kakao.png')}
						/>
					</View>
					<View
						style={{
							justifyContent: 'flex-end',
							flex: 1,
							// backgroundColor: 'red',
						}}
					>
						<Button
							icon="check"
							mode="text"
							// buttonColor="#000000"
							onPress={() => console.log('Pressed')}
						>
							체크리스트
						</Button>
					</View>
				</View>
				<Carousel gap={16} offset={36} pages={PAGES} pageWidth={screenWidth - (16 + 36) * 2} />
				<View style={ViewStyles({ justifyContent: 'flex-start' }).box}>
					<Text style={{ fontFamily: '', fontSize: 20, fontWeight: 'bold' }}>여행 도우미</Text>
					<Text style={{ fontFamily: '', fontSize: 16 }}>여행에 도움이 되는정보를 찾아보세요</Text>
					<View
						style={
							ViewStyles({
								justifyContent: 'flex-end',
								alignItems: 'flex-end',
							}).box
						}
					>
						<Text>
							<Icon name="information-circle-outline" size={24} color="#4F8EF7" />
						</Text>
					</View>
				</View>
				<View style={ViewStyles({ color: 'green' }).box} />
				<View style={ViewStyles({ color: 'blue' }).box} />
				<View style={ViewStyles({ color: 'red' }).box} />
				<View style={ViewStyles({ color: 'blue' }).box} />
			</ScrollView>

			{/* <View style={styles.Box1} />
      <View style={styles.viewRowContainer}>
        <View style={styles.Box2} />
        <View style={styles.Box3} />
      </View> */}
		</View>
	);
}

export default AlertScreen;
