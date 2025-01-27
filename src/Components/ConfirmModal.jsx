import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, message, onConfirm, onCancel, children }) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Bekräfta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>{message}</div>
        {children && <div>{children}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Avbryt
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Bekräfta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
