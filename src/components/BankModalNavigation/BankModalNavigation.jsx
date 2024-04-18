import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import "./BankModalNavigation.css";
import BankModalCuenta from "../BankModalCuenta";

export default function BankModalNavigation() {
  const [selectedTab, setSelectedTab] = useState("link-cuenta");

  const renderTabContent = () => {
    switch (selectedTab) {
      case "link-cuenta":
        return <BankModalCuenta />;
      case "link-reportes":
        return <p>Contenido de la opción 1</p>;
      case "link-conciliacion":
        return <p>Contenido de la opción 2</p>;
      case "link-debitos-transferencias":
        return <p>Contenido de la opción 3</p>;
      case "link-creditos":
        return <p>Contenido de la opción 4</p>;
      default:
        return null;
    }
  };

  return (
    <>
      <Nav fill variant="tabs" defaultActiveKey="link-cuenta" onSelect={(selectedKey) => setSelectedTab(selectedKey)}>
        <Nav.Item>
          <Nav.Link eventKey="link-cuenta" className="nav-link-modal">Cuentas</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-conciliacion" className="nav-link-modal">Conciliación</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-debitos-transferencias" className="nav-link-modal">Débitos y Transferencias</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-creditos" className="nav-link-modal">Creditos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-reportes" className="nav-link-modal">Reportes</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </>
  );
}
