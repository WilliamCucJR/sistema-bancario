import { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CatalogueModal from "../CatalogueModal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoDocumentsOutline } from "react-icons/io5";
import "./TipoDocumento.css";

export default function TipoDocumento() {
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiTipoDocumento = `${apiUrlBase}/TipoDocumento/GetAllTipoDocumentos`;

  const [tipoDocumentos, setTipoDocumentos] = useState([]);

  const fetchTipoDocumentos = useCallback(() => {
    fetch(apiTipoDocumento)
      .then((response) => response.json())
      .then((data) => setTipoDocumentos(data))
      .catch((error) => console.error("Error:", error));
  }, [apiTipoDocumento]);

  useEffect(() => {
    fetchTipoDocumentos();
  }, [fetchTipoDocumentos]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este registro?');
  
    if (confirmDelete) {
      fetch(`${apiUrlBase}/TipoDocumento/DeleteTipoDocumento/${id}`, {
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
        fetchTipoDocumentos();
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
    fetchTipoDocumentos();
  };

  return (
    <div className="tipo-documento-container">
      <h1 className="tipo-documentos-title">
        <IoDocumentsOutline /> 
        Tipos de Documento
      </h1>
      <Button variant="success" onClick={() => handleOpenAddModal("tipoDocumento")}>
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
      <div className="tipo-documentos-table">
        <Table striped bordered hover>
          <thead className="table-header">
            <tr>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                ID Tipo Documento
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Nombre Documento
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Descripcion
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Operación
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {tipoDocumentos.map((item, index) => (
              <tr key={index}>
                <td>{item.ID}</td>
                <td>{item.NOMBRE_DOCUMENTO}</td>
                <td>{item.DESCRIPCION}</td>
                <td>{item.OPERACION}</td>
                <td className="td-flex">
                  <Button
                    variant="warning"
                    onClick={() => handleOpenEditModal("tipoDocumento", item)}
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
