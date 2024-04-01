import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export default function BankForm({ record, onFormValuesChange }) {

    const apiUrlBase = import.meta.env.VITE_API_URL;
    const apiBank = `${apiUrlBase}/Banco/GetBanco/${record}`;
    const [bankById, setBankById] = useState([]);
    console.log(bankById);
  
    useEffect(() => {
      if (record !== null) {
        fetch(apiBank)
          .then((response) => response.json())
          .then((data) => {
            setBankById(data);
            setFormValues({
                banco: data.NOMBRE_BANCO,
            });
            onFormValuesChange({
                banco: data.NOMBRE_BANCO,
            });
          })
          .catch((error) => console.error("Error:", error));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiBank, record]);

    const [formValues, setFormValues] = useState({
        banco: "",
      });

    const handleTipoBancoChange = (event) => {
        const newFormValues = {
          ...formValues,
          banco: event.target.value,
        };
        setFormValues(newFormValues);
        onFormValuesChange(newFormValues);
      };
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Banco</Form.Label>
          <Form.Control
            type="text"
            placeholder="Banco"
            name="banco"
            value={formValues.banco}
            onChange={handleTipoBancoChange}
          />
        </Form.Group>
      </Form>
    </>
  );
}

BankForm.propTypes = {
  record: PropTypes.number,
  onFormValuesChange: PropTypes.func,
};
