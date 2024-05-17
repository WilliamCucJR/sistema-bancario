import { useContext } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { creditosContext } from "../BankModalCredito/BankModalCredito";
import "./CreditoTable.css";

export default function CreditoTable({ bankId }) {
  console.log("Bank ID -> ", bankId);

  // eslint-disable-next-line no-unused-vars
  const { creditosDelete, fetchCreditosDelete } = useContext(
    creditosContext
  );

  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiDeleteMovimiento = `${apiUrlBase}/Movimientos/DeleteMovimientoDocumentoProcedure/`;
  const { creditos } = useContext(creditosContext);

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
          fetchCreditosDelete();
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
            {creditos.map((credito, index) => (
              <tr key={index}>
                <td>{credito.ID_MOVIMIENTO}</td>
                <td>{credito.ID_CUENTA}</td>
                <td>{credito.NO_DOCUMENTO}</td>
                <td style={{ padding: "1px" }}>
                  Q
                  {parseFloat(credito.MONTO).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                <Button
                    variant="danger"
                    size="sm"
                    className="buttonActionsCuenta"
                    onClick={() => handleDeleteClick(credito.NO_DOCUMENTO)}
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

CreditoTable.propTypes = {
  bankId: PropTypes.number,
};
