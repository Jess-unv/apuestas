import React, { useContext, useState } from 'react';
import './NavComp.css'; // Importar el archivo CSS
import logoImg from '../../assets/logo.jpg'; // Asegúrate de que la ruta del logo sea correcta
import { AuthContext } from '../../context/AuthContext';
import { LoginComp } from './LoginComp';
import { RegisterComp } from './RegisterComp';
import { Modal } from 'react-bootstrap';

export const NavComp = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };
  const closeRegister = () => setShowRegister(false);

  return (
    <nav className="navbar sticky-top">
      <div className="container">
        <div className="navbar-brand">
          <img src={logoImg} alt="logo" />
        </div>
        <div className="d-flex justify-content-end">
          {currentUser ? (
            <>
              <div className="btn mx-2 disabled">
                {currentUser.email}
              </div>
              <div
                onClick={() => logout()}
                className="btn mx-2"
              >
                Logout
              </div>
            </>
          ) : (
            <div className="btn mx-2" onClick={openLogin}>
              Iniciar Sesión
            </div>
          )}
        </div>
      </div>

      {/* Modal for Login */}
      <Modal centered show={showLogin} onHide={closeLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginComp />
          <div className="mt-3">
            No tienes una cuenta?{' '}
            <span
              className="register-link"
              onClick={openRegister}
            >
              Regístrate aquí
            </span>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal for Register */}
      <Modal centered show={showRegister} onHide={closeRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterComp />
        </Modal.Body>
      </Modal>
    </nav>
  );
};
