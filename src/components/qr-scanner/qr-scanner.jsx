import { useEffect, useState, useRef } from "react";
import { PropTypes } from "prop-types";
import { AnimatePresence } from "framer-motion";
import { Modal } from "../modal/modal";
import styles from "./qr-scanner.module.scss";
import QrScanner from "qr-scanner";

export const QRScanner = ({ setAddress }) => {
    const [qrScanner, setQrScanner] = useState();
    const [modalIsOpened, setModalIsOpened] = useState(false);
    const video = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const openModal = () => {
        setModalIsOpened(true);
    };

    const closeModal = () => {
        setModalIsOpened(false);
        closeScanner();
    };

    const closeScanner = async () => {
        qrScanner?.stop();
        qrScanner?.destroy();
        setQrScanner(undefined);
        setIsLoaded(false);
    };

    const handleScan = async (scanData) => {
        if (
            typeof scanData !== "undefined" &&
            /^0x[a-fA-F0-9]{40}$/.test(scanData.data)
        ) {
            setAddress(scanData.data);
            await closeScanner();
        }
    };

    useEffect(() => {
        if (video.current && !isLoaded) {
            const qrScanner = new QrScanner(
                video.current,
                (result) => handleScan(result),
                {
                    highlightScanRegion: true,
                }
            );
            qrScanner.start();
            setIsLoaded(true);
            setQrScanner(qrScanner);
        }

        return closeScanner;
        // Dependency array missing handleScan, since it should not set Scanner on handleScan change
        // eslint-disable-next-line
    }, [video.current, modalIsOpened]);

    return (
        <div className={styles.scanner_wrapper}>
            <button
                className={styles.scan_button}
                onClick={() => {
                    openModal();
                    handleScan();
                }}
            >
                Scan QR Code
            </button>
            <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => null}
            >
                {modalIsOpened && (
                    <Modal closeModal={closeModal} title="Show the QR code">
                        <>
                            <video ref={video}></video>
                        </>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
};

QRScanner.propTypes = {
    setAddress: PropTypes.func.isRequired,
};
