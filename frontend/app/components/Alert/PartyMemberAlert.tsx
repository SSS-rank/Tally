import { Alert } from 'react-native';

function PartyMemberAlert() {
	Alert.alert('결제 참여자를 지정해주세요', '', [{ text: '확인' }]);
}

export default PartyMemberAlert;
