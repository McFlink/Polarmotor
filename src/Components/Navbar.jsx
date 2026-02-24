import { Nav, Navbar, Dropdown, Button, Modal } from "react-bootstrap";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAdmin } from "../Context/AdminContext.jsx";
import { useState } from "react";
import LoginModal from "../Components/LoginModal";

const NavigationBar = () => {
  const { isAdmin, loginAsAdmin, logoutAdmin } = useAdmin();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    if (isAdmin) {
      logoutAdmin(); // Om admin är inloggad, logga ut
    } else {
      setShowLoginModal(true); // Om inte inloggad, visa login-modal
    }
  };

  return (
    <Navbar bg="dark" expand="lg" className="custom-navbar">
      <div className="nav-inner">
        <div href="#home" className="custom-brand-title">
          Polarmotor
        </div>
        <Navbar.Collapse id="basic-navbar-nav" className="nav-links">
          <Nav className="custom-navlink-group link-group">
            <Link to="/">Hem</Link>
            <Link to="/gallery">Galleri</Link>
            <Link to="/contact">Kontakt</Link>
            <Link to="/findus">Hitta hit</Link>
            <Link to="/about">Om oss</Link>
          </Nav>
        </Navbar.Collapse>
        <div className="nav-actions">
          <Dropdown className="custom-nav-dropdown">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Navigera
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/salesobjects">
                Sälj-objekt
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/purchaseobjects">
                Köp-objekt
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="protected-link-group link-group">
            {isAdmin ? (
              <Dropdown drop="start" className="custom-dropdown">
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Admin
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/createnews">
                    Skapa nyhet
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/sale">
                    Skapa sälj-objekt
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/purchase">
                    Skapa köp-objekt
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logoutAdmin}>Logga ut</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="primary" onClick={handleLoginClick}>
                Logga in som admin
              </Button>
            )}
          </div>
        </div>
      </div>
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        loginAsAdmin={loginAsAdmin}
      />
    </Navbar>
  );
};

export default NavigationBar;
