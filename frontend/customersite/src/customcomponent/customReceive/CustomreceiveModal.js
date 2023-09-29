import React, { useState } from "react";
import "./CustomreceiveModal.css";
import Address from "../addresscomp/address";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../calendar/calendar.css';
import Receivesuc from "./receivesuccess";
import { useMediaQuery } from "react-responsive";

function CustomreceiveModal() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isApplicationSuccess, setIsApplicationSuccess] = useState(false);
  const [selectedBank, setSelectedBank] = useState(""); // 추가: 선택된 은행명을 저장할 상태 변수

  const handleOpenAddressModal = () => {
    setShowAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    setShowAddressModal(false);
  };

  const [startDate, endDate] = dateRange;
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const handleInputAddress = (address) => {
    const formattedAddress = `${address.address_name} ${
      address.road_address && address.road_address.building_name
        ? `- ${address.road_address.building_name}`
        : ""
    }`;
    setSelectedAddress(formattedAddress);
    setShowAddressModal(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    setUploadedFileName(file.name);
  };

  const handleOpenFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const handleApply = async () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    if (!selectedAddress) {
      console.error('주소를 선택해주세요.');
      alert('주소를 선택해주세요.');
      return;
    }

    const addressDetail = document.querySelector('.input[placeholder="상세 주소를 입력해주십시오.(동 호수 포함)"]').value;
    const requestContent = document.querySelector('.input[placeholder="요청 사항을 입력해주십시오."]').value;
    const requesterName = document.querySelector('.input[placeholder="이름을 입력해주십시오."]').value;
    const requesterPhone = document.querySelector('.input[placeholder="연락처를 입력해주십시오."]').value;

    if (!addressDetail || !requestContent || !requesterName || !requesterPhone) {
      console.error('필수 정보를 모두 입력해주세요.');
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('warrant', uploadedFile);

    const jsonData = {
      address: selectedAddress,
      addressDetail: addressDetail,
      inspectionEnd: formattedEndDate,
      inspectionStart: formattedStartDate,
      requestContent: requestContent,
      requesterName: requesterName,
      requesterPhone: requesterPhone,
      selectedBank: selectedBank, // 추가: 선택된 은행명을 JSON 데이터에 추가
    };

    formData.append('requestRegisterRequest', JSON.stringify(jsonData));
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/guest/requests`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const contentDisposition = response.headers['content-disposition'];
      const fileName = contentDisposition.split(';')[1].trim().split('=')[1];
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsApplicationSuccess(true);
    } catch (error) {
      console.error('신청 처리 중 오류가 발생했다.', error);
      console.log(jsonData, formData);
    }
  };

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minDeviceWidth: 1224 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxDeviceWidth: 1223 });
    return isMobile ? children : null;
  };

  return (
    <div>
      <Desktop>
        <div className="customreceivediv desktop-view">
          <div className="custommodaltitle">
            <p>신청하기</p>
          </div>
          <div className="middlemodal">
            <div>
              <p className="desktoprectitle">신청자명</p>
              <input
                style={{ width: "40rem", height: "3rem" }}
                className="input"
                placeholder="이름을 입력해주십시오."
              />
              <p className="desktoprectitle">요청 사항</p>
              <input
                className="input"
                style={{ width: "40rem", height: "3rem" }}
                placeholder="요청 사항을 입력해주십시오."
              />
              {/* 은행명 드롭다운 */}
              <p className="desktoprectitle">은행명 :</p>
              <select
                className="input desk-cinput"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option value="">은행 선택</option>
                <option value="Bank 1">Bank 1</option>
                <option value="Bank 2">Bank 2</option>
                <option value="Bank 3">Bank 3</option>
                {/* 필요한 은행명 옵션을 추가하세요 */}
              </select>
              {/* 은행명 드롭다운 끝 */}
              <p className="desktoprectitle">연락처</p>
              <div className="customgrid">
                <input
                  className="input desk-cinput"
                  placeholder="연락처를 입력해주십시오."
                />
                <button className="button desk-minibutton">인증하기</button>
              </div>

              <p className="desktoprectitle">위임장 사진</p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {uploadedFileName && (
                  <p>{uploadedFileName}</p>
                )}
                <button className="button desk-minibutton" onClick={handleOpenFileInput}>
                  찾아보기
                </button>
              </div>
              <p className="desktoprectitle">주소</p>
              <div className="customgrid">
                <input
                  className="input desk-cinput"
                  placeholder="주소을 입력해주십시오."
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                />
                <button
                  className="button desk-minibutton"
                  onClick={handleOpenAddressModal}
                >
                  주소찾기
                </button>
              </div>
              <p className="desktoprectitle">상세주소</p>
              <input
                style={{ width: "40rem", height: "3rem" }}
                className="input"
                placeholder="상세 주소를 입력해주십시오.(동 호수 포함)"
              />
              <div className="customgridx">
                <p className="desktoprectitle">점검 예정 일자 :</p>
                <DatePicker
                  dateFormat='yyyy.MM.dd'
                  shouldCloseOnSelect
                  minDate={new Date()}
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update)
                  }}
                  withPortal
                  className='desktop-datePicker'
                />
              </div>
            </div>
          </div>
          <div className="middlemodal">
            <button className="button bigbuttons" onClick={handleApply}>
              신청하기
            </button>
          </div>
          {showAddressModal && (
            <div className="address-modal">
              <button className="close-button" onClick={handleCloseAddressModal}>
                닫기
              </button>
              <Address selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} onSelect={handleInputAddress} />
            </div>
          )}
          {isApplicationSuccess && (
            <Receivesuc />
          )}
        </div>
      </Desktop>
      <Mobile>
        <div className="customreceivediv">
          <div className="custommodaltitle">
            <p>신청하기</p>
          </div>
          <div className="middlemodal">
            <div>
              <p className="minititle">신청자명</p>
              <input
                style={{ width: "13rem", height: "2rem" }}
                className="input"
                placeholder="이름을 입력해주십시오."
              />
              <p className="minititle">요청 사항</p>
              <input
                className="input"
                style={{ width: "13rem", height: "2rem" }}
                placeholder="요청 사항을 입력해주십시오."
              />
              {/* 은행명 드롭다운 */}
              <p className="minititle">은행명 :</p>
              <select
                className="input cinput"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option value="">은행 선택</option>
                <option value="Bank 1">Bank 1</option>
                <option value="Bank 2">Bank 2</option>
                <option value="Bank 3">Bank 3</option>
                {/* 필요한 은행명 옵션을 추가하세요 */}
              </select>
              {/* 은행명 드롭다운 끝 */}
              <p className="minititle">연락처</p>
              <div className="customgrid">
                <input
                  className="input cinput"
                  placeholder="연락처를 입력해주십시오."
                />
                <button className="button minibutton">인증하기</button>
              </div>

              <p className="minititle">위임장 사진</p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {uploadedFileName && (
                  <p>{uploadedFileName}</p>
                )}
                <button className="button minibutton" onClick={handleOpenFileInput}>
                  찾아보기
                </button>
              </div>
              <p className="minititle">주소</p>
              <div className="customgrid">
                <input
                  className="input cinput"
                  placeholder="주소을 입력해주십시오."
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                />
                <button
                  className="button minibutton"
                  onClick={handleOpenAddressModal}
                >
                  주소찾기
                </button>
              </div>
              <p className="minititle">상세주소</p>
              <input
                style={{ width: "13rem", height: "2rem" }}
                className="input"
                placeholder="상세 주소를 입력해주십시오.(동 호수 포함)"
              />
              <div className="customgridx">
                <p className="minititle">점검 예정 일자 :</p>
                <DatePicker
                  dateFormat='yyyy.MM.dd'
                  shouldCloseOnSelect
                  minDate={new Date()}
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update)
                  }}
                  withPortal
                  className='datePicker'
                />
              </div>
            </div>
          </div>
          <div className="middlemodal">
            <button className="button bigbuttons" onClick={handleApply}>
              신청하기
            </button>
          </div>
          {showAddressModal && (
            <div className="address-modal">
              <button className="close-button" onClick={handleCloseAddressModal}>
                닫기
              </button>
              <Address selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} onSelect={handleInputAddress} />
            </div>
          )}
          {isApplicationSuccess && (
            <Receivesuc />
          )}
        </div>
      </Mobile>
    </div>
  );
}

export default CustomreceiveModal;