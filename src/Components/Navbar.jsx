import { Nav, Navbar } from "react-bootstrap";
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
      <div className="protected-link-group link-group">
        <Link to="/sale">Sälj</Link>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
