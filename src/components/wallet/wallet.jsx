import {
    useState,
    useEffect,
    useContext,
    useLayoutEffect,
    useRef,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./wallet.module.scss";
import { baseUrl } from "../../utils/api";
import { WalletContext } from "../app/app";
import { Button } from "../button/button";
import { Modal } from "../modal/modal";
import { AnimatePresence } from "framer-motion";
import sFuse from "../../images/sFuse.svg";
import fUSD from "../../images/fUSD.svg";
import Volt from "../../images/Volt.svg";
import defaultIcon from "../../images/defaultIcon.svg";
import cn from "classnames";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { fillTokens } from "../../slices/tokensSlice";
import QRCode from "react-qr-code";
import { truncate, numberWithCommas } from "../../utils/utils";
import { PAGINATION_NUMBER, REFRESH_DATA_TIME } from "../../utils/constants";
import { ethers } from "ethers";

function formatUnits(value, decimals, maxDecimalDigits) {
    return numberWithCommas(
        ethers.FixedNumber.fromString(ethers.formatUnits(value, decimals))
            .round(maxDecimalDigits)
            .toString()
    );
}

export const Wallet = () => {
    const ref = useRef(null);
    const [walletAccount] = useContext(WalletContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showMore, setShowMore] = useState(false);
    const [visibleTokens, setVisibleTokens] = useState([]);
    const [tokens, setTokens] = useState();
    const [balance, setBalance] = useState();
    const [modalIsOpened, setModalIsOpened] = useState(false);
    const [widthOfField, setWidthOfField] = useState(0);
    const dispatch = useDispatch();

    const openModal = () => {
        setModalIsOpened(true);
    };

    const closeModal = () => {
        setModalIsOpened(false);
    };

    useLayoutEffect(() => {
        if (ref.current) {
            const updateSize = () => setWidthOfField(ref.current.offsetWidth);
            window.addEventListener("resize", updateSize);
            updateSize();
            return () => window.removeEventListener("resize", updateSize);
        }
    }, [modalIsOpened, setWidthOfField]);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(
                    `${baseUrl}?module=account&action=tokenlist&address=${walletAccount}`
                )
                .then((res) => {
                    setTokens(res.data.result);
                    setIsLoading(false);
                    setVisibleTokens(res.data.result.slice(0, 3));
                    if (res.data.result.length > 3) setShowMore(true);
                    dispatch(fillTokens(res.data.result));
                });
            axios
                .get(
                    `${baseUrl}?module=account&action=balance&address=${walletAccount}`
                )
                .then((res) => {
                    setBalance(res.data.result);
                });
        };
        fetchData();
        const timer = setInterval(() => {
            fetchData();
        }, REFRESH_DATA_TIME);
        return () => setInterval(timer);
    }, [walletAccount, dispatch]);

    const showMoreHandler = () => {
        const visibleTokensNumber = visibleTokens.length;
        if (visibleTokensNumber + PAGINATION_NUMBER >= tokens.length) {
            setShowMore(false);
        } else {
            setVisibleTokens(
                tokens.slice(0, visibleTokensNumber + PAGINATION_NUMBER)
            );
        }
    };

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.wrapper}>
                    <h1>Wallet</h1>
                    <section className={styles.panel}>
                        <div className={cn(styles.row, styles.sm_column)}>
                            <div className={styles.left_col}>
                                <h2>Your Balance</h2>
                                <div className={styles.balance_info}>
                                    <span className={styles.balance}>
                                        {balance && formatUnits(balance, 18, 3)}
                                    </span>
                                    <span
                                        className={`${styles.trend} ${styles.positive}`}
                                    >
                                        +0%
                                    </span>
                                    <span className={styles.trend_icon}>
                                        <svg
                                            width="10"
                                            height="10"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={styles.positive_icon}
                                        >
                                            <path
                                                d="M4.83562 1.70435V8.967M4.83562 1.70435L1 4.88244M4.83562 1.70435L8.45205 4.88244"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className={styles.right_col}>
                                <Button
                                    label="Receive"
                                    className={styles.receive}
                                    handleClick={openModal}
                                >
                                    <svg
                                        width="12"
                                        height="15"
                                        viewBox="0 0 12 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.75 0.804077C6.75 0.389864 6.41421 0.0540771 6 0.0540771C5.58579 0.0540772 5.25 0.389864 5.25 0.804077L6.75 0.804077ZM5.46967 14.6949C5.76256 14.9878 6.23744 14.9878 6.53033 14.6949L11.3033 9.92197C11.5962 9.62908 11.5962 9.1542 11.3033 8.86131C11.0104 8.56842 10.5355 8.56842 10.2426 8.86131L6 13.104L1.75736 8.86131C1.46447 8.56842 0.989593 8.56842 0.696699 8.86131C0.403806 9.1542 0.403806 9.62908 0.696699 9.92197L5.46967 14.6949ZM5.25 0.804077L5.25 14.1646L6.75 14.1646L6.75 0.804077L5.25 0.804077Z"
                                            fill="white"
                                        />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </section>
                    <section className={cn(styles.panel, styles.coins_panel)}>
                        <div className={styles.panel_inner}>
                            <h2>Your Coins</h2>
                            <ul className={styles.coins_list}>
                                {visibleTokens.map((token) => (
                                    <li key={uuid()}>
                                        <Link
                                            to={{
                                                pathname: `${token.contractAddress}`,
                                            }}
                                            className={`${styles.row} ${styles.token}`}
                                        >
                                            <div className={styles.token_info}>
                                                <img
                                                    width="42"
                                                    height="42"
                                                    className={styles.logo}
                                                    src={
                                                        token.symbol === "sFuse"
                                                            ? sFuse
                                                            : token.symbol ===
                                                              "fUSD"
                                                            ? fUSD
                                                            : token.symbol ===
                                                              "Volt"
                                                            ? Volt
                                                            : defaultIcon
                                                    }
                                                    alt={token.name}
                                                />
                                                <span
                                                    className={
                                                        styles.token_name
                                                    }
                                                >
                                                    {token.name}
                                                </span>
                                            </div>
                                            <span
                                                className={styles.token_balance}
                                            >
                                                {formatUnits(
                                                    token.balance,
                                                    token.decimal,
                                                    3
                                                )}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {showMore && (
                            <button
                                className={styles.show_more}
                                onClick={showMoreHandler}
                            >
                                Show More
                                <svg
                                    width="11"
                                    height="11"
                                    viewBox="0 0 11 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_0_317)">
                                        <path
                                            d="M5.89014 8.26228L10.3402 3.81215C10.4432 3.70922 10.4999 3.57183 10.4999 3.42532C10.4999 3.27882 10.4432 3.14142 10.3402 3.0385L10.0125 2.71078C9.79905 2.49753 9.45206 2.49753 9.23889 2.71078L5.50201 6.44766L1.76099 2.70663C1.65798 2.6037 1.52066 2.54687 1.37424 2.54687C1.22766 2.54687 1.09034 2.6037 0.987251 2.70663L0.659693 3.03435C0.556686 3.13736 0.499939 3.27467 0.499939 3.42118C0.499939 3.56768 0.556686 3.70508 0.659693 3.808L5.1138 8.26228C5.21714 8.36545 5.3551 8.42211 5.50177 8.42179C5.649 8.42211 5.78689 8.36545 5.89014 8.26228Z"
                                            fill="#1A1A1A"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_0_317">
                                            <rect
                                                width="10"
                                                height="10"
                                                fill="white"
                                                transform="translate(10.5 0.484314) rotate(90)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        )}
                    </section>
                </div>
            )}
            <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => null}
            >
                {modalIsOpened && (
                    <Modal closeModal={closeModal} title="Your Public Address">
                        <div
                            ref={ref}
                            className={styles.field}
                            onClick={() => {
                                navigator.clipboard.writeText(walletAccount);
                            }}
                        >
                            <span>
                                {widthOfField > 0 && widthOfField < 400
                                    ? truncate(walletAccount, 20)
                                    : walletAccount}
                            </span>
                            <svg
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.84028 1.79367e-05C1.62925 -0.000979436 1.42009 0.0396268 1.22476 0.119515C1.02943 0.199404 0.851769 0.317008 0.701922 0.465604C0.552075 0.614199 0.432985 0.790873 0.351461 0.985523C0.269938 1.18017 0.227579 1.38898 0.226807 1.60001V12.8H1.84028V1.60001H13.132V1.79367e-05H1.84028ZM5.06638 3.20001C4.85535 3.19901 4.64619 3.23962 4.45086 3.31951C4.25553 3.3994 4.07787 3.517 3.92802 3.6656C3.77817 3.81419 3.65908 3.99087 3.57756 4.18552C3.49604 4.38017 3.45368 4.58898 3.4529 4.80001V14.4C3.45368 14.611 3.49604 14.8198 3.57756 15.0145C3.65908 15.2091 3.77817 15.3858 3.92802 15.5344C4.07787 15.683 4.25553 15.8006 4.45086 15.8805C4.64619 15.9604 4.85535 16.001 5.06638 16H14.7447C14.9557 16.001 15.1649 15.9604 15.3602 15.8805C15.5555 15.8006 15.7332 15.683 15.883 15.5344C16.0329 15.3858 16.152 15.2091 16.2335 15.0145C16.315 14.8198 16.3574 14.611 16.3581 14.4V4.80001C16.3574 4.58898 16.315 4.38017 16.2335 4.18552C16.152 3.99087 16.0329 3.81419 15.883 3.6656C15.7332 3.517 15.5555 3.3994 15.3602 3.31951C15.1649 3.23962 14.9557 3.19901 14.7447 3.20001H5.06638ZM5.06638 4.80001H14.7447V14.4H5.06638V4.80001Z"
                                    fill="black"
                                />
                            </svg>
                        </div>
                        <div className={styles.qr_wrapper}>
                            <QRCode value={walletAccount} />
                        </div>
                        <div className={styles.note}>
                            <svg
                                className={styles.note_icon}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_0_473)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.3308 2.63042C12.1896 2.36612 11.8107 2.36612 11.6694 2.63043L2.54693 19.6982C2.41342 19.9481 2.59442 20.25 2.87765 20.25H21.1225C21.4059 20.25 21.5868 19.9481 21.4533 19.6982L12.3308 2.63042ZM9.68506 1.56983C10.6739 -0.280354 13.3263 -0.280357 14.3152 1.56983L23.4376 18.6377C24.3723 20.3862 23.1052 22.5 21.1225 22.5H2.87765C0.894957 22.5 -0.372014 20.3862 0.562587 18.6377L9.68506 1.56983ZM13.5001 16.5C13.5001 17.3285 12.8286 18 12.0001 18C11.1717 18 10.5001 17.3285 10.5001 16.5C10.5001 15.6716 11.1717 15 12.0001 15C12.8286 15 13.5001 15.6716 13.5001 16.5ZM13.1251 8.62505C13.1251 8.00373 12.6214 7.50005 12.0001 7.50005C11.3788 7.50005 10.8751 8.00373 10.8751 8.62505V12.375C10.8751 12.9964 11.3788 13.5 12.0001 13.5C12.6214 13.5 13.1251 12.9964 13.1251 12.375V8.62505Z"
                                        fill="#9A6700"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_473">
                                        <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            Please make sure you are sending assets on the Fuse
                            network
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </>
    );
};
