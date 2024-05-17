import { useState, useContext, useEffect } from "react";
import { debitosContext } from "../BankModalDebito/BankModalDebito";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

export default function DebitoForm({ bankId }) {
  const { fetchDebitos } = useContext(debitosContext);

  const [idCuenta, setIdCuenta] = useState("");
  const [idCuentaCredito, setIdCuentaCredito] = useState("");
  const [idDocumento, setIdDocumento] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [noDocumento, setNoDocumento] = useState("");
  const [monto, setMonto] = useState("");
  const [documentoContable, setDocumentoContable] = useState("");
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [cuentasDebito, setCuentasDebito] = useState([]);
  const [cuentasCredito, setCuentasCredito] = useState([]);
  const [errorMessage, setErrorMessage] = useState(
    "Error al guardar la información"
  );
  const [successMessage, setSuccessMessage] = useState(
    "Registro guardado correctamente"
  );

  console.log("Bank ID -> ", bankId);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiInsertMovimiento = `${apiUrlBase}/Movimientos/CreateMovimientoStoreProcedure`;
  const apiGetTipoDocumentos = `${apiUrlBase}/TipoDocumento/GetAllTipoDocumentosDebito`;
  const apiGetCuentasDebito = `${apiUrlBase}/CuentaBancaria/GetCuentaBancariaByBancoID/${bankId}`;
  const apiGetCuentasCredito = `${apiUrlBase}/CuentaBancaria/GetAllCuentasBancarias`;

  useEffect(() => {
    fetch(apiGetTipoDocumentos)
      .then((response) => response.json())
      .then((data) => {
        setTipoDocumentos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetch(apiGetCuentasDebito)
      .then((response) => response.json())
      .then((data) => {
        setCuentasDebito(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetch(apiGetCuentasCredito)
      .then((response) => response.json())
      .then((data) => {
        setCuentasCredito(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    let movimientoInverso = {};

    const movimiento = {
      ID_MOVIMIENTO: 0,
      ID_CUENTA: idCuenta,
      ID_DOCUMENTO: idDocumento,
      DESCRIPCION: descripcion,
      FECHA: fecha,
      NO_DOCUMENTO: noDocumento,
      TIPO_DOCUMENTO_ID: idDocumento,
      MONTO: monto,
      DOCUMENTO_CONTABLE: documentoContable,
    };

    fetch(apiInsertMovimiento, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movimiento),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.message === "Saldo actualizado con éxito") {
            console.log("Success:");
            console.log(data.message);
            fetchDebitos();
            setIdCuenta("");
            setIdDocumento("");
            setDescripcion("");
            setFecha("");
            setNoDocumento("");
            setMonto("");
            setDocumentoContable("");
            setIdCuentaCredito("");

            setSuccessMessage(data.message);
            setShowSuccessAlert(true);
            setTimeout(() => {
              setShowSuccessAlert(false);
            }, 5000);

            fetch(apiInsertMovimiento, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(movimientoInverso),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });

              if (idCuentaCredito > 0) {
                const apiGetDocumentoById = `${apiUrlBase}/TipoDocumento/GetTipoDocumento/${idDocumento}`;
            
                let nombreDocumento;
                let idDocumentoContrario;
            
                fetch(apiGetDocumentoById)
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Data Documento Nombre -> ", data);
                    nombreDocumento = data.NOMBRE_DOCUMENTO;
                    nombreDocumento = nombreDocumento.replace("Debito", "Credito");
            
                    const apiGetDocumentoByNombre = `${apiUrlBase}/TipoDocumento/GetTipoDocumentoByNombre/${nombreDocumento}`;
            
                    return fetch(apiGetDocumentoByNombre);
                  })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Data Documento ID -> ", data);
                    idDocumentoContrario = data.ID;
            
                    movimientoInverso = {
                      ID_MOVIMIENTO: 0,
                      ID_CUENTA: idCuentaCredito,
                      ID_DOCUMENTO: idDocumentoContrario,
                      DESCRIPCION: descripcion,
                      FECHA: fecha,
                      NO_DOCUMENTO: noDocumento,
                      TIPO_DOCUMENTO_ID: idDocumentoContrario,
                      MONTO: monto,
                      DOCUMENTO_CONTABLE: documentoContable,
                    };
            
                    return fetch(apiInsertMovimiento, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(movimientoInverso),
                    });
                  })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Success:", data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }
          } else {
            setErrorMessage(data.message);
            setShowErrorAlert(true);
            setTimeout(() => {
              setShowErrorAlert(false);
            }, 5000);
          }
        } else {
          console.log("No content returned");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 5000);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Debitar de cuenta</Form.Label>
              <Form.Select
                as="select"
                size="sm"
                value={idCuenta}
                onChange={(e) => setIdCuenta(e.target.value)}
              >
                <option>Seleccionar</option>
                {cuentasDebito.map((mun, index) => (
                  <option key={index} value={mun.ID_CUENTA}>
                    {mun.NO_DE_CUENTA}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Acreditar a cuenta</Form.Label>
              <Form.Select
                as="select"
                size="sm"
                value={idCuentaCredito}
                onChange={(e) => setIdCuentaCredito(e.target.value)}
              >
                <option>Seleccionar</option>
                {cuentasCredito.map((mun, index) => (
                  <option key={index} value={mun.ID_CUENTA}>
                    {mun.NO_DE_CUENTA}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Documento</Form.Label>
              <Form.Select
                as="select"
                size="sm"
                value={idDocumento}
                onChange={(e) => setIdDocumento(e.target.value)}
              >
                <option>Seleccionar</option>
                {tipoDocumentos.map((mun, index) => (
                  <option key={index} value={mun.ID}>
                    {mun.NOMBRE_DOCUMENTO}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                size="sm"
                type="date"
                placeholder="Fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>No. Documento</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="No. Documento"
                value={noDocumento}
                onChange={(e) => setNoDocumento(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                placeholder="Monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Correlativo Contable</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Correlativo Contable"
                value={documentoContable}
                onChange={(e) => setDocumentoContable(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        {showSuccessAlert && (
          <Alert variant="success" id="alert-success">
            {successMessage}
          </Alert>
        )}
        {showErrorAlert && (
          <Alert variant="danger" id="alert-error">
            {errorMessage}
          </Alert>
        )}
        <div className="text-end">
          <Button variant="success" type="submit">
            Guardar
          </Button>
        </div>
      </Form>
    </>
  );
}

DebitoForm.propTypes = {
  bankId: PropTypes.number,
};
