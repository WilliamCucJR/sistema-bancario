import { useState } from 'react';
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import Modal from "react-bootstrap/Modal";
import UsersForm from "../UsersForm/UsersForm";
import BankForm from "../BankForm/BankForm";
import MonedaForm from "../MonedaForm/MonedaForm";
import TipoCuentaForm from "../TipoCuentaForm/TipoCuentaForm";
import "./CatalogueModal.css";

export default function CatalogueModal({ show, handleClose, isEditing, record, catalogType, onSuccess }) {

    //let form;
    let modalTitle;
    let form;

    const [formValues, setFormValues] = useState({});
    const [alertVisible, setAlertVisible] = useState(false);
    const [error, setError] = useState(null);



    const handleFormValuesChange = (values) => {
      setFormValues(values);
    };

    switch (catalogType) {
      case 'bank':
        form = <BankForm record={isEditing ? record.ID : null} onFormValuesChange={handleFormValuesChange} />;
        modalTitle = isEditing == true ? "Editar Banco" : "Agregar Banco";
        break;
      case 'user':
        form = <UsersForm record={isEditing ? record.ID : null} onFormValuesChange={handleFormValuesChange} />;
        modalTitle = isEditing == true ? "Editar Usuario" : "Agregar Usuario";
        break;
      case 'moneda':
        form = <MonedaForm record={isEditing ? record.ID : null} onFormValuesChange={handleFormValuesChange} />;
        modalTitle = isEditing == true ? "Editar Moneda" : "Agregar Moneda";
        break;
      case 'tipocuenta':
        form = <TipoCuentaForm record={isEditing ? record.ID : null} onFormValuesChange={handleFormValuesChange} />;
        modalTitle = isEditing == true ? "Editar Tipo Cuenta" : "Agregar Tipo Cuenta";
        break;
      default:
        form = null;
    }

    const handleSubmit = () => {
      console.log(formValues);
      console.log(record?.ID);
    
      const url = record?.ID
        ? `https://localhost:7061/api/Moneda/UpdateMoneda/${record.ID}`
        : 'https://localhost:7061/api/Moneda/CreateMoneda';
    
      console.log(url);
    
      const method = record?.ID ? 'PUT' : 'POST';
    
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: record?.ID,
          TIPO_MONEDA: formValues.tipoMoneda,
          TASA_DE_CAMBIO: formValues.tasaCambio,
        }),
      })
      .then(data => {
        console.log('Success:', data);
        setAlertVisible(true); // Muestra la alerta
  
        // Oculta la alerta después de 5 segundos, cierra el modal y recarga los datos
        setTimeout(() => {
          setAlertVisible(false);
          handleClose();
          onSuccess();
        }, 3000);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(error.message);
      });
    };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} className="catalogue-modal">
        <Modal.Header closeButton className='modal-catalogue-title'>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {form}
            {alertVisible && <Alert variant="success">Operación exitosa!</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CatalogueModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    isEditing: PropTypes.bool,
    record: PropTypes.object,
    catalogType: PropTypes.string,
    onSuccess: PropTypes.func,
};
