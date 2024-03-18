import Nav from "react-bootstrap/Nav";
import "./BankModalNavigation.css";

export default function BankModalNavigation() {
  return (
    <>
      <Nav fill variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link eventKey="link-1" className="nav-link-modal">Cuentas</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="opcion" className="nav-link-modal">Opcion</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" className="nav-link-modal">Opcion 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3" className="nav-link-modal">Opcion 3</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4" className="nav-link-modal">Opcion 4</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-5" className="nav-link-modal">Opcion 5</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-6" className="nav-link-modal">Opcion 6</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-7" className="nav-link-modal">Opcion 7</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-8" className="nav-link-modal">Opcion 8</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}
