import { PropTypes } from "prop-types";
import { Login } from "../components/login-form/login-form";
import { Wallet } from "../components/wallet/wallet";

export const HomePage = ({ isAuthorized, setIsAuthorized }) => {
    return (
        <>
            {!isAuthorized ? (
                <Login setIsAuthorized={setIsAuthorized} />
            ) : (
                <Wallet />
            )}
        </>
    );
};

HomePage.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    setIsAuthorized: PropTypes.func.isRequired,
};
