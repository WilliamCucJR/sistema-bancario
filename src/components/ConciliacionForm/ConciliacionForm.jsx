import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaRegFilePdf } from "react-icons/fa";


export default function ConciliacionForm({bankId}) {

  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Especifica el rango de celdas que deseas leer (de la columna A a la J)
      const range = { s: { r: 0, c: 0 }, e: { r: 10, c: 8 } }; // Lee las primeras 11 filas y las columnas A a J

      // Lee solo las celdas dentro del rango especificado
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { range });

      jsonData.forEach((row) => {
        if (row["Fecha"]) {
          const date = XLSX.SSF.parse_date_code(row["Fecha"]);
          row["Fecha"] = `${date.d}/${date.m}/${date.y}`;
        }
      });

      setData(jsonData); // Almacena los datos en el estado del componente
    };

    reader.readAsArrayBuffer(file);
  };

  const exportToPDF = () => {
    const doc = new jsPDF("landscape");
    autoTable(doc, { html: tableRef.current });
    doc.save("table.pdf");
  };

  let cuenta = data && data.length > 0 ? data[0].Cuenta : null;

  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiGetMovimientos = `${apiUrlBase}/Movimientos/GetAllMovimientos`;

  return (
    <div>
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Seleccionar Archivo XLSX</Form.Label>
        <Form.Control type="file" size="lg" onChange={handleFileChange} />
      </Form.Group>

      <Button onClick={exportToPDF} style={{ marginBottom: "5px" }} variant="danger" >
        Exportar a PDF <FaRegFilePdf />
      </Button>

      <Table hover ref={tableRef}>
        <thead>
          <tr>
            <th style={{ border: "1px solid grey" }}>Cuenta</th>
            <th style={{ border: "1px solid grey" }}>Mes</th>
            <th style={{ border: "1px solid grey" }}>Año</th>
            <th style={{ backgroundColor: "white" }}></th>
            <th style={{ border: "1px solid grey" }}>C. Contable</th>
            <th style={{ border: "1px solid grey" }}>Descripción</th>
            <th style={{ border: "1px solid grey" }}>Fecha</th>
            <th style={{ border: "1px solid grey" }}>Monto</th>
            <th style={{ border: "1px solid grey" }}>#. Documento</th>
            <th style={{ backgroundColor: "white" }}></th>
            <th style={{ border: "1px solid grey" }}>C. Contable</th>
            <th style={{ border: "1px solid grey" }}>Descripción</th>
            <th style={{ border: "1px solid grey" }}>Fecha</th>
            <th style={{ border: "1px solid grey" }}>Monto</th>
            <th style={{ border: "1px solid grey" }}>#. Documento</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid grey" }}>{row["Cuenta"]}</td>
              <td style={{ border: "1px solid grey" }}>{row["Mes"]}</td>
              <td style={{ border: "1px solid grey" }}>{row["Anio"]}</td>
              <td style={{ backgroundColor: "white", border: "none" }}></td>
              <td style={{ border: "1px solid grey" }}>
                {row["Correlativo Contable"]}
              </td>
              <td style={{ border: "1px solid grey" }}>{row["Descripcion"]}</td>
              <td style={{ border: "1px solid grey" }}>{row["Fecha"]}</td>
              <td style={{ border: "1px solid grey" }}>{row["Monto"]}</td>
              <td style={{ border: "1px solid grey" }}>
                {row["No. Documento"]}
              </td>
              <td style={{ backgroundColor: "white", border: "none" }}></td>
              <td style={{ border: "1px solid grey" }}></td>
              <td style={{ border: "1px solid grey" }}></td>
              <td style={{ border: "1px solid grey" }}></td>
              <td style={{ border: "1px solid grey" }}></td>
              <td style={{ border: "1px solid grey" }}></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

ConciliacionForm.propTypes = {
    bankId: PropTypes.number,
  };