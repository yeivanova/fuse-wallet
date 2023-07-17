import { useCallback, useEffect } from "react";
import { PropTypes } from "prop-types";
import styles from "./overlay.module.scss";
import { motion } from "framer-motion";

export const Overlay = ({ children, onClick }) => {
    const closeModal = useCallback(() => {
        onClick();
        document.body.classList.remove("no-scroll");
    }, [onClick]);

    const handleClose = () => {
        onClick();
        document.body.classList.remove("no-scroll");
    };

    useEffect(() => {
        document.body.classList.add("no-scroll");
    }, []);

    useEffect(() => {
        const close = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [closeModal]);

    return (
        <motion.div
            id="overlay"
            className={styles.overlay}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
};

Overlay.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
