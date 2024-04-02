import { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CatalogueModal from "../CatalogueModal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import "./TipoCuenta.css";

export default function TipoCuenta() {
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiTipoCuenta = `${apiUrlBase}/TipoCuenta/GetAllTipoCuentas`;

  const [tipoCuentas, setTipoCuentas] = useState([]);

  const fetchTipoCuentas = useCallback(() => {
    fetch(apiTipoCuenta)
      .then((response) => response.json())
      .then((data) => setTipoCuentas(data))
      .catch((error) => console.error("Error:", error));
  }, [apiTipoCuenta]);

  useEffect(() => {
    fetchTipoCuentas();
  }, [fetchTipoCuentas]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este registro?"
    );

    if (confirmDelete) {
      fetch(`${apiUrlBase}/TipoCuenta/DeleteTipoCuenta/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la API");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Deleted:", data);
          // Recarga los datos después de eliminar un registro
          fetchTipoCuentas();
        })
        .catch((error) => {
          console.error("Error:", error);
          // Maneja el error como prefieras
        });
    }
  };

  //const apiMoneda = `${apiUrlBase}/Moneda`;

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [catalogType, setCatalogType] = useState(null);

  const handleOpenAddModal = (catalogType) => {
    setIsEditing(false);
    setSelectedRecord(null);
    setCatalogType(catalogType);
    setShowModal(true);
  };

  const handleOpenEditModal = (catalogType, record) => {
    setIsEditing(true);
    setSelectedRecord(record);
    setCatalogType(catalogType);
    setShowModal(true);
  };

  const handleSuccess = () => {
    setShowModal(false);
    fetchTipoCuentas();
  };

  return (
    <div className="tipo-cuenta-container">
      <h1 className="tipo-cuentas-title">
        <MdOutlineAccountBalanceWallet /> 
        Tipos de Cuenta
      </h1>
      <Button variant="success" onClick={() => handleOpenAddModal("tipoCuenta")}>
        Agregar Tipo de Cuenta +
      </Button>
      <CatalogueModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        isEditing={isEditing}
        record={selectedRecord}
        catalogType={catalogType}
        onSuccess={handleSuccess}
      />
      <div className="tipo-cuentas-table">
        <Table striped bordered hover>
          <thead className="table-header">
            <tr>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                ID Tipo Cuenta
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Tipo de Cuenta
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {tipoCuentas.map((item, index) => (
              <tr key={index}>
                <td>{item.ID}</td>
                <td>{item.TIPO_DE_CUENTA}</td>
                <td className="td-flex">
                  <Button
                    variant="warning"
                    onClick={() => handleOpenEditModal("tipoCuenta", item)}
                    size="sm"
                    className="buttonActions"
                  >
                    <FaRegEdit size={12} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item.ID)}
                    size="sm"
                    className="buttonActions"
                  >
                    <RiDeleteBin5Line size={12} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
