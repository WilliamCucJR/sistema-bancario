import { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import logoBI from "../../img/bi-logo-v4.png";
import logoBam from "../../img/bam-logo-v4.png";
import logoBanrural from "../../img/banrural-logo-v4.png";
import "./LastTransactions.css";

export default function LastTransactions() {
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiMovimientosHome = `${apiUrlBase}/Conciliacion/GetMovimientosHome`;

  const [movimientosHome, setMovimientosHome] = useState([]);

  const fetchMovimientosHome = useCallback(() => {
    fetch(apiMovimientosHome)
      .then((response) => response.json())
      .then((data) => setMovimientosHome(data))
      .catch((error) => console.error("Error:", error));
  }, [apiMovimientosHome]);

  useEffect(() => {
    fetchMovimientosHome();
  }, [fetchMovimientosHome]);

  console.log("movimientosHome: ", movimientosHome);

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
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Banco
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Descripcion
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Fecha
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                No. Documento
              </th>
              <th style={{ backgroundColor: "#2b3036", color: "white" }}>
                Monto
              </th>
            </tr>
          </thead>
          <tbody>
            {movimientosHome.map((registro) => {
              let imgBanco;

              if (registro.NOMBRE_BANCO === "Banco Industrial") {
                imgBanco = logoBI;
              } else if (registro.NOMBRE_BANCO === "BAM") {
                imgBanco = logoBam;
              } else if (registro.NOMBRE_BANCO === "Banrural") {
                imgBanco = logoBanrural;
              }

              return (
                <tr key={registro.ID_MOVIMIENTO}>
                  <td style={{ padding: "1px" }}>{registro.ID_MOVIMIENTO}</td>
                  <td
                    style={{ padding: "1px", width: "160px", height: "40px" }}
                  >
                    <img
                      src={imgBanco}
                      alt={registro.NOMBRE_BANCO}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td style={{ padding: "1px" }}>{registro.DESCRIPCION}</td>
                  <td style={{ padding: "1px" }}>
                    {new Date(registro.FECHA).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td style={{ padding: "1px" }}>{registro.NO_DOCUMENTO}</td>
                  <td style={{ padding: "1px" }}>Q 
                    {parseFloat(registro.MONTO).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
