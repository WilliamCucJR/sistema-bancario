import { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

export default function UsersForm({ record }) {

    const [formValues, setFormValues] = useState({
        telefono: '',
        dpi: '',
      });
      
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (value === '' || /^[0-9]+$/.test(value)) {
          setFormValues({
            ...formValues,
            [name]: value,
          });
        }
      };

  return (
    <>
      <h1>Mantenimiento de Usuarios {record}</h1>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nombres</Form.Label>
              <Form.Control type="text" placeholder="Nombres" name="nombres" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" placeholder="Apellidos" name="apellidos" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>DPI</Form.Label>
              <Form.Control type="text" placeholder="DPI" name="dpi" value={formValues.dpi} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control type="date" name="fecha_nacimiento" placeholder="Fecha de Nacimiento" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" name="telefono" placeholder="Telefono" value={formValues.telefono} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" name="email" placeholder="Correo" />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="text" name="direccion" placeholder="Dirección" />
        </Form.Group>
      </Form>
    </>
  );
}

UsersForm.propTypes = {
  record: PropTypes.int,
};
