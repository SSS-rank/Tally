package com.sss.tally.domain.ocr.service;

import java.io.File;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OcrServiceImpl implements OcrService {
	public String Ocr(File imageFile) {
		Tesseract tesseract = new Tesseract();

		// Tesseract의 학습 데이터가 있는 경로를 설정합니다.
		// 이 경로에는 "eng.traineddata"와 같은 학습 데이터 파일이 있어야 합니다.
		tesseract.setDatapath("src/main/resources/tessdata/");

		try {
			System.out.println("doOcr" + imageFile);
			return tesseract.doOCR(imageFile);
		} catch (TesseractException e) {
			e.printStackTrace();
			return "Error while reading image";
		}
	}
}