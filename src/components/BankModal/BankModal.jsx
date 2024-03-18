import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import BankModalNavigation from '../BankModalNavigation';
import './BankModal.css';

export default function BankModal({ show, handleClose, bankId, bankTitle }) {
    const [fullscreen, setFullscreen] = useState(true);

  // eslint-disable-next-line no-unused-vars
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
  }

  return (
    <Modal show={show} fullscreen={fullscreen} onHide={handleClose}>
      <Modal.Header closeButton className='modal-title'>
        <Modal.Title>{bankTitle} {bankId}</Modal.Title>
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