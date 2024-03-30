import PropTypes from "prop-types";

export default function BankForm({ record }) {
    return(
        <div>
            <h1>Bank Form {record}</h1>
        </div>
    )
    
}


BankForm.propTypes = {
    record : PropTypes.int
};