import { Form, Row, Col, Button } from "react-bootstrap";

export default function CuentaBancariaForm() {
  return (
    <>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>No. Cuenta</Form.Label>
              <Form.Control size="sm" type="text" placeholder="No. Cuenta" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Tipo de Cuenta</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Tipo de Cuenta"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Nombre" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>DPI</Form.Label>
              <Form.Control size="sm" type="number" placeholder="DPI" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>NIT</Form.Label>
              <Form.Control size="sm" type="text" placeholder="NIT" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Telefono</Form.Label>
              <Form.Control size="sm" type="number" placeholder="Telefono" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Correo</Form.Label>
              <Form.Control size="sm" type="email" placeholder="Correo" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Direccion</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Direccion" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Zona</Form.Label>
              <Form.Control size="sm" type="number" placeholder="Zona" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Departamento</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                placeholder="Departamento"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Municipio</Form.Label>
              <Form.Control size="sm" type="number" placeholder="Municipio" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Moneda</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Moneda" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Saldo</Form.Label>
              <Form.Control size="sm" type="number" placeholder="Saldo" />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-end">
          <Button variant="success" type="submit">
            Guardar
          </Button>
        </div>
      </Form>
    </>
  );
}
