import { Alert } from 'react-native';

function TotAmountAlert() {
	Alert.alert('입력한 금액의 총합이 총 결제 금액과 다릅니다', '', [{ text: '확인' }]);
}

export default TotAmountAlert;
