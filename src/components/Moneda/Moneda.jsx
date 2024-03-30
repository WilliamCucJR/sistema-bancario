import { useState, useEffect } from "react";
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

  useEffect(() => {
    fetch(apiMoneda)
      .then((response) => response.json())
      .then((data) => setMonedas(data))
      .catch((error) => console.error("Error:", error));
  }, [apiMoneda]);

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

  return (
    <div className="moneda-container">
      <h2 className="monedas-title">Lista de Monedas</h2>
      <Button variant="primary" onClick={() => handleOpenAddModal("moneda")}>
        Agregar Moneda +
      </Button>
      <CatalogueModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        isEditing={isEditing}
        record={selectedRecord}
        catalogType={catalogType}
      />
      <div className="monedas-table">
        <Table striped bordered hover>
          <thead className="table-header">
            <tr>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>#</th>
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
                    onClick={() => handleOpenEditModal("moneda", item)}
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
