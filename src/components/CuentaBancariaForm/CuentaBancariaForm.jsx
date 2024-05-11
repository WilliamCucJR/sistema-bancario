import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { CuentaBancariaContext } from "../BankModalCuenta/BankModalCuenta";

export default function CuentaBancariaForm({ bankId, selectedId }) {
  const { fetchCuentas } = useContext(CuentaBancariaContext);
  console.log("Cuenta recibida 2 -> ", selectedId);

  const idCuenta = selectedId > 0 ? selectedId : 0;
  const [cuenta, setCuenta] = useState(null);
  const bankIdStr = bankId;
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiInsertCuenta = `${apiUrlBase}/CuentaBancaria/CreateCuentaBancaria`;
  const apiUpdateCuenta = `${apiUrlBase}/CuentaBancaria/UpdateCuentaBancaria/${idCuenta}`;
  const apiGetCuenta = `${apiUrlBase}/CuentaBancaria/GetCuentaBancaria/${idCuenta}`;
  const apiMunicipio = `${apiUrlBase}/Municipio/GetAllMunicipios`;
  const apiDepartamento = `${apiUrlBase}/DepartamentoControler/GetAllDepartamentos`;
  const apiMoneda = `${apiUrlBase}/Moneda/GetAllMonedas`;
  const apiTipoCuenta = `${apiUrlBase}/TipoCuenta/GetAllTipoCuentas`;

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [monedas, setMonedas] = useState([]);
  const [tipoCuentas, setTipoCuentas] = useState([]);

  console.log('TIPO CUENTA -> ', tipoCuentas);

  //console.log("API URL -> ", apiGetCuenta);

  const [noCuenta, setNoCuenta] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("");
  const [nombre, setNombre] = useState("");
  const [dpi, setDpi] = useState("");
  const [nit, setNit] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [zona, setZona] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [moneda, setMoneda] = useState("");
  const [saldo, setSaldo] = useState("");

  useEffect(() => {
    fetch(apiMoneda)
      .then((response) => response.json())
      .then((data) => {
        setMonedas(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetch(apiTipoCuenta)
      .then((response) => response.json())
      .then((data) => {
        setTipoCuentas(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetch(apiDepartamento)
      .then((response) => response.json())
      .then((data) => {
        setDepartamentos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    // Asegúrate de que apiMunicipio esté definido y sea una URL válida
    if (!apiMunicipio) {
      console.error("apiMunicipio no está definido");
      return;
    }

    fetch(apiMunicipio)
      .then((response) => {
        // Verifica si la respuesta es ok antes de convertirla a JSON
        if (!response.ok) {
          throw new Error(`API error, status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Asegúrate de que setMunicipios esté definido
        if (typeof setMunicipios === "function") {
          setMunicipios(data);
        } else {
          console.error("setMunicipios no está definido");
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (idCuenta === 0) {
      return;
    }

    fetch(apiGetCuenta)
      .then((response) => response.json())
      .then((data) => {
        setCuenta(data);
        setNoCuenta(data.NO_DE_CUENTA || "");
        setTipoCuenta(data.TIPO_DE_CUENTA_ID || "");
        setNombre(data.NOMBRE_CUENTAHABIENTE || "");
        setDpi(data.DPI || "");
        setNit(data.NIT || "");
        setTelefono(data.TELEFONO || "");
        setCorreo(data.CORREO || "");
        setDireccion(data.DIRECCION || "");
        setZona(data.ZONA || "");
        setDepartamento(data.DEPARTAMENTO_ID || "");
        setMunicipio(data.MUNICIPIO_ID || "");
        setMoneda(data.MONEDA_ID || "");
        setSaldo(data.SALDO || "");
        // Haz lo mismo para los demás campos
      })
      .catch((error) => console.error("Error:", error));
  }, [apiGetCuenta, idCuenta]);

  console.log("Cuenta -> ", cuenta);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cuentaData = {
      ID_CUENTA: idCuenta,
      BANCO_ID: bankIdStr,
      NO_DE_CUENTA: noCuenta,
      TIPO_DE_CUENTA_ID: tipoCuenta,
      NOMBRE_CUENTAHABIENTE: nombre,
      DPI: dpi,
      NIT: nit,
      TELEFONO: telefono,
      CORREO: correo,
      DIRECCION: direccion,
      ZONA: zona,
      DEPARTAMENTO_ID: departamento,
      MUNICIPIO_ID: municipio,
      MONEDA_ID: moneda,
      SALDO: saldo,
    };

    console.log(cuentaData);

    const apiUrl = idCuenta > 0 ? apiUpdateCuenta : apiInsertCuenta;

    console.log("API URL -> ", apiUrl);

    fetch(apiUrl, {
      method: idCuenta > 0 ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cuentaData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `HTTP error! status: ${response.status}, message: ${text}`
            );
          });
        }
        return response.text();
      })
      .then((data) => {
        if (data) {
          const jsonData = JSON.parse(data);
          console.log("Success:", jsonData);
          fetchCuentas();
          setNoCuenta("");
          setTipoCuenta("");
          setNombre("");
          setDpi("");
          setNit("");
          setTelefono("");
          setCorreo("");
          setDireccion("");
          setZona("");
          setDepartamento("");
          setMunicipio("");
          setMoneda("");
          setSaldo("");
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>No. Cuenta</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="No. Cuenta"
                value={noCuenta}
                onChange={(e) => setNoCuenta(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Tipo de Cuenta</Form.Label>
              <Form.Select
                as="select"
                size="sm"
                value={tipoCuenta}
                onChange={(e) => setTipoCuenta(e.target.value)}
              >
                <option>Seleccionar</option>
                {tipoCuentas.map((mun, index) => (
                  <option key={index} value={mun.ID}>
                    {mun.TIPO_DE_CUENTA}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>DPI</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                placeholder="DPI"
                value={dpi}
                onChange={(e) => setDpi(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>NIT</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="NIT"
                value={nit}
                onChange={(e) => setNit(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                placeholder="Telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                size="sm"
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Zona</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                placeholder="Zona"
                value={zona}
                onChange={(e) => setZona(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Departamento</Form.Label>
              <Form.Select
                as="select"
                size="sm"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
              >
                <option>Seleccionar</option>
                {departamentos.map((dep, index) => (
                  <option key={index} value={dep.ID}>
                    {dep.NOMBRE_DEL_DEPARTAMENTO}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Municipio</Form.Label>
              <Form.Select
                as="select"
                size="sm"
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
              >
                <option>Seleccionar</option>
                {municipios.map((mun, index) => (
                  <option key={index} value={mun.ID}>
                    {mun.Nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Moneda</Form.Label>
              <Form.Select
                as="select"
                size="sm"
                value={moneda}
                onChange={(e) => setMoneda(e.target.value)}
              >
                <option>Seleccionar</option>
                {monedas.map((dep, index) => (
                  <option key={index} value={dep.ID}>
                    {dep.TIPO_MONEDA}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Saldo</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                placeholder="Saldo"
                value={saldo}
                onChange={(e) => setSaldo(e.target.value)}
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
  );
}

CuentaBancariaForm.propTypes = {
  bankId: PropTypes.number,
  cuenta: PropTypes.number,
  selectedId: PropTypes.number,
};
