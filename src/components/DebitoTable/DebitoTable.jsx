import { useContext } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { debitosContext } from "../BankModalDebito/BankModalDebito";
import "./DebitoTable.css";

export default function DebitoTable({ bankId }) {
  console.log("Bank ID -> ", bankId);

  // eslint-disable-next-line no-unused-vars
  const { debitosDelete, fetchDebitosDelete } = useContext(
    debitosContext
  );

  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiDeleteMovimiento = `${apiUrlBase}/Movimientos/DeleteMovimientoDocumentoProcedure/`;
  const { debitos } = useContext(debitosContext);

  const handleDeleteClick = (noDocumento) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta transacción?')) {
      fetch(apiDeleteMovimiento + noDocumento, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          console.log("Success:", data);
          fetchDebitosDelete();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

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
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Acciones
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
                <td>
                <Button
                    variant="danger"
                    size="sm"
                    className="buttonActionsCuenta"
                    onClick={() => handleDeleteClick(debito.NO_DOCUMENTO)}
                  >
                    <RiDeleteBin5Line size={12} />
                  </Button>
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
