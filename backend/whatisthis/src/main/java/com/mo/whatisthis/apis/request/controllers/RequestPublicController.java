package com.mo.whatisthis.apis.request.controllers;

import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.apis.request.requests.RequestRegisterRequest;
import com.mo.whatisthis.apis.request.responses.RequestFindByCustomerResponse;
import com.mo.whatisthis.apis.request.services.RequestService;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/guest/request")
@Tag(name = "3. InspectionRequest")
@RequiredArgsConstructor
public class RequestPublicController {

    private final RequestService requestService;

    @Operation(summary = "비회원의 점검요청 신청", tags = {"3. InspectionRequest"})
    @PostMapping(value = "", consumes = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<SuccessResponse<String>> createRequest(
        @Valid @RequestPart RequestRegisterRequest requestRegisterRequest,
        @RequestPart("warrant") MultipartFile warrantFile) throws IOException {

        requestService.createRequest(requestRegisterRequest, warrantFile);

        return createSuccessResponse(SuccessCode.CREATED, "Create Customer's Inspection Request");
    }

    @Operation(summary = "비회원의 점검요청 확인", tags = {"3. InspectionRequest"})
    @GetMapping("/verification")
    public ResponseEntity<SuccessResponse<RequestFindByCustomerResponse>> getRequestByPhone(
        @RequestParam String requesterPhone) {

        //TODO: 확인필요 - 해당 로직이 직원이 조회할 때도 동일할 수 있음
        RequestFindByCustomerResponse requestFindByCustomerResponse = requestService.findRequestForCustomer(
            requesterPhone);

        return createSuccessResponse(SuccessCode.OK, requestFindByCustomerResponse);
    }

    @Operation(summary = "비회원의 점검요청 취소", tags = {"3. InspectionRequest"})
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<SuccessResponse<String>> cancelRequest(
        @PathVariable("id") Long requestId) {

        requestService.cancelRequest(requestId);

        return createSuccessResponse(SuccessCode.OK,
            "Update Inspection Request to Cancel by Customer");
    }


}