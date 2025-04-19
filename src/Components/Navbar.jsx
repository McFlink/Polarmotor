import { Nav, Navbar, Dropdown } from "react-bootstrap";
import "./Navbar.css";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" expand="lg" className="custom-navbar">
      <div href="#home" className="custom-brand-title">
        Polarmotor
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="custom-navlink-group link-group">
          <Link to="/">Hem</Link>
          <Link to="/gallery">Galleri</Link>
          <Link to="/contact">Kontakt</Link>
          <Link to="/findus">Hitta hit</Link>
          <Link to="/about">Om oss</Link>
        </Nav>
      </Navbar.Collapse>
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
        <Dropdown drop="start" className="custom-dropdown">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Välj aktion
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
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
