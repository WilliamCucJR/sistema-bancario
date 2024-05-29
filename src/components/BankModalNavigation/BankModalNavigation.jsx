import { useState } from "react";
import PropTypes from "prop-types";
import Nav from "react-bootstrap/Nav";
import "./BankModalNavigation.css";
import BankModalCuenta from "../BankModalCuenta";
import BankModalDebito from "../BankModalDebito";
import BankModalCredito from "../BankModalCredito";
import BankModalConciliacion from "../BankModalConciliacion";
import BankModalReports from "../BankModalReports/BankModalReports";

export default function BankModalNavigation({ bankId }) {
  const [selectedTab, setSelectedTab] = useState("link-cuenta");

  const renderTabContent = () => {
    switch (selectedTab) {
      case "link-cuenta":
        return <BankModalCuenta bankId={bankId} />;
      case "link-reportes":
        return <BankModalReports bankId={bankId} />;
      case "link-conciliacion":
        return <BankModalConciliacion bankId={bankId} />
      case "link-debitos-transferencias":
        return <BankModalDebito bankId={bankId} />;
      case "link-creditos":
        return <BankModalCredito bankId={bankId} />;
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

BankModalNavigation.propTypes = {
  bankId: PropTypes.number,
};