import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaRegFilePdf } from "react-icons/fa";

export default function ConciliacionForm({ bankId }) {
  console.log("bankId: ", bankId);

  const [data, setData] = useState([]);
  const [conciliacion, setConciliacion] = useState([]);

  const [cuentaData, setCuentaData] = useState(null);
  const [mesData, setMesData] = useState(null);
  const [anioData, setAnioData] = useState(null);

  var cuenta = null;
  var mes = null;
  var anio = null;

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
        if (row["FECHA"]) {
          const date = XLSX.SSF.parse_date_code(row["FECHA"]);
          row["FECHA"] = `${date.d}/${date.m}/${date.y}`;
        }
      });

      setData(jsonData);

      if (jsonData && jsonData.length > 0) {
        cuenta = jsonData[0].NO_DE_CUENTA;
        mes = jsonData[0].MES;
        anio = jsonData[0].ANIO;

        setCuentaData(cuenta);
        setMesData(mes);
        setAnioData(anio);

        const apiUrlBase = import.meta.env.VITE_API_URL;
        const apiGetConciliacion = `${apiUrlBase}/Conciliacion/GetConciliacion/${cuenta}/${bankId}/${mes}/${anio}`;

        console.log("apiGetConciliacion: ", apiGetConciliacion);

        fetch(apiGetConciliacion)
          .then((response) => response.json())
          .then((data) => {
            // Asegúrate de que la fecha existe antes de intentar formatearla
            if (Array.isArray(data)) {
              data.forEach((item) => {
                if (item.FECHA) {
                  const fechaObj = new Date(item.FECHA);
                  const dia = fechaObj.getUTCDate();
                  const mes = fechaObj.getUTCMonth() + 1; // Los meses en JavaScript empiezan en 0, por lo que debes sumar 1
                  const anio = fechaObj.getUTCFullYear();
                  item.FECHA = `${dia}/${mes}/${anio}`;
                }
              });
            }

            setConciliacion(data);
          })
          .catch((error) => console.error("Error:", error));
      } else {
        console.log("jsonData no está definida o es un array vacío");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const exportToPDF = () => {
    const doc = new jsPDF("landscape");
    autoTable(doc, { html: tableRef.current });
    doc.save("Conciliacion.pdf");
  };

  console.log("Conciliacion: ", conciliacion);
  console.log("Data: ", data);

// Primero, mapea el array data
let resultConciliacion = data.map((d) => {
  // Busca el elemento en conciliacion
  const conciliacionItem = conciliacion.find(
    (c) => String(c.NO_DOCUMENTO) === String(d.NO_DOCUMENTO) && String(c.FECHA) === String(d.FECHA) && String(c.MONTO) === String(d.MONTO)
  );

  // Si el elemento se encuentra en ambos arrays, crea un objeto con todos los campos
  if (conciliacionItem) {
    return {
      descripcion_data: d.DESCRIPCION,
      fecha_data: d.FECHA,
      monto_data: d.MONTO,
      no_documento_data: d.NO_DOCUMENTO,
      descripcion_conciliacion: conciliacionItem.DESCRIPCION,
      fecha_conciliacion: conciliacionItem.FECHA,
      monto_conciliacion: conciliacionItem.MONTO,
      no_documento_conciliacion: conciliacionItem.NO_DOCUMENTO,
      color: '#eaf6f0',
    };
  }

  // Si el elemento solo se encuentra en data, crea un objeto con solo los campos data llenos
  return {
    descripcion_data: d.DESCRIPCION,
    fecha_data: d.FECHA,
    monto_data: d.MONTO,
    no_documento_data: d.NO_DOCUMENTO,
    color: '#fae9e9',
  };
});

// Luego, mapea el array conciliacion para encontrar los elementos que solo están en conciliacion
conciliacion.forEach((c) => {
  if (!data.find((d) => String(d.NO_DOCUMENTO) === String(c.NO_DOCUMENTO) && String(d.FECHA) === String(c.FECHA) && String(d.MONTO) === String(c.MONTO))) {
    resultConciliacion.push({
      descripcion_conciliacion: c.DESCRIPCION,
      fecha_conciliacion: c.FECHA,
      monto_conciliacion: c.MONTO,
      no_documento_conciliacion: c.NO_DOCUMENTO,
      color: '#fae9e9',
    });
  }
});

  resultConciliacion = resultConciliacion.map(item => ({
    ...item,
    cuenta: cuentaData,
    mes: mesData,
    anio: anioData
  }));

  console.log("Result Conciliacion: ", resultConciliacion);
  //const apiUrlBase = import.meta.env.VITE_API_URL;
  //const apiGetMovimientos = `${apiUrlBase}/Movimientos/GetAllMovimientos`;

  return (
    <div>
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Seleccionar Archivo XLSX</Form.Label>
        <Form.Control type="file" size="lg" onChange={handleFileChange} />
      </Form.Group>

      <Button
        onClick={exportToPDF}
        style={{ marginBottom: "5px" }}
        variant="danger"
      >
        Exportar a PDF <FaRegFilePdf />
      </Button>

      <Table hover ref={tableRef}>
        <thead>
          <tr>
            <th style={{ border: "1px solid grey" }}></th>
            <th style={{ border: "1px solid grey" }}></th>
            <th style={{ border: "1px solid grey" }}></th>

            <th style={{ backgroundColor: "white" }}></th>

            <th style={{ border: "1px solid grey", textAlign: "center" }} colSpan={4}>Archivo</th>

            <th style={{ backgroundColor: "white" }}></th>

            <th style={{ border: "1px solid grey", textAlign: "center" }} colSpan={4}>Banco</th>
          </tr>
          <tr>
            <th style={{ border: "1px solid grey" }}>Cuenta</th>
            <th style={{ border: "1px solid grey" }}>Mes</th>
            <th style={{ border: "1px solid grey" }}>Año</th>

            <th style={{ backgroundColor: "white" }}></th>

            <th style={{ border: "1px solid grey" }}>Descripción</th>
            <th style={{ border: "1px solid grey" }}>Fecha</th>
            <th style={{ border: "1px solid grey" }}>Monto</th>
            <th style={{ border: "1px solid grey" }}>#. Documento</th>

            <th style={{ backgroundColor: "white" }}></th>

            <th style={{ border: "1px solid grey" }}>Descripción</th>
            <th style={{ border: "1px solid grey" }}>Fecha</th>
            <th style={{ border: "1px solid grey" }}>Monto</th>
            <th style={{ border: "1px solid grey" }}>#. Documento</th>
          </tr>
        </thead>
        <tbody>
          {resultConciliacion.map((row, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid grey" }}>
                {row["cuenta"]}
              </td>
              <td style={{ border: "1px solid grey" }}>{row["mes"]}</td>
              <td style={{ border: "1px solid grey" }}>{row["anio"]}</td>
              <td style={{ backgroundColor: "white", border: "none" }}></td>
              <td style={{ border: "1px solid grey", backgroundColor: row.color }}>{row["descripcion_data"]}</td>
              <td style={{ border: "1px solid grey", backgroundColor: row.color }}>{row["fecha_data"]}</td>
              <td style={{ border: "1px solid grey", backgroundColor: row.color }}>{row["monto_data"]}</td>
              <td style={{ border: "1px solid grey", backgroundColor: row.color }}>
                {row["no_documento_data"]}
              </td>

              <td style={{ backgroundColor: "white", border: "none" }}></td>

              <td style={{ border: "1px solid grey", backgroundColor: row.color }}>{row["descripcion_conciliacion"]}</td>
              <td style={{ border: "1px solid grey", backgroundColor: row.color }}>{row["fecha_conciliacion"]}</td>
              <td style={{ border: "1px solid grey", backgroundColor: row.color }}>{row["monto_conciliacion"]}</td>
              <td style={{ border: "1px solid grey", backgroundColor: row.color }}>{row["no_documento_conciliacion"]}</td>
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
