import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

function SunnyAnimation() {
	const sun = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		createSunAnimation();
	}, []);

	const createSunAnimation = () => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(sun, {
					toValue: 0.3,
					duration: 2000,
					easing: Easing.linear,
					useNativeDriver: false,
				}),
				Animated.delay(1000),
				Animated.timing(sun, {
					toValue: 0,
					duration: 2000,
					easing: Easing.linear,
					useNativeDriver: false,
				}),
			]),
		).start();
	};

	return (
		<View style={styles.sun}>
			<Animated.View
				style={[
					styles.sunOut,
					{
						opacity: sun,
					},
				]}
			></Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	sun: {
		width: 50,
		height: 50,
		backgroundColor: '#FFEE44',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 40,
		right: 40,
	},
	sunOut: {
		width: 80,
		height: 80,
		backgroundColor: '#FFEE44',
		borderRadius: 50,
	},
});

export default SunnyAnimation;
