import React, { RefObject, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { TextStyles } from '../../styles/CommonStyles';

interface TransferPasswordInputProp {
	text: string;
	onSubmit: (value: string) => void;
}

function TransferPasswordInput({ text, onSubmit }: TransferPasswordInputProp) {
	const input1: RefObject<TextInput> = useRef<TextInput>(null);
	const input2: RefObject<TextInput> = useRef<TextInput>(null);
	const input3: RefObject<TextInput> = useRef<TextInput>(null);
	const input4: RefObject<TextInput> = useRef<TextInput>(null);
	const input5: RefObject<TextInput> = useRef<TextInput>(null);
	const input6: RefObject<TextInput> = useRef<TextInput>(null);

	const [value1, setValue1] = useState('');
	const [value2, setValue2] = useState('');
	const [value3, setValue3] = useState('');
	const [value4, setValue4] = useState('');
	const [value5, setValue5] = useState('');
	const [value6, setValue6] = useState('');

	const handleSubmit = () => {
		onSubmit('' + value1 + value2 + value3 + value4 + value5 + value6);
	};

	return (
		<View style={styles.viewContainer}>
			<Text style={styles.text}>{text}</Text>
			<View style={styles.inputBox}>
				<TextInput
					style={styles.input}
					keyboardType="number-pad"
					textAlign="center"
					autoFocus={true}
					secureTextEntry={true}
					ref={input1}
					value={value1}
					blurOnSubmit={false}
					onChangeText={(input: string) => {
						setValue1(input);
						if (input !== '') input2.current?.focus();
					}}
				/>
				<TextInput
					style={styles.input}
					keyboardType="number-pad"
					textAlign="center"
					secureTextEntry={true}
					ref={input2}
					value={value2}
					blurOnSubmit={false}
					onChangeText={(input: string) => {
						setValue2(input);
						if (input !== '') input3.current?.focus();
					}}
				/>
				<TextInput
					style={styles.input}
					keyboardType="number-pad"
					textAlign="center"
					secureTextEntry={true}
					ref={input3}
					value={value3}
					blurOnSubmit={false}
					onChangeText={(input: string) => {
						setValue3(input);
						if (input !== '') input4.current?.focus();
					}}
				/>
				<TextInput
					style={styles.input}
					keyboardType="number-pad"
					textAlign="center"
					secureTextEntry={true}
					ref={input4}
					value={value4}
					blurOnSubmit={false}
					onChangeText={(input: string) => {
						setValue4(input);
						if (input !== '') input5.current?.focus();
					}}
				/>
				<TextInput
					style={styles.input}
					keyboardType="number-pad"
					textAlign="center"
					secureTextEntry={true}
					ref={input5}
					value={value5}
					blurOnSubmit={false}
					onChangeText={(input: string) => {
						setValue5(input);
						if (input !== '') input6.current?.focus();
					}}
				/>
				<TextInput
					style={styles.input}
					keyboardType="number-pad"
					textAlign="center"
					secureTextEntry={true}
					ref={input6}
					value={value6}
					onChangeText={setValue6}
					onSubmitEditing={handleSubmit}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		backgroundColor: '#91C0EB',
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		position: 'absolute',
		left: 10,
		top: 10,
		color: '#ffffff',
	},
	text: {
		...TextStyles({ color: '#ffffff' }).title,
	},
	inputBox: {
		flexDirection: 'row',
		marginTop: 30,
		marginBottom: 60,
		justifyContent: 'space-around',
	},
	input: {
		...TextStyles({ color: '#ffffff' }).regular,
		flex: 1,
		borderWidth: 0,
		borderBottomWidth: 2,
		borderColor: '#ffffff',
		marginHorizontal: 5,
	},
});

export default TransferPasswordInput;
