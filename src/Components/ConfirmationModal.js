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
          <div className="modal-action flex items-center justify-center">
            <label
              onClick={() => successAction(modalData)}
              htmlFor="confirmation-modal"
              className="btn  rounded-none btn-sm btn-error hover:bg-red-400 hover:text-white"
            >
              {successButtonName}
            </label>
            <button
              onClick={closeModal}
              className="btn  btn-outline btn-sm rounded-none"
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
