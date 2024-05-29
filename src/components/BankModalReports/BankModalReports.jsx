import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { PiFilePdfBold } from "react-icons/pi";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../img/sistema-logo-horizontal-black.png";

export default function BankModalReports({ bankId }) {
  console.log(bankId);

  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiGetCuentas = `${apiUrlBase}/CuentaBancaria/GetCuentaBancariaByBancoID/${bankId}`;

  const [cuentas, setCuentas] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [estadoCuentas, setEstadoCuentas] = useState([]);
  const [dataLoadedMovimientos, setDataLoadedMovimientos] = useState(false);
  const [dataLoadedEstadoCuenta, setDataLoadedEstadoCuenta] = useState(false);

  const [cuenta, setCuenta] = useState("");
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [ano, setAno] = useState("");
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  useEffect(() => {
    fetch(apiGetCuentas)
      .then((response) => response.json())
      .then((data) => {
        setCuentas(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [apiGetCuentas]);

  console.log(cuentas);

  const tableRefMovimientos = useRef(null);
  const tableRefEstadoCuenta = useRef(null);

  const exportToPDF = () => {
    const doc = new jsPDF("landscape");
    autoTable(doc, { html: tableRefMovimientos.current });
    doc.save("MovimientosPorTipo.pdf");
  };

  const estadoCuentaReport = async () => {
    setDataLoadedMovimientos(false);
    console.log("Cuenta:", cuenta);
    console.log("Mes:", mes);

    const mesFormateado = String(mes).padStart(2, "0");

    const apiGetEstadoCuenta = `${apiUrlBase}/EstadoDeCuenta/${cuenta}/${mesFormateado}`;

    console.log(apiGetEstadoCuenta);

    try {
      const response = await fetch(apiGetEstadoCuenta);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      console.log(data);
      setEstadoCuentas(data);
      setDataLoadedEstadoCuenta(true);

      setTimeout(() => {
        exportEstadoCuentaToPDF();
      }, 3000);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const exportEstadoCuentaToPDF = () => {
    html2canvas(tableRefEstadoCuenta.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const padding = 10; // Ajusta este valor para cambiar el padding
      const widthWithPadding = pdfWidth - padding * 2;
      const heightWithPadding = pdfHeight - padding * 2;
      const canvasAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = widthWithPadding / heightWithPadding;
      let width, height;
      if (canvasAspectRatio > pdfAspectRatio) {
        width = widthWithPadding;
        height = width / canvasAspectRatio;
      } else {
        height = heightWithPadding;
        width = height * canvasAspectRatio;
      }
      pdf.addImage(imgData, "PNG", padding, padding, width, height);

      // Obtén la fecha y hora actual y formátala como una cadena de solo números
      const date = new Date();
      const formattedDate = `${date.getFullYear()}${String(
        date.getMonth() + 1
      ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}${String(
        date.getHours()
      ).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(
        date.getSeconds()
      ).padStart(2, "0")}`;

      // Concatena la fecha y hora formateada con el nombre del archivo PDF
      pdf.save(`EstadoDeCuenta${formattedDate}.pdf`);
    });
  };

  const movimientosPorTipo = async () => {
    console.log("Mes:", mes);
    console.log("Año:", ano);
    setDataLoadedEstadoCuenta(false);

    const mesFormateado = String(mes).padStart(2, "0");

    const apiGetMovimientos = `${apiUrlBase}/MovPorDescripcion/GetReportMovPorDescripcion/${mesFormateado}`;

    console.log(apiGetMovimientos);

    try {
      const response = await fetch(apiGetMovimientos);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setMovimientos(data);
      setDataLoadedMovimientos(true);

      setTimeout(() => {
        exportMovimientosToPDF();
      }, 3000);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const exportMovimientosToPDF = () => {
    html2canvas(tableRefMovimientos.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const padding = 10; // Ajusta este valor para cambiar el padding
      const widthWithPadding = pdfWidth - padding * 2;
      const heightWithPadding = pdfHeight - padding * 2;
      const canvasAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = widthWithPadding / heightWithPadding;
      let width, height;
      if (canvasAspectRatio > pdfAspectRatio) {
        width = widthWithPadding;
        height = width / canvasAspectRatio;
      } else {
        height = heightWithPadding;
        width = height * canvasAspectRatio;
      }
      pdf.addImage(imgData, "PNG", padding, padding, width, height);

      // Obtén la fecha y hora actual y formátala como una cadena de solo números
      const date = new Date();
      const formattedDate = `${date.getFullYear()}${String(
        date.getMonth() + 1
      ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}${String(
        date.getHours()
      ).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(
        date.getSeconds()
      ).padStart(2, "0")}`;

      // Concatena la fecha y hora formateada con el nombre del archivo PDF
      pdf.save(`MovimientosPorTipo_${formattedDate}.pdf`);
    });
  };

  return (
    <>
      <Form style={{ padding: "25px 55px" }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Row>
            <Col>
              <Form.Label>No. Cuenta</Form.Label>
              <Form.Select
                value={cuenta}
                onChange={(e) => setCuenta(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {cuentas.map((cuenta) => (
                  <option key={cuenta.ID_CUENTA} value={cuenta.NO_DE_CUENTA}>
                    {cuenta.NO_DE_CUENTA}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Mes</Form.Label>
              <Form.Select value={mes} onChange={(e) => setMes(e.target.value)}>
                {meses.map((mes, index) => (
                  <option key={index} value={index + 1}>
                    {mes}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Año</Form.Label>
              <Form.Control
                as="select"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
              >
                {[...Array(10)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Row>
        <Col className="d-flex justify-content-center align-items-center mb-3">
          <Button
            variant="danger"
            style={{ width: "18rem" }}
            className="d-flex flex-column align-items-center"
            onClick={estadoCuentaReport}
          >
            <PiFilePdfBold size={50} />
            <span>Estado de Cuenta</span>
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center mb-3">
          <Button
            variant="danger"
            style={{ width: "18rem" }}
            className="d-flex flex-column align-items-center"
            onClick={exportToPDF}
          >
            <PiFilePdfBold size={50} />
            <span>Reporte de Creditos</span>
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center mb-3">
          <Button
            variant="danger"
            style={{ width: "18rem" }}
            className="d-flex flex-column align-items-center"
          >
            <PiFilePdfBold size={50} />
            <span>Reporte de Debitos</span>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center align-items-center mb-3">
          <Button
            variant="danger"
            style={{ width: "18rem" }}
            className="d-flex flex-column align-items-center"
            onClick={movimientosPorTipo}
          >
            <PiFilePdfBold size={50} />
            <span>Movimientos por Descripción</span>
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center mb-3">
          <Button
            variant="danger"
            style={{ width: "18rem" }}
            className="d-flex flex-column align-items-center"
          >
            <PiFilePdfBold size={50} />
            <span>Cuentas Creadas</span>
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center mb-3">
          <Button
            variant="danger"
            style={{ width: "18rem" }}
            className="d-flex flex-column align-items-center"
          >
            <PiFilePdfBold size={50} />
            <span>Titulo del reporte</span>
          </Button>
        </Col>
      </Row>
      {dataLoadedMovimientos && (
        <div ref={tableRefMovimientos}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={logo}
              alt="Logo del sistema"
              style={{ height: "100px" }}
            />
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h3>Movimientos por Descripción</h3>
          </div>
          <Table bordered hover>
            <thead>
              <tr>
                <th
                  style={{
                    border: "1.5px solid black",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  #
                </th>
                <th
                  style={{
                    border: "1.5px solid black",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  Documento
                </th>
                <th
                  style={{
                    border: "1.5px solid black",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  Monto
                </th>
              </tr>
            </thead>
            <tbody>
              {movimientos.map((movimiento, index) => (
                <tr key={index}>
                  <td style={{ border: "1.5px solid black" }}>{index + 1}</td>
                  <td style={{ border: "1.5px solid black" }}>
                    {movimiento.NOMBRE_DOCUMENTO}
                  </td>
                  <td style={{ border: "1.5px solid black" }}>
                    Q
                    {parseFloat(movimiento.MONTO).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {dataLoadedEstadoCuenta && (
        <div ref={tableRefEstadoCuenta}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={logo}
              alt="Logo del sistema"
              style={{ height: "100px" }}
            />
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h3>Estado de Cuenta</h3>
          </div>
          <Table bordered hover>
            <thead>
              <tr>
                <th
                  style={{
                    border: "1.5px solid black",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  #
                </th>
                <th
                  style={{
                    border: "1.5px solid black",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  Descripcion
                </th>
                <th
                  style={{
                    border: "1.5px solid black",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  Documento
                </th>
                <th
                  style={{
                    border: "1.5px solid black",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  Fecha
                </th>
                <th
                  style={{
                    border: "1.5px solid black",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  Credito
                </th>
                <th
                  style={{
                    border: "1.5px solid black",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  Debito
                </th>
              </tr>
            </thead>
            <tbody>
              {estadoCuentas.map((estadoCuenta, index) => (
                <tr key={index}>
                  <td style={{ border: "1.5px solid black" }}>{index + 1}</td>
                  <td style={{ border: "1.5px solid black" }}>
                    {estadoCuenta.DESCRIPCION}
                  </td>
                  <td style={{ border: "1.5px solid black" }}>
                    {estadoCuenta.NO_DOCUMENTO}
                  </td>
                  <td style={{ border: "1.5px solid black" }}>
                    {estadoCuenta.FECHA}
                  </td>
                  <td style={{ border: "1.5px solid black" }}>
                    {estadoCuenta.OPERACION > 0
                      ? "Q" +
                        parseFloat(estadoCuenta.MONTO).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : ""}
                  </td>
                  <td style={{ border: "1.5px solid black" }}>
                    {estadoCuenta.OPERACION < 0
                      ? "Q" +
                        parseFloat(estadoCuenta.MONTO).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

BankModalReports.propTypes = {
  bankId: PropTypes.number,
};
