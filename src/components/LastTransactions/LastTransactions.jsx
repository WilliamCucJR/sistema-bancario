import Table from "react-bootstrap/Table";
import "./LastTransactions.css";

export default function LastTransactions() {
  const registros = [
    {
      id: 1,
      banco: "Banco A",
      estado: "Aprobado",
      fecha: "2024-02-25",
      referencia: "REF001",
      monto: 1000,
    },
    {
      id: 2,
      banco: "Banco B",
      estado: "Rechazado",
      fecha: "2024-02-26",
      referencia: "REF002",
      monto: 1500,
    },
    {
      id: 3,
      banco: "Banco C",
      estado: "Pendiente",
      fecha: "2024-02-27",
      referencia: "REF003",
      monto: 1200,
    },
    {
      id: 4,
      banco: "Banco D",
      estado: "Aprobado",
      fecha: "2024-02-28",
      referencia: "REF004",
      monto: 800,
    },
    {
      id: 5,
      banco: "Banco E",
      estado: "Rechazado",
      fecha: "2024-02-29",
      referencia: "REF005",
      monto: 2000,
    },
    {
      id: 6,
      banco: "Banco F",
      estado: "Pendiente",
      fecha: "2024-03-01",
      referencia: "REF006",
      monto: 1800,
    },
    {
      id: 7,
      banco: "Banco G",
      estado: "Aprobado",
      fecha: "2024-03-02",
      referencia: "REF007",
      monto: 1300,
    },
    {
      id: 8,
      banco: "Banco H",
      estado: "Rechazado",
      fecha: "2024-03-03",
      referencia: "REF008",
      monto: 900,
    },
    {
      id: 9,
      banco: "Banco I",
      estado: "Pendiente",
      fecha: "2024-03-04",
      referencia: "REF009",
      monto: 1100,
    },
    {
      id: 10,
      banco: "Banco J",
      estado: "Aprobado",
      fecha: "2024-03-05",
      referencia: "REF010",
      monto: 1600,
    },
    {
      id: 50,
      banco: "Banco Z",
      estado: "Pendiente",
      fecha: "2024-03-25",
      referencia: "REF050",
      monto: 2200,
    },
  ];
  return (
    <div>
      <h2 className="last-transactions-title">
        ÚLTIMAS TRANSACCIONES GENERALES
      </h2>
      <div className="last-transactions-table">
        <Table striped bordered hover>
          <thead className="table-header">
            <tr>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>#</th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>Banco</th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>Estado</th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>Fecha</th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>Referencia</th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>Monto</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.id}</td>
                <td>{registro.banco}</td>
                <td>{registro.estado}</td>
                <td>{registro.fecha}</td>
                <td>{registro.referencia}</td>
                <td>{registro.monto}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
