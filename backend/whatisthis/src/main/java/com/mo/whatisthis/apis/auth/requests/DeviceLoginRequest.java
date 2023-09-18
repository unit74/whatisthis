package com.mo.whatisthis.apis.auth.requests;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DeviceLoginRequest {

    @NotNull
    @NotEmpty
    private String username; // 기기 일련번호

}