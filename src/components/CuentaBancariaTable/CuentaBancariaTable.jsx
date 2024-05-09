import { useContext, useState } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CuentaBancariaContext } from "../BankModalCuenta/BankModalCuenta";
import "./CuentaBancariaTable.css";

export default function CuentaBancariaTable({ setSelectedId }) {
  // eslint-disable-next-line no-unused-vars
  const { cuentasDelete, fetchCuentasDelete } = useContext(
    CuentaBancariaContext
  );
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiDeleteCuenta = `${apiUrlBase}/CuentaBancaria/DeleteCuentaBancaria/`;

  const { cuentas } = useContext(CuentaBancariaContext);
  const [selectedCuenta, setSelectedCuenta] = useState(null);

  const handleEditClick = (cuenta) => {
    setSelectedCuenta(cuenta);
  };

  const handleDeleteClick = (idCuenta) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta cuenta?')) {
      fetch(apiDeleteCuenta + idCuenta, {
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
          fetchCuentasDelete(); // Actualizamos las cuentas después de eliminar una
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  console.log(selectedCuenta);

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
                Nombre
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Saldo
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {cuentas.map((cuenta, index) => (
              <tr key={index}>
                <td>{cuenta.ID_CUENTA}</td>
                <td>{cuenta.NO_DE_CUENTA}</td>
                <td>{cuenta.NOMBRE_CUENTAHABIENTE}</td>
                <td>{cuenta.SALDO}</td>
                <td className="td-cuenta-flex">
                  <Button
                    variant="warning"
                    size="sm"
                    className="buttonActionsCuenta"
                    onClick={() => {
                      handleEditClick(cuenta.ID_CUENTA);
                      setSelectedId(cuenta.ID_CUENTA); // Aquí está la corrección
                    }}
                  >
                    <FaRegEdit size={12} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="buttonActionsCuenta"
                    onClick={() => handleDeleteClick(cuenta.ID_CUENTA)}
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

CuentaBancariaTable.propTypes = {
  setSelectedId: PropTypes.func,
};
