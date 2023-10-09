import { Routes, Route } from "react-router-dom";

import { Layout } from "shared/ui";
import { HomePage } from "pages/home";
import { GamePage } from "pages/game";

export const Routing = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/game" element={<GamePage />} />
            </Route>
        </Routes>
    );
};
