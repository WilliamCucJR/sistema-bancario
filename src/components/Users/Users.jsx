import { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CatalogueModal from "../CatalogueModal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import "./Users.css";

export default function Users() {
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiUser = `${apiUrlBase}/UserLogin/GetAllUserLogins`;

  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(() => {
    fetch(apiUser)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, [apiUser]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este registro?"
    );

    if (confirmDelete) {
      fetch(`${apiUrlBase}/UserLogin/DeleteUserLogin/${id}`, {
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
          fetchUsers();
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
    fetchUsers();
  };

  return (
    <div className="user-container">
      <h1 className="users-title">
        <GrMoney />
        Monedas
      </h1>
      <Button variant="success" onClick={() => handleOpenAddModal("user")}>
        Agregar Usuario +
      </Button>
      <CatalogueModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        isEditing={isEditing}
        record={selectedRecord}
        catalogType={catalogType}
        onSuccess={handleSuccess}
      />
      <div className="users-table">
        <Table striped bordered hover>
          <thead className="table-header">
            <tr>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                ID
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Usuario
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                1er Nombre
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                2do Nombre
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                1er Apellido
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                2do Apellido
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Email
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Telefono
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Area/Departamento
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Puesto
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Estatus
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td>{item.USERID}</td>
                <td>{item.NICKNAME}</td>
                <td>{item.PRIMER_NOMBRE}</td>
                <td>{item.SEGUNDO_NOMBRE}</td>
                <td>{item.PRIMER_APELLIDO}</td>
                <td>{item.SEGUNDO_APELLIDO}</td>
                <td>{item.EMAIL}</td>
                <td>{item.TELEFONO}</td>
                <td>{item.DEPARTAMENTO_SISTEMA}</td>
                <td>{item.PUESTO}</td>
                <td>{item.ESTATUS_USUARIO}</td>
                <td className="td-flex">
                  <Button
                    variant="warning"
                    onClick={() => handleOpenEditModal("user", item)}
                    size="sm"
                    className="buttonActions"
                  >
                    <FaRegEdit size={12} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item.USERID)}
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
