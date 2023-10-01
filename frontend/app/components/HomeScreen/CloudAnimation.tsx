import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

interface cloudType {
	type: string;
}

function CloudAnimation({ type }: cloudType) {
	const cloud = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		createSunAnimation();
	}, []);

	const createSunAnimation = () => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(cloud, {
					toValue: 1,
					duration: 2000,
					easing: Easing.linear,
					useNativeDriver: false,
				}),
				Animated.timing(cloud, {
					toValue: 0,
					duration: 2000,
					easing: Easing.linear,
					useNativeDriver: false,
				}),
			]),
			{ iterations: -1 },
		).start();
	};

	return (
		<Animated.View
			style={[
				styles.cloudContainer,
				{
					transform: [
						{
							translateY: cloud.interpolate({
								inputRange: [0, 1],
								outputRange: [-140, -125],
							}),
						},
					],
				},
			]}
		>
			<View
				style={[styles.cloud1, type === 'cloudy' ? { backgroundColor: '#cccccc' } : null]}
			></View>
			<View
				style={[styles.cloud2, type === 'cloudy' ? { backgroundColor: '#cccccc' } : null]}
			></View>
			<View
				style={[styles.cloud3, type === 'cloudy' ? { backgroundColor: '#cccccc' } : null]}
			></View>
			<View
				style={[styles.cloud4, type === 'cloudy' ? { backgroundColor: '#cccccc' } : null]}
			></View>
			<View
				style={[styles.cloud5, type === 'cloudy' ? { backgroundColor: '#cccccc' } : null]}
			></View>
			<View
				style={[styles.cloud6, type === 'cloudy' ? { backgroundColor: '#cccccc' } : null]}
			></View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	cloudContainer: {
		borderRadius: 50,
		position: 'absolute',
		right: 40,
	},
	cloud1: {
		backgroundColor: '#ffffff',
		width: 30,
		height: 30,
		position: 'absolute',
		top: 40,
		right: 40,
		borderRadius: 50,
	},
	cloud2: {
		backgroundColor: '#ffffff',
		width: 30,
		height: 30,
		position: 'absolute',
		top: 20,
		right: 25,
		borderRadius: 50,
	},
	cloud3: {
		backgroundColor: '#ffffff',
		width: 40,
		height: 40,
		position: 'absolute',
		top: 36,
		right: 15,
		borderRadius: 50,
	},
	cloud4: {
		backgroundColor: '#ffffff',
		width: 30,
		height: 30,
		position: 'absolute',
		top: 30,
		right: 5,
		borderRadius: 50,
	},
	cloud5: {
		backgroundColor: '#ffffff',
		width: 28,
		height: 28,
		position: 'absolute',
		top: 40,
		right: -10,
		borderRadius: 50,
	},
	cloud6: {
		backgroundColor: '#ffffff',
		width: 20,
		height: 20,
		position: 'absolute',
		top: 55,
		right: 5,
		borderRadius: 50,
	},
});

export default CloudAnimation;
