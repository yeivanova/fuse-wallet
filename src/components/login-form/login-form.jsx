import { useState, useEffect, useContext } from "react";
import { PropTypes } from "prop-types";
import { Formik } from "formik";
import axios from "axios";
import styles from "./login-form.module.scss";
import { baseUrl } from "../../utils/api";
import { WalletContext } from "../app/app";
import { Panel } from "../panel/panel";
import { Button } from "../button/button";
import { QRScanner } from "../qr-scanner/qr-scanner";

export const Login = ({ setIsAuthorized }) => {
    const [walletAccount, setWalletAccount] = useContext(WalletContext);
    const [dataResonse, setDataResonse] = useState();
    const [error, setError] = useState();
    const [address, setAddress] = useState(null);

    useEffect(() => {
        if (address !== null) {
            axios
                .get(
                    `${baseUrl}?module=account&action=eth_get_balance&address=${address}`
                )
                .then((res) => {
                    setWalletAccount(address);
                    setDataResonse(res.data);
                    setIsAuthorized(true);
                })
                .catch((error) => {
                    if (error.response) {
                        setError(error.response.data.error);
                    }
                });
        }
    }, [address, setWalletAccount, setIsAuthorized]);

    return (
        <Panel title="Add Wallet Address">
            <QRScanner setAddress={setAddress} />
            <Formik
                initialValues={{ address: "" }}
                validate={(values) => {
                    const errors = {};
                    if (!values.address) {
                        errors.address = "This field is required";
                    } else if (!/^0x[a-fA-F0-9]{40}$/.test(values.address)) {
                        errors.address = "Invalid wallet address";
                    }
                    return errors;
                }}
                onSubmit={(values) => {
                    setAddress(values.address);
                }}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <form className={styles.form}>
                        <input
                            className={styles.input}
                            type="text"
                            name="address"
                            placeholder="Enter or copy wallet address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                        />
                        <p
                            className={`${styles.error} ${
                                errors.address ? styles.is_visible : ""
                            }`}
                        >
                            {errors.address}
                        </p>
                        <Button
                            type="submit"
                            label="Continue"
                            handleClick={handleSubmit}
                        />
                    </form>
                )}
            </Formik>
        </Panel>
    );
};

Login.propTypes = {
    setIsAuthorized: PropTypes.func.isRequired,
};
