import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Modal, Pressable, Text, FlatList } from 'react-native';
import { Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import LanguageItem from './LanguageItem';
import { TranslateInfo, TranslateInfos } from '../../model/translate';
import { TextStyles } from '../../styles/CommonStyles';
import { ViewStyles } from '../../styles/HomeStyles';

function TranslateBox() {
	const [value, setValue] = useState('');
	const [result, setResult] = useState('');

	const [valueModalVisible, setValueModalVisible] = useState(false);
	const [traslate, setTranslate] = useState<TranslateInfo>({
		language: '한국어',
		language_code: 'ko',
	});

	const [resultModalVisible, setResultModalVisible] = useState(false);
	const [reSultTraslate, setResultTranslate] = useState<TranslateInfo>({
		language: '영어',
		language_code: 'en',
	});

	return (
		<>
			<View
				style={
					ViewStyles({
						alignItems: 'center',
						height: 500,
					}).box
				}
			>
				<View style={[styles.contentView, { marginBottom: 15 }]}>
					<View style={styles.bottomBorder}>
						<Button
							icon="chevron-down"
							mode="text"
							textColor="#232323"
							contentStyle={{
								width: '30%',
								flexDirection: 'row-reverse',
							}}
							onPress={() => setValueModalVisible(true)}
						>
							{traslate.language}
						</Button>
					</View>

					<TextInput value={value} onChangeText={setValue} style={styles.textInput} />

					<View style={styles.topBorder}>
						<Button mode="contained" style={styles.btn}>
							번역하기
						</Button>
					</View>
				</View>
				<View style={styles.contentView}>
					<View style={styles.bottomBorder}>
						<Button
							icon="chevron-down"
							mode="text"
							textColor="#232323"
							contentStyle={{
								width: '30%',
								flexDirection: 'row-reverse',
							}}
							onPress={() => setResultModalVisible(true)}
						>
							{reSultTraslate.language}
						</Button>
					</View>
					<TextInput value={result} style={styles.textInput} editable={false} />
				</View>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={valueModalVisible}
				onRequestClose={() => {
					setValueModalVisible(!valueModalVisible);
				}}
			>
				<Pressable
					style={{ backgroundColor: '#00000070', flex: 1 }}
					onPress={() => setValueModalVisible(!valueModalVisible)}
				/>
				<View style={styles.modalView}>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
						<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).regular, flex: 1 }}>
							언어 선택
						</Text>
						<Icon
							name="close"
							size={32}
							color={'#666666'}
							onPress={() => setValueModalVisible(!valueModalVisible)}
						/>
					</View>
					<View style={styles.innerModalView}>
						<FlatList
							data={TranslateInfos}
							renderItem={({ item }) => (
								<LanguageItem
									language={item.language}
									language_code={item.language_code}
									cur_language_code={traslate.language_code}
									setter={setTranslate}
									modalSetter={setValueModalVisible}
								/>
							)}
							keyExtractor={(item) => item.language_code}
						/>
					</View>
				</View>
			</Modal>
			<Modal
				animationType="slide"
				transparent={true}
				visible={resultModalVisible}
				onRequestClose={() => {
					setResultModalVisible(!resultModalVisible);
				}}
			>
				<Pressable
					style={{ backgroundColor: '#00000070', flex: 1 }}
					onPress={() => setResultModalVisible(!resultModalVisible)}
				/>
				<View style={styles.modalView}>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
						<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).regular, flex: 1 }}>
							언어 선택
						</Text>
						<Icon
							name="close"
							size={32}
							color={'#666666'}
							onPress={() => setResultModalVisible(!resultModalVisible)}
						/>
					</View>
					<View style={styles.innerModalView}>
						<FlatList
							data={TranslateInfos}
							renderItem={({ item }) => (
								<LanguageItem
									language={item.language}
									language_code={item.language_code}
									cur_language_code={reSultTraslate.language_code}
									setter={setResultTranslate}
									modalSetter={setResultModalVisible}
								/>
							)}
							keyExtractor={(item) => item.language_code}
						/>
					</View>
				</View>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	contentView: {
		borderWidth: 1,
		borderColor: '#A0A0A0',
		width: '100%',
		height: 200,
		borderRadius: 16,
	},
	textInput: {
		padding: 20,
		flex: 1,
		...TextStyles({ align: 'left' }).regular,
	},
	btn: {
		...TextStyles().regular,
		backgroundColor: '#91C0EB',
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
	},
	bottomBorder: {
		borderBottomWidth: 1,
		borderBottomColor: '#A0A0A0',
	},
	topBorder: {
		borderTopWidth: 1,
		borderTopColor: '#A0A0A0',
	},
	modalView: {
		width: '100%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: 'white',
		padding: 35,
		position: 'absolute',
		bottom: 0,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: '50%',
	},
	innerModalView: {
		width: '100%',
		marginBottom: 40,
	},
});

export default TranslateBox;
