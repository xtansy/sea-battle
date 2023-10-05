import { Routes, Route } from "react-router-dom";

import { Layout } from "shared/ui";
import { HomePage } from "pages/home";

export const Routing = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/home" element={<HomePage />}></Route>
            </Route>
        </Routes>
    );
};
