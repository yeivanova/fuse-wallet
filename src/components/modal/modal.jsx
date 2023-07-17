import { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { PropTypes } from "prop-types";
import styles from "./modal.module.scss";
import { Overlay } from "../overlay/overlay";
import { Button } from "../button/button";
import { motion } from "framer-motion";

const modalRoot = document.getElementById("react-modal");

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.15,
            type: "spring",
            damping: 35,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

export const Modal = ({ title, closeModal, children }) => {
    const closeMe = useCallback(() => {
        closeModal();
        document.body.classList.remove("no-scroll");
    }, [closeModal]);

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

    return ReactDOM.createPortal(
        <Overlay onClick={closeModal}>
            <motion.div
                className={styles.modal_window}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={styles.modal_close}
                    onClick={closeMe}
                    aria-label="Close"
                >
                    <svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_0_465)">
                            <path
                                d="M22.9607 21.7037L16.6753 15.4183L22.9607 9.13292C23.1274 8.96623 23.221 8.74013 23.221 8.50439C23.221 8.26864 23.1274 8.04255 22.9607 7.87585V7.87585C22.794 7.70915 22.5679 7.6155 22.3321 7.6155C22.0964 7.6155 21.8703 7.70915 21.7036 7.87585L15.4182 14.1612L9.13282 7.87585C8.96612 7.70915 8.74003 7.6155 8.50428 7.6155C8.26853 7.6155 8.04244 7.70915 7.87574 7.87585V7.87585C7.70904 8.04255 7.61539 8.26864 7.61539 8.50439C7.61539 8.74013 7.70904 8.96623 7.87574 9.13292L14.1611 15.4183L7.87574 21.7037C7.70904 21.8704 7.61539 22.0965 7.61539 22.3323C7.61539 22.568 7.70904 22.7941 7.87574 22.9608C8.04244 23.1275 8.26853 23.2211 8.50428 23.2211C8.74003 23.2211 8.96612 23.1275 9.13282 22.9608L15.4182 16.6754L21.7036 22.9608C21.8703 23.1275 22.0964 23.2211 22.3321 23.2211C22.5679 23.2211 22.794 23.1275 22.9607 22.9608C23.1274 22.7941 23.221 22.568 23.221 22.3323C23.221 22.0965 23.1274 21.8704 22.9607 21.7037Z"
                                fill="black"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_0_465">
                                <rect
                                    width="21.3333"
                                    height="21.3333"
                                    fill="white"
                                    transform="translate(15.4182 0.333374) rotate(45)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                <div className={styles.modal_header}>
                    <h2>{title}</h2>
                </div>
                <div className={styles.modal_content}>
                    {children}
                    <Button
                        label="Close"
                        className={styles.close}
                        handleClick={closeMe}
                    />
                </div>
            </motion.div>
            <div
                id="overlay"
                className={`${styles.overlay}`}
                onClick={closeMe}
            />
        </Overlay>,
        modalRoot
    );
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
