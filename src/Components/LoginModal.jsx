import { useAdmin } from "../Context/AdminContext.jsx";
import { useState } from "react";
import Login from "../Components/Login";
import { Button, Modal } from "react-bootstrap";
import "./LoginModal.css";

const LoginModal = ({ showLoginModal, setShowLoginModal, loginAsAdmin }) => {
  const { isAdmin } = useAdmin();
  const closeModal = () => setShowLoginModal(false);

  return (
    <Modal
      show={showLoginModal}
      onHide={closeModal}
      centered
      dialogClassName="login-modal-dialog"
      contentClassName="login-modal-content"
    >
      <Modal.Header closeButton>
        <Modal.Title>Logga in som admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Login setAdmin={loginAsAdmin} closeModal={closeModal} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Stäng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
