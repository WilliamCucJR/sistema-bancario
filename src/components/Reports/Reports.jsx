import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { PiFilePdfBold } from "react-icons/pi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../img/sistema-logo-horizontal-black.png";

export default function Reports() {
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const [cashFlows, setCashflows] = useState([]);
  const [dataLoadedCashFlows, setDataLoadedCashFlows] = useState(false);

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

  const tableRefCashFlow = useRef(null);

  const cashFlowData = async () => {
    console.log("Mes:", mes);
    console.log("Año:", ano);

    const apiGetCashFlow = `${apiUrlBase}/CashFlow/GetReportCashFlow`;

    console.log(apiGetCashFlow);

    try {
      const response = await fetch(apiGetCashFlow);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setCashflows(data);
      setDataLoadedCashFlows(true);

      setTimeout(() => {
        exportCashFlowToPDF();
      }, 3000);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const exportCashFlowToPDF = () => {
    html2canvas(tableRefCashFlow.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait");
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
      pdf.save(`CashFlow_${formattedDate}.pdf`);
    });
  };

  return (
    <>
      <Form style={{ padding: "25px 55px" }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Row>
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
            onClick={cashFlowData}
          >
            <PiFilePdfBold size={50} />
            <span>Cashflow</span>
          </Button>
        </Col>
      </Row>

      {dataLoadedCashFlows && (
        <div ref={tableRefCashFlow}>
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
            <h3>Cashflow</h3>
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
                  Banco
                </th>
                <th
                  style={{
                    border: "1.5px solid black",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  No. Cuenta
                </th>
                <th
                  style={{
                    border: "1.5px solid black",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  Tipo Cuenta
                </th>
                <th
                  style={{
                    border: "1.5px solid black",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  Saldo
                </th>
              </tr>
            </thead>
            <tbody>
              {cashFlows.map((cashFlow, index) => (
                <tr key={index}>
                  <td style={{ border: "1.5px solid black" }}>{index + 1}</td>
                  <td style={{ border: "1.5px solid black" }}>
                    {cashFlow.NOMBRE_BANCO}
                  </td>
                  <td style={{ border: "1.5px solid black" }}>
                    {cashFlow.NO_DE_CUENTA}
                  </td>
                  <td style={{ border: "1.5px solid black" }}>
                    {cashFlow.TIPO_DE_CUENTA}
                  </td>
                  <td style={{ border: "1.5px solid black" }}>
                    Q
                    {parseFloat(cashFlow.SALDO).toLocaleString("en-US", {
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
    </>
  );
}
