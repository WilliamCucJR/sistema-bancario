import { useContext } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { creditosContext } from "../BankModalCredito/BankModalCredito";
import  "./CreditoTable.css";

export default function CreditoTable({ bankId }) {

    console.log('Bank ID -> ', bankId);

    const { creditos } = useContext(creditosContext);

    return (
        <>
          <div style={{ maxHeight: "550px", overflowY: "auto" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#2b3036", color: "white" }}>#</th>
                  <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                    No. Cuenta
                  </th>
                  <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                    No. Documento
                  </th>
                  <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                    Monto
                  </th>
                </tr>
              </thead>
              <tbody>
                {creditos.map((credito, index) => (
                  <tr key={index}>
                    <td>{credito.ID_MOVIMIENTO}</td>
                    <td>{credito.ID_CUENTA}</td>
                    <td>{credito.NO_DOCUMENTO}</td>
                    <td>{credito.MONTO}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
    )
}


CreditoTable.propTypes = {
    bankId: PropTypes.number,
  };