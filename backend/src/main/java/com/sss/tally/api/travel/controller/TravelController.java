package com.sss.tally.api.travel.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.travel.dto.TravelDto;
import com.sss.tally.domain.travel.service.TravelService;
import com.sss.tally.domain.travelgroup.service.TravelGroupService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel")
public class TravelController {
	private final TravelService travelService;
	private final TravelGroupService travelGroupService;
	@PostMapping
	public ResponseEntity<TravelDto.TravelCreateRespDto> createTravel(Authentication authentication, @RequestBody TravelDto.TravelCreateDto travelCreateDto){
		TravelDto.TravelCreateRespDto travel = travelService.createTravel(authentication, travelCreateDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(travel);
	}

	@GetMapping
	public ResponseEntity<List<TravelDto>> getTravelList(Authentication authentication, @RequestParam("type")String type, Pageable pageable){
		return ResponseEntity.status(HttpStatus.OK).body(travelService.getTravelList(authentication, type, pageable));
	}

	@GetMapping("/info")
	public ResponseEntity<List<TravelDto.TravelNotStartDto>> getNotStartTravel(Authentication authentication){
		List<TravelDto.TravelNotStartDto> notStartTravel = travelService.getNotStartTravel(authentication);
		return ResponseEntity.status(HttpStatus.OK).body(notStartTravel);
	}

	@GetMapping("/{travelId}")
	public ResponseEntity<TravelDto.TravelDetailDto> getTravelDetail(Authentication authentication, @PathVariable Long travelId){
		TravelDto.TravelDetailDto travelDetail = travelService.getTravelDetail(authentication, travelId);
		return ResponseEntity.status(HttpStatus.OK).body(travelDetail);

	}

	@PatchMapping("/visible")
	public ResponseEntity<String> modifyTravelVisible(Authentication authentication, @RequestBody TravelDto.TravelVisibleReqDto travelVisibleReqDto){
		travelGroupService.modifyTravelVisible(authentication, travelVisibleReqDto);
		return ResponseEntity.status(HttpStatus.OK).body("OK");
	}

	@GetMapping("/invisible")
	public ResponseEntity<List<TravelDto>> getTravelInvisibleList(Authentication authentication){
		List<TravelDto> invisibles = travelService.getInvisibleTravelList(authentication);
		return ResponseEntity.status(HttpStatus.OK).body(invisibles);
	}

	@GetMapping("/visit/count")
	public ResponseEntity<TravelDto.TravelVisitRespDto> getVisitLocationList(Authentication authentication){
		TravelDto.TravelVisitRespDto travelVisitCount = travelService.getTravelVisitCount(authentication);
		return ResponseEntity.status(HttpStatus.OK).body(travelVisitCount);
	}
}
