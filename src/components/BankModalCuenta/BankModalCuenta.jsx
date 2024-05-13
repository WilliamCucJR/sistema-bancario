import React, { useState, useEffect } from "react";
export const CuentaBancariaContext = React.createContext();
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import CuentaBancariaForm from "../CuentaBancariaForm";
import CuentaBancariaTable from "../CuentaBancariaTable/CuentaBancariaTable";

export default function BankModalCuenta( bankId ) {
  const [selectedId, setSelectedId] = useState(null);
  const bankIdStr = bankId.bankId;

  // Crea el estado que se compartirá
  const [cuentas, setCuentas] = useState([]);

  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiGetCuentas = `${apiUrlBase}/CuentaBancaria/GetCuentaBancariaByBancoID/${bankIdStr}`;

  const fetchCuentas = () => {
    fetch(apiGetCuentas)
      .then((response) => response.json())
      .then((data) => setCuentas(data))
      .catch((error) => console.error("Error:", error));
  };

  const fetchCuentasDelete = () => {
    fetch(apiGetCuentas)
      .then((response) => response.json())
      .then((data) => setCuentas(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(fetchCuentas, []);

  console.log('Cuenta recibida -> ', selectedId);
  console.log('Bank ID 1 -> ', bankIdStr);

  return (
    <CuentaBancariaContext.Provider value={{ cuentas, setCuentas, fetchCuentas, fetchCuentasDelete }}>
      <Row>
        <Col md={6} className="p-4">
          <CuentaBancariaForm bankId={bankIdStr} selectedId={selectedId} />
        </Col>
        <Col md={6} className="p-4">
          <CuentaBancariaTable bankId={bankId} setSelectedId={setSelectedId} />
        </Col>
      </Row>
    </CuentaBancariaContext.Provider>
  );
}

BankModalCuenta.propTypes = {
  bankId: PropTypes.number,
};