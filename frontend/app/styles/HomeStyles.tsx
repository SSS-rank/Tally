import React from 'react';
import { StyleSheet, View } from 'react-native';
export const HomeStyles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingTop: StatusBar.currentHeight,
		// padding: 15,
		backgroundColor: '#FCF7EC',
	},
	scrollView: {
		// backgroundColor: 'skyblue',
		paddingHorizontal: 15,
	},
});

export type styleProps = {
	height?: number;
	color?: string;
	mBottom?: number;
	bRadius?: number;
	justifyContent?: any;
	alignItems?: any;
	flexDirection?: any;
	left?: number;
};
export const ViewStyles = (props?: styleProps) =>
	StyleSheet.create({
		header: {
			flexDirection: props?.flexDirection ? props.flexDirection : 'column',
			height: props?.height ? props.height : 50,
			backgroundColor: props?.color ? props.color : 'transport',
			borderRadius: props?.bRadius ? props.bRadius : 10,
			justifyContent: props?.justifyContent ? props.justifyContent : 'center',
			alignItems: props?.alignItems ? props.alignItems : 'flex-end',
			padding: 10,
			flex: 1,
		},
		box: {
			flexDirection: props?.flexDirection ? props.flexDirection : 'column',
			height: props?.height ? props.height : 150,
			backgroundColor: props?.color ? props.color : 'white',
			marginBottom: props?.mBottom ? props.mBottom : 10,
			borderRadius: props?.bRadius ? props.bRadius : 10,
			elevation: 1,
			justifyContent: props?.justifyContent ? props.justifyContent : 'center',
			alignItems: props?.alignItems ? props.alignItems : 'flex-start',
			padding: 20,
			flex: 1,
		},
		innerProfile: {
			flexDirection: props?.flexDirection ? props.flexDirection : 'column',
			//   height: props.height ? props.height : 150,
			backgroundColor: props?.color ? props.color : 'transparent',
			justifyContent: props?.justifyContent ? props.justifyContent : 'center',
			alignItems: props?.alignItems ? props.alignItems : 'flex-start',
			flex: 1,
		},

		avatarMate: {
			backgroundColor: 'white',
			left: props?.left,
			position: 'absolute',
		},

		boxMate: {
			//   flexDirection: 'row',
			alignItems: 'flex-start',
			marginTop: 10,
		},
	});
