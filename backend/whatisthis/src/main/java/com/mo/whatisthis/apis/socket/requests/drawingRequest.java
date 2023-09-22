package com.mo.whatisthis.apis.socket.requests;

import com.sun.istack.NotNull;
import javax.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class drawingRequest {

    @NotNull
    @NotEmpty
    private String imageEncodingString;

}
