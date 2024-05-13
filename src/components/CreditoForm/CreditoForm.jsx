import { useState, useContext, useEffect } from 'react';
import { creditosContext } from "../BankModalCredito/BankModalCredito";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

export default function CreditoForm({ bankId }) {

    const { fetchCreditos } = useContext(creditosContext);

    const fechaActual = new Date().toISOString().split('T')[0];
    const [idCuenta, setIdCuenta] = useState("");
    const [idDocumento, setIdDocumento] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState(fechaActual);
    const [noDocumento, setNoDocumento] = useState("");
    const [monto, setMonto] = useState("");
    const [documentoContable, setDocumentoContable] = useState("");
    const [tipoDocumentos, setTipoDocumentos] = useState([]);
    const [cuentasCredito, setCuentasCredito] = useState([]);


    console.log('Bank ID -> ', bankId);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const apiUrlBase = import.meta.env.VITE_API_URL;
    const apiInsertMovimiento = `${apiUrlBase}/Movimientos/CreateMovimiento`;
    const apiGetTipoDocumentos = `${apiUrlBase}/TipoDocumento/GetAllTipoDocumentos`;
    const apiGetCuentasCredito = `${apiUrlBase}/CuentaBancaria/GetCuentaBancariaByBancoID/${bankId}`;


    useEffect(() => {
        fetch(apiGetTipoDocumentos)
          .then((response) => response.json())
          .then((data) => {
            setTipoDocumentos(data);
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
      
        const movimiento = {
          ID_MOVIMIENTO: 0,
          ID_CUENTA: idCuenta,
          ID_DOCUMENTO: idDocumento,
          DESCRIPCION: descripcion,
          FECHA: fecha,
          NO_DOCUMENTO: noDocumento,
          TIPO_DOCUMENTO_ID: 1,
          MONTO: monto,
          DOCUMENTO_CONTABLE: documentoContable,
        };
      
        fetch(apiInsertMovimiento, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movimiento),
        })
        .then(response => response.json())
        .then(data => {
          if (data) {
            console.log("Success:");
            fetchCreditos();
            setIdCuenta("");
            setIdDocumento("");
            setDescripcion("");
            setFecha(fechaActual);
            setNoDocumento("");
            setMonto("");
            setDocumentoContable("");
            setShowSuccessAlert(true);
            setTimeout(() => {
              setShowSuccessAlert(false);
            }, 5000);
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
              <Form.Label>Acreditar a cuenta</Form.Label>
              <Form.Select
                as="select"
                size="sm"
                value={idCuenta}
                onChange={(e) => setIdCuenta(e.target.value)}
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
                readOnly
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
            Registro guardado correctamente
          </Alert>
        )}
        {showErrorAlert && (
          <Alert variant="danger" id="alert-error">
            Error al guardar la información
          </Alert>
        )}
        <div className="text-end">
          <Button variant="success" type="submit">
            Guardar
          </Button>
        </div>
      </Form>
    </>
    )
}

CreditoForm.propTypes = {
    bankId: PropTypes.number,
  };