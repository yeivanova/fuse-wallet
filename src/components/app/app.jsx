import {BrowserRouter, Routes, Route} from "react-router-dom";
import { HomePage } from "../../pages/home/home";
import { NotFoundPage } from "../../pages/404/404";

function App() {
    return (
        <BrowserRouter basename="/fuse-wallet">
            <div className="app">
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
