import React from "react";
import { createPortal } from "react-dom";

const modalStyle = {
  
};
const Modal = ({onClose})=> {
    return createPortal(
      <div className="modal-wrapper pd-16-side bs">
        <a href="https://forms.gle/YuUjj9dN5nGLfmzp8" rel="noreferrer" target="_blank">
      <div className="modal pd-16-side bs">
        <div className="modal-right-btn">
          <p>에타 보면서 시간표 짜기 번거롭죠?</p>
          <span>🗓️ 시간표 기능 업데이트 사전예약하기</span>
        </div>
        <div className="modal-left-btn" onClick={onClose}>
          <p>닫기</p>
        </div>
      </div>
      </a>
      </div>,
      document.getElementById("modal_root"),
    );
}

export default Modal;