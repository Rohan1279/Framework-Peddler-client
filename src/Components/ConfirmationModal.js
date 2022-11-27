import React from "react";

const ConfirmationModal = ({
  title,
  message,
  closeModal,
  successAction,
  modalData,
  successButtonName,
}) => {
  return (
    <div>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal rounded-none">
        <div className="modal-box rounded-none">
          <h3 className="font-bold text-xl text-center">{title}</h3>
          <p className="py-4 text-center">{message}</p>
          <div className="modal-action">
            <label
              onClick={() => successAction(modalData)}
              htmlFor="confirmation-modal"
              className="btn rounded-none btn-error"
            >
              {successButtonName}
            </label>
            <button
              onClick={closeModal}
              className="btn btn-outline rounded-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
