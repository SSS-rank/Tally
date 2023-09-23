import React from 'react';
import { View, Text } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';

import TransferPasswordInput from '../../components/TransferPasswordInput/TransferPasswordInput';
import { HomeStackProps } from '../../navigation/HomeStack';
import { transferPasswordState } from '../../recoil/recoil';

type TransferPasswrodConfirmScreenProps = NativeStackScreenProps<HomeStackProps, 'AuthAccount'>;

function TransferPasswrodConfirmScreen({ navigation }: TransferPasswrodConfirmScreenProps) {
	const transferPassword = useRecoilValue(transferPasswordState);

	// TransferPasswordInput에서 입력한 비밀번호 전달
	const onSubmit = (password: string) => {
		console.log('onSubmit confirm');

		if (transferPassword === password) {
			console.log('비밀번호 확인');
			// TODO : 첫 번째 계좌 추가
			// TODO : 계좌 추가 성공 시 계좌 목록 페이지로 이동
			// navigation.navigate('Account');
		}
	};
	return <TransferPasswordInput text="비밀번호를 다시 입력해주세요" onSubmit={onSubmit} />;
}

export default TransferPasswrodConfirmScreen;
