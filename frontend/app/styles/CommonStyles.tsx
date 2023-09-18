import React from 'react';
import { StyleSheet } from 'react-native';

export type textStyleProps = {
	color?: string;
	mBottom?: number;
	mLeft?: number;
	mRight?: number;
	mTop?: number;
	align?: any;
	size?: number;
};

export const TextStyles = (props?: textStyleProps) =>
	StyleSheet.create({
		header: {
			fontFamily: '',
			fontSize: 28,
			color: props?.color ? props.color : '#232323',
			textAlign: props?.align ? props.align : 'center',
		},
		title: {
			fontFamily: '',
			fontSize: 20,
			color: props?.color ? props.color : '#232323',
			textAlign: props?.align ? props.align : 'center',
		},
		regular: {
			fontFamily: 'Pretendard-regular',
			fontSize: 17,
			color: props?.color ? props.color : '#232323',
			textAlign: props?.align ? props.align : 'center',
		},
		medium: {
			fontFamily: 'Pretendard-Medium',
			fontSize: 17,
			color: props?.color ? props.color : '#232323',
			textAlign: props?.align ? props.align : 'center',
		},
		Bold: {
			fontFamily: 'Pretendard-Bold',
			fontSize: props?.size ? props?.size : 17,
			color: props?.color ? props.color : '#232323',
			textAlign: props?.align ? props.align : 'center',
		},
		Light: {
			fontFamily: 'Pretendard-Light',
			fontSize: 17,
			color: props?.color ? props.color : '#232323',
			textAlign: props?.align ? props.align : 'center',
		},
		small: {
			fontFamily: '',
			fontSize: 14,
			color: props?.color ? props.color : '#232323',
			textAlign: props?.align ? props.align : 'center',
		},
	});
