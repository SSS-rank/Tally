import React, { useState } from 'react';
import { View, Pressable, Platform, ImageURISource, Image } from 'react-native';
import Config from 'react-native-config';
import {
	launchImageLibrary,
	launchCamera,
	CameraOptions,
	ImageLibraryOptions,
	ImagePickerResponse,
} from 'react-native-image-picker';

import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { OcrData } from '../../model/payment';
import getCurrencyType from '../../services/getCurrencyType';
import UploadModeModal from '../Modal/UploadModeModal';

const imagePickerOption = {
	mediaType: 'photo',
	maxWidth: 768,
	maxHeight: 768,
	includeBase64: Platform.OS === 'android',
};

interface CameraButtonProps {
	handleOcrData: (ocr_data: OcrData) => void;
}
function CameraButton({ handleOcrData }: CameraButtonProps) {
	const [img, setImg] = useState<ImageURISource>();

	interface RawData {
		infer_text: string;
		name: string;
	}

	const formatData = (rawData: RawData[]): OcrData => {
		const formattedData: OcrData = {
			title: '',
			amount: '',
			date: '',
			cur_type: '',
		};

		rawData.forEach((item) => {
			switch (item.name) {
				case 'title':
					formattedData.title = item.infer_text;
					break;
				case 'amount':
					formattedData.amount = item.infer_text;
					break;
				case 'date':
					formattedData.date = item.infer_text;
					break;
				default:
					break;
			}
		});

		const currencyType = getCurrencyType(formattedData.amount);
		formattedData.cur_type = currencyType;
		return formattedData;
	};

	const onPickImage = (res: ImagePickerResponse) => {
		if (res.didCancel || !res) {
			return;
		}
		if (res.assets) {
			const formData = new FormData();
			formData.append(
				'message',
				JSON.stringify({
					version: 'V2',
					requestId: 'string', //uuid로 아무 값 넣으면 된다123456
					timestamp: 0, //현재 타임스탬프  근데 0이라도 써도 잘 나옴
					images: [
						{
							format: 'jpg', //사진 포맷 데이터 형식 png, jpg 다 됨
							name: 'test 1', //이미지 이름 res.assets[0].fileName 이거 넣으면 될듯??
							// templateIds: [26521], //일본스벅 [26523], 일본 편의점 [26524]
						},
					],
				}),
			);
			//리액트 네이티브 사진 파일
			formData.append('file', {
				uri: res.assets[0].uri,
				type: res.assets[0].type,
				name: res.assets[0].fileName,
			});
			setImg({ uri: res.assets[0].uri });

			axios
				.post(
					'https://dc4ulqm65h.apigw.ntruss.com/custom/v1/25277/e15a4310092ca2dce262ee02cb67f759c8194f3fa01d3508a353b57ca235656e/infer',
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							'X-OCR-SECRET': Config.OCR_KEY,
						},
					},
				)
				.then((result) => {
					if (result.status === 200) {
						console.log(result.data.images[0]);
						const extracted_data = result.data.images[0].fields.map((item: any) => {
							return { infer_text: item.inferText, name: item.name };
						});
						handleOcrData(formatData(extracted_data));
					}
				})
				.catch((e) => {
					const error_ocr_data = {
						title: 'error',
						date: 'error',
						amount: 'error',
						cur_type: 'error',
					};
					handleOcrData(error_ocr_data);
				});
		}
	};

	const onLaunchCamera = () => {
		launchCamera(imagePickerOption as CameraOptions, onPickImage);
	};

	const onLaunchImageLibrary = () => {
		launchImageLibrary(imagePickerOption as ImageLibraryOptions, onPickImage);
	};

	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const modalOpen = () => {
		if (Platform.OS === 'android') {
			setModalVisible(true);
		} else {
			// Handle iOS case if needed
		}
	};

	return (
		<>
			<View>
				<Pressable onPress={modalOpen}>
					<Icon name="camera-alt" color="black" size={24} />
				</Pressable>
			</View>
			<UploadModeModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				onLaunchCamera={onLaunchCamera}
				onLaunchImageLibrary={onLaunchImageLibrary}
			/>
		</>
	);
}

export default CameraButton;
