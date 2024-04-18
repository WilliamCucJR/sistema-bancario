import { Row, Col } from "react-bootstrap";
import CuentaBancariaForm from "../CuentaBancariaForm";
import CuentaBancariaTable from "../CuentaBancariaTable/CuentaBancariaTable";

export default function BankModalCuenta() {
  return (
    <>
      <Row>
        <Col md={6} className="p-4">
          <CuentaBancariaForm />
        </Col>
        <Col md={6} className="p-4">
          <CuentaBancariaTable />
        </Col>
      </Row>
    </>
  );
}
