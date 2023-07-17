import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";
import { HomePage } from "../../pages/home";
import { DetailsPage } from "../../pages/details";
import { NotFoundPage } from "../../pages/404";

export const WalletContext = createContext();

const Main = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route
                        path="/"
                        element={
                            <HomePage
                                isAuthorized={isAuthorized}
                                setIsAuthorized={setIsAuthorized}
                            />
                        }
                    />
                    <Route
                        path=":contractAddressHash"
                        element={<DetailsPage isAuthorized={isAuthorized} />}
                    />
                </Routes>
            </main>
        </>
    );
};

export const App = () => {
    const [walletAccount, setWalletAccount] = useState();

    return (
        <BrowserRouter basename="/fuse-wallet">
            <WalletContext.Provider value={[walletAccount, setWalletAccount]}>
                <Main />
            </WalletContext.Provider>
        </BrowserRouter>
    );
};
