import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UsersForm from "../UsersForm/UsersForm";
import BankForm from "../BankForm/BankForm";
import MonedaForm from "../MonedaForm/MonedaForm";
import TipoCuentaForm from "../TipoCuentaForm/TipoCuentaForm";
import "./CatalogueModal.css";

export default function CatalogueModal({ show, handleClose, isEditing, record, catalogType }) {

    //let form;
    let modalTitle;
    let form;

    switch (catalogType) {
      case 'bank':
        form = <BankForm record={isEditing ? record.id : null} />;
        modalTitle = isEditing == true ? "Editar Banco" : "Agregar Banco";
        break;
      case 'user':
        form = <UsersForm record={isEditing ? record.id : null} />;
        modalTitle = isEditing == true ? "Editar Usuario" : "Agregar Usuario";
        break;
      case 'moneda':
        form = <MonedaForm record={isEditing ? record.ID : null} />;
        modalTitle = isEditing == true ? "Editar Moneda" : "Agregar Moneda";
        break;
      case 'tipocuenta':
        form = <TipoCuentaForm record={isEditing ? record.id : null} />;
        modalTitle = isEditing == true ? "Editar Tipo Cuenta" : "Agregar Tipo Cuenta";
        break;
      default:
        form = null;
    }

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} className="catalogue-modal">
        <Modal.Header closeButton className='modal-catalogue-title'>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {form}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handleClose}>
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
};
