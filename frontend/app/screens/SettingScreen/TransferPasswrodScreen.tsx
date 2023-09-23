import React from 'react';
import { View, Text } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSetRecoilState } from 'recoil';

import TransferPasswordInput from '../../components/TransferPasswordInput/TransferPasswordInput';
import { HomeStackProps } from '../../navigation/HomeStack';
import { transferPasswordState } from '../../recoil/recoil';

type AuthAccountScreenProps = NativeStackScreenProps<HomeStackProps, 'AuthAccount'>;

function TransferPasswordScreen({ navigation }: AuthAccountScreenProps) {
	const setTransferPassword = useSetRecoilState(transferPasswordState);

	// TransferPasswordInput에서 입력한 비밀번호 전달
	const onSubmit = (password: string) => {
		console.log('onSubmit');
		setTransferPassword(password);
		navigation.navigate('TransferPasswordConfirm');
	};
	return <TransferPasswordInput text="이체 비밀번호를 입력해주세요" onSubmit={onSubmit} />;
}

export default TransferPasswordScreen;
