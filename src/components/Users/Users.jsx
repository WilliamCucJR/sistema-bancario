import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';

import "./Users.css";

export default function Users() {
  return (
    <div className="user-container">
      <h2 className="users-title">Lista de Usuarios</h2>
      <div className="add-user-button">  
        <Button variant="primary">Agregar Usuario +</Button>
      </div>
      <div className="users-table">
        <Table striped bordered hover>
          <thead className="table-header">
            <tr>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>#</th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>First Name</th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>Last Name</th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>Username</th>
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
