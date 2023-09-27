package com.sss.tally.api.ocr.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sss.tally.domain.ocr.service.OcrService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ocr")
public class OcrController {
	private final OcrService ocrService;

	@PostMapping("/upload")
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
		File tempFile = File.createTempFile("temp", null);
		file.transferTo(tempFile);
		String aa = ocrService.Ocr(tempFile);
		return ResponseEntity.status(HttpStatus.OK).body(aa);

	}

}
