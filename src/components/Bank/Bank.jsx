import { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CatalogueModal from "../CatalogueModal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./Bank.css";

export default function Bank() {
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiBank = `${apiUrlBase}/Banco/GetAllBancos`;

  const [banks, setBanks] = useState([]);

  const fetchBanks = useCallback(() => {
    fetch(apiBank)
      .then((response) => response.json())
      .then((data) => setBanks(data))
      .catch((error) => console.error("Error:", error));
  }, [apiBank]);

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este registro?"
    );

    if (confirmDelete) {
      fetch(`${apiUrlBase}/Banco/DeleteBanco/${id}`, {
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
          fetchBanks();
        })
        .catch((error) => {
          console.error("Error:", error);
          // Maneja el error como prefieras
        });
    }
  };

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
    fetchBanks();
  };

  return (
    <div className="bank-container">
      <h2 className="banks-title">Lista de Bancos</h2>
      <Button variant="success" onClick={() => handleOpenAddModal("bank")}>
        Agregar Banco +
      </Button>
      <CatalogueModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        isEditing={isEditing}
        record={selectedRecord}
        catalogType={catalogType}
        onSuccess={handleSuccess}
      />
      <div className="banks-table">
        <Table striped bordered hover>
          <thead className="table-header">
            <tr>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                ID Banco
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Banco
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {banks.map((item, index) => (
              <tr key={index}>
                <td>{item.ID_BANCO}</td>
                <td>{item.NOMBRE_BANCO}</td>
                <td className="td-flex">
                  <Button
                    variant="warning"
                    onClick={() => handleOpenEditModal("bank", item)}
                    size="sm"
                    className="buttonActions"
                  >
                    <FaRegEdit size={12} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item.ID_BANCO)}
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
