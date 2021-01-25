import React from "react";
import { createPortal } from "react-dom";

const modalStyle = {
  
};
const Modal = ({onClose})=> {
    return createPortal(
      <div className="modal-wrapper pd-16-side bs">
      <div className="modal pd-16-side bs">
        <div className="modal-right-btn">
          <p>에타 보면서 시간표 짜기 번거롭죠?</p>
          <span>2월 중 시간표 기능 추가 예정</span>
        </div>
        <div className="modal-left-btn" onClick={onClose}>
          <p>닫기</p>
        </div>
      </div>
      </div>,
      document.getElementById("modal_root"),
    );
}

export default Modal;