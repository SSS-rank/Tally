import React from 'react';
import { Alert } from 'react-native';

import { useRecoilValue } from 'recoil';

import api from '../../api/api';
import TransferPasswordInput from '../../components/TransferPasswordInput/TransferPasswordInput';
import { PasswordScreenProps } from '../../model/tripNavigator';
import { CurTripInfoState } from '../../recoil/recoil';

function PaymentPasswordScreen({ navigation, route }: PasswordScreenProps) {
	const { adjustId, accountNumber } = route.params;
	const curTripInfo = useRecoilValue(CurTripInfoState);

	// TransferPasswordInput에서 입력한 비밀번호 전달
	const onSubmit = async (password: string) => {
		//입력한 비밀번호가 DB에 있는 것 과 일치하는지 확인
		checkPaymentPassword(password);
		// completeAdjust();
	};

	const checkPaymentPassword = async (password: string) => {
		const data = {
			transfer_password: password,
		};
		try {
			const res = await api.post(`/member/transfer-password`, data);
			if (res.status === 200) {
				console.log(res.data);
				if (res.data == true) {
					completeAdjust();
					navigation.navigate('AdjustTrip', { tripId: curTripInfo.id });
				} else {
					Alert.alert('비밀번호를 확인해주세요.');
				}
			}
		} catch (err: any) {
			console.error(err.response);
		}
	};

	const completeAdjust = async () => {
		const data = {
			calculate_group_uuid: adjustId,
			account_number: accountNumber,
		};
		try {
			const res = await api.post(`/calculate/accept`, data);
			if (res.status === 200) {
				console.log(res.data);
			}
		} catch (err: any) {
			console.error(err.response);
		}
	};

	return <TransferPasswordInput text="이체 비밀번호를 입력해주세요" onSubmit={onSubmit} />;
}

export default PaymentPasswordScreen;
