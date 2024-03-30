import PropTypes from "prop-types";

export default function TipoCuentaForm({ record }) {
    return(
        <div>
            <h1>Tipo Cuenta Form {record}</h1>
        </div>
    )
    
}


TipoCuentaForm.propTypes = {
    record : PropTypes.int
};