import React, { useState, useEffect } from "react";
export const creditosContext = React.createContext();
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import CreditoForm from "../CreditoForm";
import CreditoTable from "../CreditoTable";

export default function BankModalCredito({ bankId }) {

    const [creditos, setCreditos] = useState([]);

    const apiUrlBase = import.meta.env.VITE_API_URL;
    const apiGetCreditos = `${apiUrlBase}/Movimientos/GetNotasCreditoPorBanco/${bankId}`;

    const fetchCreditos = () => {
        fetch(apiGetCreditos)
            .then((response) => response.json())
            .then((data) => setCreditos(data))
            .catch((error) => console.error("Error:", error));
    }

    const fetchCreditosDelete = () => {
      fetch(apiGetCreditos)
        .then((response) => response.json())
        .then((data) => setCreditos(data))
        .catch((error) => console.error("Error:", error));
    };

    useEffect(fetchCreditos, []);

    return (
        <creditosContext.Provider value={{ creditos, setCreditos, fetchCreditos, fetchCreditosDelete }}>
          <Row>
            <Col md={6} className="p-4">
              <CreditoForm bankId={bankId} />
            </Col>
            <Col md={6} className="p-4">
              <CreditoTable bankId={bankId} />
            </Col>
          </Row>
        </creditosContext.Provider>
    )
}


BankModalCredito.propTypes = {
    bankId: PropTypes.number,
};