import { PropTypes } from "prop-types";
import styles from "./button.module.scss";

export const Button = ({ type = "button", label, handleClick, children }) => {
    return (
        <button type={type} className={styles.button} onClick={handleClick}>
            {children}
            {label}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    children: PropTypes.node,
};
