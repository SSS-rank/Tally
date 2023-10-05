import { Alert } from 'react-native';

function AdjustEmptyAlert() {
	Alert.alert('정산 가능한 내역이 없습니다.', '', [{ text: '확인' }]);
}

export default AdjustEmptyAlert;
