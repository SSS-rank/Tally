import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

function SplashScreen() {
	return (
		<View style={styles.test}>
			<Image
				style={styles.splashAnimation}
				source={{ uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/splash_tally.gif' }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	test: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
	splashAnimation: {
		width: '100%',
		height: '100%',
	},
});

export default SplashScreen;
