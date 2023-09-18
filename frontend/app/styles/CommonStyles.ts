import { StyleSheet } from 'react-native';

export type textStyleProps = {
	color?: string;
	align?: any;
	size?: number;
	weight: any;
	mBottom?: number;
	mLeft?: number;
	mRight?: number;
	mTop?: number;
};

export const TextStyles = (props?: textStyleProps) =>
	StyleSheet.create({
		header: {
			fontFamily: '',
			fontSize: 28,
			color: props?.color ? props.color : '#232323',
			fontWeight: props?.weight ? props?.weight : 'normal',
			textAlign: props?.align ? props.align : 'center',
			marginBottom: props?.mBottom,
			marginTop: props?.mTop,
			marginRight: props?.mTop,
			marginLeft: props?.mLeft,
		},
		title: {
			fontFamily: '',
			fontSize: 20,
			color: props?.color ? props.color : '#232323',
			textAlign: props?.align ? props.align : 'center',
			fontWeight: props?.weight ? props?.weight : 'normal',
			marginBottom: props?.mBottom,
			marginTop: props?.mTop,
			marginRight: props?.mTop,
			marginLeft: props?.mLeft,
		},
		regular: {
			fontFamily: 'Pretendard-regular',
			fontSize: 16,
			color: props?.color ? props.color : '#232323',
			textAlign: props?.align ? props.align : 'center',
			fontWeight: props?.weight ? props?.weight : 'normal',
			marginBottom: props?.mBottom,
			marginTop: props?.mTop,
			marginRight: props?.mTop,
			marginLeft: props?.mLeft,
		},
		medium: {
			fontFamily: 'Pretendard-Medium',
			fontSize: 17,
			color: props?.color ? props.color : '#232323',
			textAlign: props?.align ? props.align : 'center',
			fontWeight: props?.weight ? props?.weight : 'normal',
			marginBottom: props?.mBottom,
			marginTop: props?.mTop,
			marginRight: props?.mTop,
			marginLeft: props?.mLeft,
		},
		light: {
			fontFamily: 'Pretendard-Light',
			fontSize: 17,
			color: props?.color ? props.color : '#232323',
			textAlign: props?.align ? props.align : 'center',
			fontWeight: props?.weight ? props?.weight : 'normal',
			marginBottom: props?.mBottom,
			marginTop: props?.mTop,
			marginRight: props?.mTop,
			marginLeft: props?.mLeft,
		},
		small: {
			fontFamily: '',
			fontSize: 14,
			color: props?.color ? props.color : '#232323',
			textAlign: props?.align ? props.align : 'center',
			fontWeight: props?.weight ? props?.weight : 'normal',
			marginBottom: props?.mBottom,
			marginTop: props?.mTop,
			marginRight: props?.mTop,
			marginLeft: props?.mLeft,
		},
	});
