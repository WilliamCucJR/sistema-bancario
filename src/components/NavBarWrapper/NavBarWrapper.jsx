import PropTypes from "prop-types";
import NavBar from "../NavBar";

export default function NavBarWrapper({ children, onLogout }) {
    return (
        <>
            <NavBar onLogout={onLogout} />
            {children}
        </>
    );
    
}

NavBarWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    onLogout: PropTypes.func.isRequired,
}