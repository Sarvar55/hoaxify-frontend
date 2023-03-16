import React from "react";
import ButtonWithProgres from "./ButtonWithProgres";
const Modal = (props) => {
  const {
    visible,
    onClickCancel,
    message,
    onClickOk,
    pendingApiCall,
    title,
    verifyButtonMessage,
  } = props;
  let className = "modal fade";
  if (!visible) className += " d-none";
  if (visible) className += " show d-block";

  return (
    <div
      className={className}
      style={{
        background: "#000110b4",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{title}</h1>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClickCancel}
            >
              Cancel
            </button>
            <ButtonWithProgres
              onClick={() => onClickOk()}
              className="btn btn-danger"
              pendingApiCall={pendingApiCall}
              text={verifyButtonMessage}
            ></ButtonWithProgres>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
