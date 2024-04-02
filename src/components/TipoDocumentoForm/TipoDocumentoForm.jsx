import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export default function TipoDocumentoForm({ record, onFormValuesChange }) {
  const apiUrlBase = import.meta.env.VITE_API_URL;
  const apiTipoDocumento = `${apiUrlBase}/TipoDocumento/GetTipoDocumento/${record}`;
  const [tipoDocumentoById, setTipoDocumentoById] = useState([]);
  console.log(tipoDocumentoById);

  useEffect(() => {
    if (record !== null) {
      fetch(apiTipoDocumento)
        .then((response) => response.json())
        .then((data) => {
          setTipoDocumentoById(data);
          setFormValues({
            nombreDocumento: data.NOMBRE_DOCUMENTO,
            descripcion: data.DESCRIPCION,
            operacion: data.OPERACION,
          });
          onFormValuesChange({
            nombreDocumento: data.NOMBRE_DOCUMENTO,
            descripcion: data.DESCRIPCION,
            operacion: data.OPERACION,
          });
        })
        .catch((error) => console.error("Error:", error));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiTipoDocumento, record]);

  const [formValues, setFormValues] = useState({
    nombreDocumento: "",
    operacion: "",
    descripcion: "",
  });


  const handleNombreDocumentoChange = (event) => {
    const newFormValues = {
      ...formValues,
      nombreDocumento: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleOperacionChange = (event) => {
    const newFormValues = {
      ...formValues,
      operacion: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };

  const handleDescripcionChange = (event) => {
    const newFormValues = {
      ...formValues,
      descripcion: event.target.value,
    };
    setFormValues(newFormValues);
    onFormValuesChange(newFormValues);
  };
  return(
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del Documento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre del Documento"
            name="nombreDocumento"
            value={formValues.nombreDocumento}
            onChange={handleNombreDocumentoChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Operacion</Form.Label>
          <Form.Control
            type="number"
            placeholder="Operacion"
            name="operacion"
            value={formValues.operacion}
            onChange={handleOperacionChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            placeholder="Descripcion"
            name="descripcion"
            value={formValues.descripcion}
            onChange={handleDescripcionChange}
          />
        </Form.Group>
      </Form>
    </>
  );
}

TipoDocumentoForm.propTypes = {
  record: PropTypes.number,
  onFormValuesChange: PropTypes.func,
};