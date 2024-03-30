import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export default function MonedaForm({ record }) {
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiMoneda = `${apiUrlBase}/Moneda/GetMoneda/${record}`;
  const [monedaById, setMonedaById] = useState([]);
  console.log(monedaById);

  useEffect(() => {
    if (record !== null) {
      fetch(apiMoneda)
        .then((response) => response.json())
        .then((data) => {
          setMonedaById(data);
          setFormValues({
            tipoMoneda: data.TIPO_MONEDA,
            tasaCambio: data.TASA_DE_CAMBIO,
          });
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [apiMoneda, record]);

  const [formValues, setFormValues] = useState({
    tasaCambio: "",
    tipoMoneda: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (value === "" || /^[0-9.]+$/.test(value)) {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleTipoMonedaChange = (event) => {
    setFormValues({
      ...formValues,
      tipoMoneda: event.target.value,
    });
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Tipo de Moneda</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tipo de Moneda"
            name="tipoMoneda"
            value={formValues.tipoMoneda}
            onChange={handleTipoMonedaChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tasa de Cambio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tasa de Cambio"
            name="tasaCambio"
            value={formValues.tasaCambio}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
    </>
  );
}

MonedaForm.propTypes = {
  record: PropTypes.number,
};
