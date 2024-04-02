import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import UsersForm from "../UsersForm/UsersForm";
import BankForm from "../BankForm/BankForm";
import MonedaForm from "../MonedaForm/MonedaForm";
import TipoCuentaForm from "../TipoCuentaForm/TipoCuentaForm";
import TipoDocumentoForm from "../TipoDocumentoForm/TipoDocumentoForm";
import "./CatalogueModal.css";

export default function CatalogueModal({
  show,
  handleClose,
  isEditing,
  record,
  catalogType,
  onSuccess,
}) {
  //let form;
  let modalTitle;
  let form;

  const [formValues, setFormValues] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState(null);
  const apiUrlBase = import.meta.env.VITE_API_URL;

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Los meses en JavaScript comienzan desde 0
  const day = ("0" + date.getDate()).slice(-2);

  const fechaActual = `${year}/${month}/${day}`;

  const handleFormValuesChange = (values) => {
    setFormValues(values);
  };

  switch (catalogType) {
    case "bank":
      form = (
        <BankForm
          record={isEditing ? record.ID_BANCO : null}
          onFormValuesChange={handleFormValuesChange}
        />
      );
      modalTitle = isEditing == true ? "Editar Banco" : "Agregar Banco";
      break;
    case "user":
      form = (
        <UsersForm
          record={isEditing ? record.ID : null}
          onFormValuesChange={handleFormValuesChange}
        />
      );
      modalTitle = isEditing == true ? "Editar Usuario" : "Agregar Usuario";
      break;
    case "moneda":
      form = (
        <MonedaForm
          record={isEditing ? record.ID : null}
          onFormValuesChange={handleFormValuesChange}
        />
      );
      modalTitle = isEditing == true ? "Editar Moneda" : "Agregar Moneda";
      break;
    case "tipoCuenta":
      form = (
        <TipoCuentaForm
          record={isEditing ? record.ID : null}
          onFormValuesChange={handleFormValuesChange}
        />
      );
      modalTitle =
        isEditing == true ? "Editar Tipo Cuenta" : "Agregar Tipo Cuenta";
      break;
    case "tipoDocumento":
      form = (
        <TipoDocumentoForm
          record={isEditing ? record.ID : null}
          onFormValuesChange={handleFormValuesChange}
        />
      );
      modalTitle =
        isEditing == true ? "Editar Tipo Documento" : "Agregar Tipo Documento";
      break;
    default:
      form = null;
  }

  const handleSubmit = () => {
    console.log(formValues);

    let method = "";
    let url = "";

    switch (catalogType) {
      case "bank":
        console.log(record?.ID_BANCO);
        url = record?.ID_BANCO
          ? `${apiUrlBase}/Banco/UpdateBanco/${record.ID_BANCO}`
          : `${apiUrlBase}/Banco/CreateBanco`;

        console.log(url);

        method = record?.ID_BANCO ? "PUT" : "POST";

        fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID_BANCO: record?.ID_BANCO,
            NOMBRE_BANCO: formValues.banco,
            FECHA_DE_CREACION: fechaActual,
            ID_USUARIO: 1,
          }),
        })
          .then((data) => {
            console.log("Success:", data);
            setAlertVisible(true); // Muestra la alerta

            // Oculta la alerta después de 5 segundos, cierra el modal y recarga los datos
            setTimeout(() => {
              setAlertVisible(false);
              handleClose();
              onSuccess();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error:", error);
            setError(error.message);
          });
        break;
      case "user":
        break;
      case "moneda":
        console.log(record?.ID);
        url = record?.ID
          ? `${apiUrlBase}/Moneda/UpdateMoneda/${record.ID}`
          : `${apiUrlBase}/Moneda/CreateMoneda`;

        console.log(url);

        method = record?.ID ? "PUT" : "POST";

        fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID: record?.ID,
            TIPO_MONEDA: formValues.tipoMoneda,
            TASA_DE_CAMBIO: formValues.tasaCambio,
          }),
        })
          .then((data) => {
            console.log("Success:", data);
            setAlertVisible(true); // Muestra la alerta

            // Oculta la alerta después de 5 segundos, cierra el modal y recarga los datos
            setTimeout(() => {
              setAlertVisible(false);
              handleClose();
              onSuccess();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error:", error);
            setError(error.message);
          });

        break;
      case "tipoCuenta":
        console.log(record?.ID);
        url = record?.ID
          ? `${apiUrlBase}/TipoCuenta/UpdateTipoCuenta/${record.ID}`
          : `${apiUrlBase}/TipoCuenta/CreateTipoCuenta`;

        console.log(url);

        method = record?.ID ? "PUT" : "POST";

        fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID: record?.ID,
            TIPO_DE_CUENTA: formValues.tipoCuenta,
            FECHA_DE_CREACION: fechaActual,
          }),
        })
          .then((data) => {
            console.log("Success:", data);
            setAlertVisible(true); // Muestra la alerta

            // Oculta la alerta después de 5 segundos, cierra el modal y recarga los datos
            setTimeout(() => {
              setAlertVisible(false);
              handleClose();
              onSuccess();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error:", error);
            setError(error.message);
          });

        break;
      case "tipoDocumento":
        console.log(record?.ID);
        url = record?.ID
          ? `${apiUrlBase}/TipoDocumento/UpdateTipoDocumento/${record.ID}`
          : `${apiUrlBase}/TipoDocumento/CreateTipoDocumento`;

        console.log(url);

        method = record?.ID ? "PUT" : "POST";

        fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID: record?.ID,
            NOMBRE_DOCUMENTO: formValues.nombreDocumento,
            DESCRIPCION: formValues.descripcion,
            OPERACION: formValues.operacion,
          }),
        })
          .then((data) => {
            console.log("Success:", data);
            setAlertVisible(true); // Muestra la alerta

            // Oculta la alerta después de 5 segundos, cierra el modal y recarga los datos
            setTimeout(() => {
              setAlertVisible(false);
              handleClose();
              onSuccess();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error:", error);
            setError(error.message);
          });
        break;
      default:
        form = null;
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        className="catalogue-modal"
      >
        <Modal.Header closeButton className="modal-catalogue-title">
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
