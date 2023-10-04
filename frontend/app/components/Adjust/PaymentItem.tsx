import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { responseDetail } from '../../model/adjust';
import { TextStyles } from '../../styles/CommonStyles';

const PaymentItem = ({ my_amount, all_amount, payment_date, payment_name }: responseDetail) => {
	return (
		<View style={{ flexDirection: 'row', marginBottom: 10, marginHorizontal: 5 }}>
			<View>
				<Text style={TextStyles({ align: 'left' }).regular}>{payment_name}</Text>
				<Text style={TextStyles({ align: 'left', color: '#666666' }).small}>{payment_date}</Text>
			</View>
			<View style={{ flex: 1 }}>
				<Text style={TextStyles({ align: 'right', weight: 'bold' }).regular}>
					-{my_amount?.toLocaleString()}원
				</Text>
				<Text style={TextStyles({ align: 'right', color: '#A0A0A0' }).small}>
					결제 금액 : {all_amount?.toLocaleString()}원
				</Text>
			</View>
		</View>
	);
};
export default PaymentItem;
