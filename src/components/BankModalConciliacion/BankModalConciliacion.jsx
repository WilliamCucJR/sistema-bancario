import PropTypes from "prop-types";
import ConciliacionForm from "../ConciliacionForm";

export default function BankModalConciliacion({ bankId }) {
    return (
        <>
            <ConciliacionForm bankId={bankId} />
        </>
    );   
}

BankModalConciliacion.propTypes = {
    bankId: PropTypes.number,
  };