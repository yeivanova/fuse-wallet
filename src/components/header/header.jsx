import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../../images/fuse-logo.svg";
import styles from "./header.module.scss";

export const Header = () => {
    const [isOpened, setIsOpened] = useState(false);

    const toggleMenu = () => {
        setIsOpened((current) => !current);
    };

    return (
        <header>
            <Link to="/">
                <img className={styles.logo} src={logoImg} alt="Fuse" />
            </Link>
            <nav
                role="navigation"
                className={`${styles.navbar_menu} ${
                    isOpened ? styles.is_opened : ""
                }`}
            >
                <ul className={styles.navigation_list}>
                    <li>
                        <NavLink to="/network">Network</NavLink>
                    </li>
                    <li>
                        <NavLink to="/developers">Developers</NavLink>
                    </li>
                    <li>
                        <NavLink to="/solutions">Solutions</NavLink>
                    </li>
                    <li>
                        <NavLink to="/tools">Tools</NavLink>
                    </li>
                </ul>
            </nav>
            <div className={styles.navbar_buttons}>
                <Link
                    to="https://twitter.com/fuse_network"
                    className={styles.social_link}
                >
                    <svg
                        width="24"
                        height="20"
                        viewBox="0 0 24 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.0473 6.02898C21.0473 5.8296 21.0432 5.63184 21.0344 5.43488C21.9313 4.7867 22.7111 3.97788 23.3255 3.05687C22.5028 3.42253 21.6172 3.66873 20.688 3.78012C21.6366 3.21104 22.364 2.31182 22.7079 1.23986C21.8199 1.76535 20.8374 2.14796 19.7911 2.3546C18.9524 1.46103 17.7592 0.903259 16.4385 0.903259C13.9011 0.903259 11.8442 2.96 11.8442 5.49542C11.8442 5.85543 11.8845 6.20656 11.9628 6.54316C8.14515 6.35105 4.76018 4.52355 2.49492 1.74436C2.10015 2.42322 1.87249 3.21104 1.87249 4.05295C1.87249 5.64637 2.68382 7.05332 3.91656 7.87585C3.16335 7.85244 2.45536 7.64499 1.83617 7.30193C1.83536 7.3205 1.83536 7.33906 1.83536 7.36005C1.83536 9.58469 3.41926 11.4413 5.52064 11.8626C5.13476 11.9675 4.72869 12.0241 4.30971 12.0241C4.01424 12.0241 3.72604 11.995 3.44591 11.9417C4.03119 13.766 5.7265 15.0938 7.73747 15.1318C6.16486 16.3636 4.18458 17.0973 2.03234 17.0973C1.66179 17.0973 1.29609 17.0763 0.936035 17.0335C2.9696 18.3364 5.3834 19.0967 7.97804 19.0967C16.4263 19.0967 21.0473 12.0983 21.0473 6.02898Z"
                            fill="black"
                        />
                    </svg>
                </Link>
                <Link to="https://docs.fuse.io/" className={styles.button}>
                    Build on Fuse
                </Link>
            </div>
            <button className={styles.toggle_button} onClick={toggleMenu}>
                <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipRule="url(#clip0_0_488)">
                        <path
                            d="M23.3799 21H2.37989C1.55143 21 0.879883 20.3284 0.879883 19.5C0.879883 18.6716 1.55143 18 2.37989 18H23.3799C24.2083 18 24.8799 18.6716 24.8799 19.5C24.8799 20.3284 24.2083 21 23.3799 21Z"
                            fill="black"
                        />
                        <path
                            d="M23.3799 13.5H2.37989C1.55143 13.5 0.879883 12.8284 0.879883 12C0.879883 11.1716 1.55143 10.5 2.37989 10.5H23.3799C24.2083 10.5 24.8799 11.1716 24.8799 12C24.8799 12.8285 24.2083 13.5 23.3799 13.5Z"
                            fill="black"
                        />
                        <path
                            d="M23.3799 5.99999H2.37989C1.55143 5.99999 0.879883 5.32844 0.879883 4.49998C0.879883 3.67152 1.55143 2.99997 2.37989 2.99997H23.3799C24.2083 2.99997 24.8799 3.67152 24.8799 4.49998C24.8799 5.32844 24.2083 5.99999 23.3799 5.99999Z"
                            fill="black"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_0_488">
                            <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="translate(0.879883)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </header>
    );
};
