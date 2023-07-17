import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { baseUrl } from "../utils/api";
import { Details } from "../components/details/details";
import { useSelector } from "react-redux";
import axios from "axios";

export const DetailsPage = ({ isAuthorized }) => {
    const { contractAddressHash } = useParams();
    const tokens = useSelector((state) => state.wallet.tokens);
    const currentToken = tokens.find(
        (token) => token.contractAddress === contractAddressHash
    );
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [tokenSupply, setTokenSupply] = useState();

    useEffect(() => {
        if (!isAuthorized) {
            return navigate("/");
        }
    }, [isAuthorized, navigate]);

    useEffect(() => {
        axios
            .get(
                `${baseUrl}?module=stats&action=tokensupply&contractaddress=${contractAddressHash}`
            )
            .then((res) => {
                setIsLoading(false);
                setTokenSupply(res.data.result);
            });
    }, [contractAddressHash]);

    return (
        <>
            {isLoading || !currentToken ? (
                <p>Loading...</p>
            ) : (
                <Details token={currentToken} tokenSupply={tokenSupply} />
            )}
        </>
    );
};

DetailsPage.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
};
