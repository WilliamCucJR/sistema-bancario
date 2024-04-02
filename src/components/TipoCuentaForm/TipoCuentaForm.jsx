import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export default function TipoCuentaForm({ record, onFormValuesChange }) {
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiTipoCuenta = `${apiUrlBase}/TipoCuenta/GetTipoCuenta/${record}`;
  const [tipoCuentaById, setTipoCuentaById] = useState([]);
  console.log(tipoCuentaById);

  useEffect(() => {
    if (record !== null) {
      fetch(apiTipoCuenta)
        .then((response) => response.json())
        .then((data) => {
            setTipoCuentaById(data);
          setFormValues({
            tipoCuenta: data.TIPO_DE_CUENTA,
          });
          onFormValuesChange({
            tipoCuenta: data.TIPO_DE_CUENTA,
          });
        })
        .catch((error) => console.error("Error:", error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiTipoCuenta, record]);

  const [formValues, setFormValues] = useState({
    tipoCuenta: "",
  });

  const handletipoCuentaChange = (event) => {
    const newFormValues = {
      ...formValues,
      tipoCuenta: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Tipo de Cuenta</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tipo de Cuenta"
            name="tipoCuenta"
            value={formValues.tipoCuenta}
            onChange={handletipoCuentaChange}
          />
        </Form.Group>
      </Form>
    </>
  );
}

TipoCuentaForm.propTypes = {
  record: PropTypes.number,
  onFormValuesChange: PropTypes.func,
};
