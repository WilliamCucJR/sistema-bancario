import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

export default function UsersForm({ record, onFormValuesChange }) {
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiUser = `${apiUrlBase}/UserLogin/GetUserLogin/${record}`;
  const apiDepartamento = `${apiUrlBase}/DepartamentoControler/GetAllDepartamentos`;

  const [userById, setUserById] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  console.log(userById);

  useEffect(() => {
    fetch(apiDepartamento)
      .then((response) => response.json())
      .then((data) => {
        setDepartamentos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  console.log(departamentos);

  useEffect(() => {
    if (record !== null) {
      fetch(apiUser)
        .then((response) => response.json())
        .then((data) => {
          const formatoFechaNacimiento = data.FECHANACIMIENTO.replace(
            /\//g,
            "-"
          );

          const formatoFechaIngreso = data.FECHA_INGRESO.replace(/\//g, "-");
          console.log("Fecha ingreso ", formatoFechaIngreso);

          setUserById(data);
          setFormValues({
            primerNombre: data.PRIMER_NOMBRE,
            segundoNombre: data.SEGUNDO_NOMBRE,
            primerApellido: data.PRIMER_APELLIDO,
            segundoApellido: data.SEGUNDO_APELLIDO,
            usuario: data.NICKNAME,
            contrasenia: data.PASSWORD,
            dpi: data.DPI,
            nit: data.NIT,
            fechaNacimiento: formatoFechaNacimiento,
            celular: data.CELULAR,
            telefono: data.TELEFONO,
            email: data.EMAIL,
            direccion: data.DIRECCION,
            zona: data.ZONA,
            departamento: data.ID_DEPARTAMENTO,
            municipio: data.ID_MUNICIPIO,
            sexo: data.SEXO,
            nivelAcademico: data.NIVEL_ACADEMICO,
            departamentoSistema: data.DEPARTAMENTO_SISTEMA,
            puesto: data.PUESTO,
            fechaIngreso: formatoFechaIngreso,
            estatusUsuario: data.ESTATUS_USUARIO,
          });
          onFormValuesChange({
            primerNombre: data.PRIMER_NOMBRE,
            segundoNombre: data.SEGUNDO_NOMBRE,
            primerApellido: data.PRIMER_APELLIDO,
            segundoApellido: data.SEGUNDO_APELLIDO,
            usuario: data.NICKNAME,
            CONTRASENIA: data.PASSWORD,
            dpi: data.DPI,
            nit: data.NIT,
            fechaNacimiento: data.FECHANACIMIENTO,
            celular: data.CELULAR,
            telefono: data.TELEFONO,
            email: data.EMAIL,
            direccion: data.DIRECCION,
            zona: data.ZONA,
            departamento: data.ID_DEPARTAMENTO,
            municipio: data.ID_MUNICIPIO,
            sexo: data.SEXO,
            nivelAcademico: data.NIVEL_ACADEMICO,
            departamentoSistema: data.DEPARTAMENTO_SISTEMA,
            puesto: data.PUESTO,
            fechaIngreso: formatoFechaIngreso,
            estatusUsuario: data.ESTATUS_USUARIO,
          });
        })
        .catch((error) => console.error("Error:", error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUser, record]);

  const [formValues, setFormValues] = useState({
    telefono: "",
    dpi: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handlePrimerNombreChange = (event) => {
    const newFormValues = {
      ...formValues,
      primerNombre: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleSegundoNombreChange = (event) => {
    const newFormValues = {
      ...formValues,
      segundoNombre: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handlePrimerApellidoChange = (event) => {
    const newFormValues = {
      ...formValues,
      primerApellido: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleSegundoApellidoChange = (event) => {
    const newFormValues = {
      ...formValues,
      segundoApellido: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleUsuarioChange = (event) => {
    const newFormValues = {
      ...formValues,
      usuario: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleContraseniaChange = (event) => {
    const newFormValues = {
      ...formValues,
      contrasenia: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleNitChange = (event) => {
    const newFormValues = {
      ...formValues,
      nit: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleFechaNacimientoChange = (event) => {
    const newFormValues = {
      ...formValues,
      fechaNacimiento: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleCelularChange = (event) => {
    const newFormValues = {
      ...formValues,
      celular: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleTelefonoChange = (event) => {
    const newFormValues = {
      ...formValues,
      telefono: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleEmailChange = (event) => {
    const newFormValues = {
      ...formValues,
      email: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleDireccionChange = (event) => {
    const newFormValues = {
      ...formValues,
      direccion: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleZonaChange = (event) => {
    const newFormValues = {
      ...formValues,
      zona: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleDepartamentoChange = (event) => {
    const newFormValues = {
      ...formValues,
      departamento: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleMunicipioChange = (event) => {
    const newFormValues = {
      ...formValues,
      municipio: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleSexoChange = (event) => {
    const newFormValues = {
      ...formValues,
      sexo: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleNivelAcademicoChange = (event) => {
    const newFormValues = {
      ...formValues,
      nivelAcademico: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleDepartamentoSistemaChange = (event) => {
    const newFormValues = {
      ...formValues,
      departamentoSistema: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handlePuestoChange = (event) => {
    const newFormValues = {
      ...formValues,
      puesto: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleFechaIngresoChange = (event) => {
    const newFormValues = {
      ...formValues,
      fechaIngreso: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleEstatusUsuarioChange = (event) => {
    const newFormValues = {
      ...formValues,
      estatusUsuario: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  return (
    <>
      <h1>Mantenimiento de Usuarios {record}</h1>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Primer Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Primer Nombre"
                name="primerNombre"
                value={formValues.primerNombre}
                onChange={handlePrimerNombreChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Segundo Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Segundo Nombre"
                name="segundoNombre"
                value={formValues.segundoNombre}
                onChange={handleSegundoNombreChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Primer Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Primer Apellido"
                name="primerApellido"
                value={formValues.primerApellido}
                onChange={handlePrimerApellidoChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Segundo Apellido</Form.Label>
              <Form.Control
                type="text"
                name="segundoApellido"
                placeholder="Segundo Apellido"
                value={formValues.segundoApellido}
                onChange={handleSegundoApellidoChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Usuario"
                name="usuario"
                value={formValues.usuario}
                onChange={handleUsuarioChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasenia"
                placeholder="Contraseña"
                value={formValues.contrasenia}
                onChange={handleContraseniaChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>DPI</Form.Label>
              <Form.Control
                type="text"
                name="dpi"
                placeholder="DPI"
                value={formValues.dpi}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>NIT</Form.Label>
              <Form.Control
                type="text"
                name="NIT"
                placeholder="NIT"
                value={formValues.nit}
                onChange={handleNitChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="fechaNacimiento"
                placeholder="Fecha de Nacimiento"
                value={formValues.fechaNacimiento}
                onChange={handleFechaNacimientoChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="text"
                name="celular"
                placeholder="Celular"
                value={formValues.celular}
                onChange={handleCelularChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                placeholder="Telefono"
                value={formValues.telefono}
                onChange={handleTelefonoChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Correo"
                value={formValues.email}
                onChange={handleEmailChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formValues.direccion}
            onChange={handleDireccionChange}
          />
        </Form.Group>
      </Form>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Zona</Form.Label>
            <Form.Control
              type="number"
              name="zona"
              placeholder="Zona"
              value={formValues.zona}
              onChange={handleZonaChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Departamento</Form.Label>
            <Form.Select
              name="departamento"
              value={formValues.departamento}
              onChange={handleDepartamentoChange}
            >
              <option>Departamento</option>
              {departamentos.map((departamento) => (
                <option
                  key={departamento.ID}
                  value={departamento.ID}
                >
                  {departamento.NOMBRE_DEL_DEPARTAMENTO}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Municipio</Form.Label>
            <Form.Control
              type="number"
              name="municipio"
              placeholder="Municipio"
              value={formValues.municipio}
              onChange={handleMunicipioChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Sexo</Form.Label>
            <Form.Control
              type="text"
              name="sexo"
              placeholder="Sexo"
              value={formValues.sexo}
              onChange={handleSexoChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Nivel Academico</Form.Label>
            <Form.Control
              type="text"
              name="nivelAcademico"
              placeholder="Nivel Academico"
              value={formValues.nivelAcademico}
              onChange={handleNivelAcademicoChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Area / Departamento</Form.Label>
            <Form.Control
              type="text"
              name="departamentoSistema"
              placeholder="Area / Departamento"
              value={formValues.departamentoSistema}
              onChange={handleDepartamentoSistemaChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Puesto</Form.Label>
            <Form.Control
              type="text"
              name="puesto"
              placeholder="Puesto"
              value={formValues.puesto}
              onChange={handlePuestoChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Fecha Ingreso</Form.Label>
            <Form.Control
              type="date"
              name="fechaIngreso"
              placeholder="Fecha de Ingreso"
              value={formValues.fechaIngreso}
              onChange={handleFechaIngresoChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Estatus Usuario</Form.Label>
            <Form.Control
              type="text"
              name="estatusUsuario"
              placeholder="Estatus Usuario"
              value={formValues.estatusUsuario}
              onChange={handleEstatusUsuarioChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

UsersForm.propTypes = {
  record: PropTypes.number,
  onFormValuesChange: PropTypes.func,
};
