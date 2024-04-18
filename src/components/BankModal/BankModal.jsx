import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import BankModalNavigation from "../BankModalNavigation";
import "./BankModal.css";

export default function BankModal({ show, handleClose, bankId, bankTitle }) {
  const [fullscreen, setFullscreen] = useState(true);
  var colorTitle = "";

  if (bankId === 1) {
    colorTitle = "#023764";
  } else if (bankId === 2) {
    colorTitle = "#000000";
  } else if (bankId === 3) {
    colorTitle = "#044e32";
  }

  // eslint-disable-next-line no-unused-vars
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
  }

  return (
    <Modal show={show} fullscreen={fullscreen} onHide={handleClose}>
      <Modal.Header
        closeButton
        className="modal-header"
        style={{
          background: `linear-gradient(to right, ${colorTitle} 70%, white)`,
        }}
      >
        <Modal.Title className="modal-title">
          {bankTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BankModalNavigation />
      </Modal.Body>
    </Modal>
  );
}

BankModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  bankId: PropTypes.number,
  bankTitle: PropTypes.string,
};
