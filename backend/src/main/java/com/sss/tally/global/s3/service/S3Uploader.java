package com.sss.tally.global.s3.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.ImageException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Component
public class S3Uploader {
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final AmazonS3Client amazonS3Client;

	public String upload(MultipartFile multipartFile) throws IOException {
		File uploadFile = convert(multipartFile).orElseThrow(
			()->new ImageException(ErrorCode.CONVERT_FILE_FAIL)
		);
		return upload(uploadFile);
	}

	private String upload(File uploadFile){
		String fileName = UUID.randomUUID()+"."+uploadFile.getName();
		String uploadImageUrl = putS3(uploadFile, fileName);

		if(!uploadFile.delete())
			throw new ImageException(ErrorCode.IMAGE_DELETE_FAIL);
		return uploadImageUrl;
	}

	private String putS3(File uploadFile, String fileName){
		amazonS3Client.putObject(
			new PutObjectRequest(bucket, fileName, uploadFile)
				.withCannedAcl(CannedAccessControlList.PublicRead)
		);
		return amazonS3Client.getUrl(bucket, fileName).toString();
	}

	private Optional<File> convert(MultipartFile file) throws IOException {
		File convertFile = new File(file.getOriginalFilename());
		if(convertFile.createNewFile()){
			try(FileOutputStream fos = new FileOutputStream(convertFile)){
				fos.write(file.getBytes());
			}
			return Optional.of(convertFile);
		}
		return Optional.empty();
	}
}
