import { Panel } from "../panel/panel";
import { PropTypes } from "prop-types";
import { numberWithCommas } from "../../utils/utils";
import styles from "./details.module.scss";

export const Details = ({ token, tokenSupply }) => {
    return (
        <Panel title="Details">
            <h2>{token.name}</h2>
            <ul className={styles.token_info_list}>
                <li className={styles.token_item}>
                    <div className={styles.token_field}>
                        <span className={styles.token_field_name}>Symbol</span>
                    </div>
                    <span className={styles.token_field_value}>
                        {token.symbol}
                    </span>
                </li>
                <li className={styles.token_item}>
                    <div className={styles.token_field}>
                        <span className={styles.token_field_name}>Name</span>
                    </div>
                    <span className={styles.token_field_value}>
                        {token.name}
                    </span>
                </li>
                <li className={styles.token_item}>
                    <div className={styles.token_field}>
                        <span className={styles.token_field_name}>
                            Total Supply
                        </span>
                    </div>
                    <span className={styles.token_field_value}>
                        {numberWithCommas(tokenSupply)}
                    </span>
                </li>
                <li className={styles.token_item}>
                    <div className={styles.token_field}>
                        <span className={styles.token_field_name}>
                            Decimals
                        </span>
                    </div>
                    <span className={styles.token_field_value}>
                        {token.decimals}
                    </span>
                </li>
            </ul>
        </Panel>
    );
};

Details.propTypes = {
    token: PropTypes.object.isRequired,
    tokenSupply: PropTypes.string.isRequired,
};
