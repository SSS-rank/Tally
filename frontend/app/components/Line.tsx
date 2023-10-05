import React from 'react';
import { View } from 'react-native';

export type lineProp = {
	borderColor?: string;
	marginVertical?: number;
	marginHorizontal?: number;
	marginTop?: number;
};
const Line = (props?: lineProp) => {
	return (
		<View
			style={{
				borderStyle: 'solid',
				borderWidth: 0.5,
				borderColor: props?.borderColor ? props.borderColor : '#F0F0F0',
				marginTop: props?.marginTop,
				marginVertical: props?.marginVertical,
				marginHorizontal: props?.marginHorizontal,
			}}
		/>
	);
};

export default Line;
