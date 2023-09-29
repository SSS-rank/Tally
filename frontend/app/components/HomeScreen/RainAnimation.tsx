import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

function RainAnimation() {
	const rainDrops = useRef<Animated.Value[]>([]);

	useEffect(() => {
		createSnowAnimation();
	}, []);

	const createSnowAnimation = () => {
		const animations: Animated.Value[] = [];
		for (let i = 0; i < 50; i++) {
			const animation = new Animated.Value(0);
			const duration = 1000 + Math.random() * 1000;
			Animated.loop(
				Animated.timing(animation, {
					toValue: 1,
					duration,
					easing: Easing.linear,
					useNativeDriver: false,
				}),
			).start();
			animations.push(animation);
		}

		rainDrops.current = animations;
	};

	const drop = (): any => {
		return rainDrops.current.map((animation, index) => {
			const topPosition = animation.interpolate({
				inputRange: [0, 1],
				outputRange: [-300, 240],
			});

			const leftPosition = Math.random() * 350 - 20;
			const opacity = Math.random();

			return (
				<Animated.View
					key={index}
					style={[styles.rainDrop, { top: topPosition, left: leftPosition, opacity }]}
				></Animated.View>
			);
		});
	};
	return <View>{drop()}</View>;
}

const styles = StyleSheet.create({
	rainDrop: {
		width: 2,
		height: 16,
		backgroundColor: '#ffffff',
		borderRadius: 50,
		position: 'absolute',
	},
});

export default RainAnimation;
