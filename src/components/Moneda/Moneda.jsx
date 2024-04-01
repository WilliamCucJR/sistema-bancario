import { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CatalogueModal from "../CatalogueModal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./Moneda.css";

export default function Moneda() {
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiMoneda = `${apiUrlBase}/Moneda/GetAllMonedas`;

  const [monedas, setMonedas] = useState([]);

  const fetchMonedas = useCallback(() => {
    fetch(apiMoneda)
      .then((response) => response.json())
      .then((data) => setMonedas(data))
      .catch((error) => console.error("Error:", error));
  }, [apiMoneda]);

  useEffect(() => {
    fetchMonedas();
  }, [fetchMonedas]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este registro?');
  
    if (confirmDelete) {
      fetch(`${apiUrlBase}/Moneda/DeleteMoneda/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la API');
        }
        return response.json();
      })
      .then(data => {
        console.log('Deleted:', data);
        // Recarga los datos después de eliminar un registro
        fetchMonedas();
      })
      .catch((error) => {
        console.error('Error:', error);
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
    fetchMonedas();
  };

  return (
    <div className="moneda-container">
      <h2 className="monedas-title">Lista de Monedas</h2>
      <Button variant="success" onClick={() => handleOpenAddModal("moneda")}>
        Agregar Moneda +
      </Button>
      <CatalogueModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        isEditing={isEditing}
        record={selectedRecord}
        catalogType={catalogType}
        onSuccess={handleSuccess}
      />
      <div className="monedas-table">
        <Table striped bordered hover>
          <thead className="table-header">
            <tr>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>ID Moneda</th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Tipo de Moneda
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Tasa de Cambio
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {monedas.map((item, index) => (
              <tr key={index}>
                <td>{item.ID}</td>
                <td>{item.TIPO_MONEDA}</td>
                <td>{item.TASA_DE_CAMBIO}</td>
                <td className="td-flex">
                  <Button
                    variant="warning"
                    onClick={() => handleOpenEditModal("moneda", item)}
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
