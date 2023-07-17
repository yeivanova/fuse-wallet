import { PropTypes } from "prop-types";
import { motion } from "framer-motion";
import styles from "./panel.module.scss";

const fadeIn = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.25,
        },
    },
    exit: {
        opacity: 0,
    },
};

export const Panel = ({ title, children }) => {
    return (
        <motion.div
            className={styles.panel}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <h1>{title}</h1>
            <div className={styles.panel_inner}>{children}</div>
        </motion.div>
    );
};

Panel.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
