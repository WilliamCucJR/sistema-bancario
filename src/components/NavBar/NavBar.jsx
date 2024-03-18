import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoSistema from "../../img/sistema-logo-horizontal.png";
import "./NavBar.css";

export default function NavBar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar credenciales en sessionStorage al cerrar sesión
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    // Llamar a la función de cierre de sesión
    onLogout();
    // Redirigir a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <>
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        className="navbar-sistema"
      >
        <Navbar.Brand as={Link} to="/home">
          <img
            src={logoSistema}
            className="d-inline-block align-top navbar-logo"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Inicio
            </Nav.Link>
            <NavDropdown title="Opciones" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/users">
                Usuarios
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

NavBar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
