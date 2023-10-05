import React, { useEffect, useRef, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const Bill = () => {
	const animationRef = useRef<LottieView>(null);
	useFocusEffect(
		useCallback(() => {
			animationRef.current?.play();
		}, []),
	);
	return (
		<LottieView
			ref={animationRef}
			style={{
				height: '100%',
				width: '70%',
				// flex: 1,
				// backgroundColor: 'red',
				position: 'absolute',
				right: -30,
				bottom: -20,
			}}
			source={require('../../assets/animation/mainAnimation.json')}
			autoPlay
			loop={false}
			speed={0.7}
		/>
	);
};

export default Bill;
