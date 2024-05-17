import React, { useState, useEffect } from "react";
export const debitosContext = React.createContext();
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import DebitoForm from "../DebitoForm";
import DebitoTable from "../DebitoTable";

export default function BankModalDebito({ bankId }) {
  
    // Crea el estado que se compartirá
    const [debitos, setDebitos] = useState([]);
  
    const apiUrlBase = import.meta.env.VITE_API_URL;
    const apiGetDebitos = `${apiUrlBase}/Movimientos/GetNotasDebitoPorBanco/${bankId}`;
  
    const fetchDebitos = () => {
      fetch(apiGetDebitos)
        .then((response) => response.json())
        .then((data) => setDebitos(data))
        .catch((error) => console.error("Error:", error));
    };

    const fetchDebitosDelete = () => {
      fetch(apiGetDebitos)
        .then((response) => response.json())
        .then((data) => setDebitos(data))
        .catch((error) => console.error("Error:", error));
    };
  
    useEffect(fetchDebitos, []);

    console.log('Bank ID -> ', bankId);
    return (
        <debitosContext.Provider value={{ debitos, setDebitos, fetchDebitos, fetchDebitosDelete }}>
          <Row>
            <Col md={6} className="p-4">
              <DebitoForm bankId={bankId} />
            </Col>
            <Col md={6} className="p-4">
              <DebitoTable bankId={bankId} />
            </Col>
          </Row>
        </debitosContext.Provider>
      );
    
}

BankModalDebito.propTypes = {
    bankId: PropTypes.number,
  };