import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

function SnowAnimation() {
	const snowFlakes = useRef<Animated.Value[]>([]);
	const [isAnimationCreated, setIsAnimationCreated] = useState(false);

	useEffect(() => {
		createSnowAnimation();
	}, [isAnimationCreated]);

	const createSnowAnimation = () => {
		const animations: Animated.Value[] = [];
		for (let i = 0; i < 30; i++) {
			const animation = new Animated.Value(0);
			const duration = 5000 + Math.random() * 2000;
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

		snowFlakes.current = animations;
		setIsAnimationCreated(true);
	};

	const drop = (): any => {
		if (!isAnimationCreated) return;

		return snowFlakes.current.map((animation, index) => {
			const topPosition = animation.interpolate({
				inputRange: [0, 1],
				outputRange: [-300, 240],
			});

			const leftPosition = Math.random() * 350 - 20;
			const opacity = Math.random();

			return (
				<Animated.View
					key={index}
					style={[styles.snowFlake, { top: topPosition, left: leftPosition, opacity }]}
				></Animated.View>
			);
		});
	};
	return <View>{drop()}</View>;
}

const styles = StyleSheet.create({
	snowFlake: {
		width: 16,
		height: 16,
		backgroundColor: '#ffffff',
		borderRadius: 50,
		position: 'absolute',
	},
});

export default SnowAnimation;
