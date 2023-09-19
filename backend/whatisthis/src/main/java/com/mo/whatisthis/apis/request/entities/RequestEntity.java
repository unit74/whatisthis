package com.mo.whatisthis.apis.request.entities;

import com.mo.whatisthis.apis.member.entities.MemberEntity;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "requests")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class RequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = true)
    @Setter
    private MemberEntity employee;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String addressDetail;

    @Column(nullable = false)
    private String requesterName;

    @Column(nullable = false)
    private String requesterPhone;

    @Column(nullable = true)
    private String requestContent;

    @Column(nullable = false)
    private LocalDate inspectionStart;

    @Column(nullable = false)
    private LocalDate inspectionEnd;

    @Column(nullable = true)
    @Setter
    private LocalDate inspectionDate;

    @Column(nullable = true)
    @Enumerated(EnumType.STRING)
    @Setter
    private State status; // 초기값: WAITING_FOR_PAY

    @Column(nullable = false)
    private LocalDateTime requestedAt;

    @Column(nullable = true)
    @Setter
    private String warrantUrl;

    @Builder
    public RequestEntity(String address, String addressDetail, String requesterName,
        String requesterPhone, String requestContent, LocalDate inspectionStart,
        LocalDate inspectionEnd) {
        this.address = address;
        this.addressDetail = addressDetail;
        this.requesterName = requesterName;
        this.requesterPhone = requesterPhone;
        this.requestContent = requestContent;
        this.inspectionStart = inspectionStart;
        this.inspectionEnd = inspectionEnd;
    }

    public enum State {
        WAITING_FOR_PAY, CANCELED, WAITING_INSPECTION_DATE,
        WAITING_FOR_INSPECTION, IN_PROGRESS, DONE
    }
}
