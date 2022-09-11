import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Display from "./Display";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/artists/*" element={<Display />} />
                <Route path="*" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
