import { useContext } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { debitosContext } from "../BankModalDebito/BankModalDebito";
import "./DebitoTable.css";

export default function DebitoTable({ bankId }) {
  console.log("Bank ID -> ", bankId);

  const { debitos } = useContext(debitosContext);

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
            {debitos.map((debito, index) => (
              <tr key={index}>
                <td>{debito.ID_MOVIMIENTO}</td>
                <td>{debito.ID_CUENTA}</td>
                <td>{debito.NO_DOCUMENTO}</td>
                <td style={{ padding: "1px" }}>
                  Q
                  {parseFloat(debito.MONTO).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

DebitoTable.propTypes = {
  bankId: PropTypes.number,
};
