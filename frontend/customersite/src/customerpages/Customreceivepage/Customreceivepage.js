import React from "react";
import CustomreceiveModal from "../../customcomponent/customReceive/CustomreceiveModal";
import Receivesuc from "../../customcomponent/customReceive/receivesuccess";
import Address from "../../customcomponent/addresscomp/address";
import './Customreceivepage.css'
// import Calendar from "../../component/calendar/calendar";
function Customreceive() {
  return (
    <div>

      <div className="modalbox roomimg backgr">
      <CustomreceiveModal/>
      {/* <Receivesuc/> */}

      </div>
    </div>
  )
}

export default Customreceive;