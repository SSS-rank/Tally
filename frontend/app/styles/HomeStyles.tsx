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
			alignItems: props?.alignItems ? props.alignItems : 'center',
			marginHorizontal: 20,
			marginVertical: 5,
		},
		banner: {
			flexDirection: props?.flexDirection ? props.flexDirection : 'column',
			backgroundColor: props?.color ? props.color : 'transport',
			justifyContent: props?.justifyContent ? props.justifyContent : 'center',
			padding: 5,
			marginHorizontal: 30,
			marginBottom: props?.mBottom ? props.mBottom : 20,
		},
		bannerButton: {
			flexDirection: 'row',
			backgroundColor: '#91C0EB',
			borderRadius: 10,
			justifyContent: 'center',
			marginBottom: props?.mBottom ? props.mBottom : 20,
			paddingHorizontal: 20,
			paddingVertical: 15,
			marginHorizontal: 30,
			elevation: 5,
		},
		box: {
			flexDirection: props?.flexDirection ? props.flexDirection : 'column',
			height: props?.height ? props.height : 150,
			backgroundColor: props?.color ? props.color : 'white',
			marginBottom: props?.mBottom ? props.mBottom : 20,
			borderRadius: props?.bRadius ? props.bRadius : 10,
			justifyContent: props?.justifyContent ? props.justifyContent : 'center',
			alignItems: props?.alignItems ? props.alignItems : 'flex-start',
			marginHorizontal: 35,
			elevation: 5,
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
			backgroundColor: 'transparent',
			left: props?.left,
			position: 'absolute',
		},

		boxMate: {
			//   flexDirection: 'row',
			alignItems: 'flex-start',
			marginTop: 10,
		},
	});
