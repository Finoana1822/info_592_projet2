import React, { useRef } from "react";
import { UserState } from "../../context/authContext/authContext";

const LogoutModal: React.FC = () => {
  const { logout } = UserState();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const logoutFunc = () => {
    logout!();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div id="logout" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h4 className="modal-title">Logout</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-hidden="true"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout?</p>
            </div>
            <div className="modal-footer">
              <input
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
                value="Cancel"
                ref={inputRef}
              />
              <button className="btn btn-danger" onClick={logoutFunc}>
                Yes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
