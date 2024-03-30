import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CatalogueModal from "../CatalogueModal";
import "./Users.css";

export default function Users() {
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

  /* const handleOpenEditModal = (catalogType, record) => {
    setIsEditing(true);
    setSelectedRecord(record);
    setCatalogType(catalogType);
    setShowModal(true);
  }; */

  return (
    <div className="user-container">
      <h2 className="users-title">Lista de Usuarios</h2>
      <Button variant="primary" onClick={() => handleOpenAddModal("user")}>
        Agregar Usuario +
      </Button>
      <CatalogueModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        isEditing={isEditing}
        record={selectedRecord}
        catalogType={catalogType}
      />
      <div className="users-table">
        <Table striped bordered hover>
          <thead className="table-header">
            <tr>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>#</th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                First Name
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Last Name
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Username
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
