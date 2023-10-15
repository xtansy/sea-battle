import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Layout } from "shared/ui";
import { HomePage } from "pages/home";
import { GamePage } from "pages/game";
import { gameTypeSelector } from "entities/game";

interface GuardProps {
    children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
    const gameType = useSelector(gameTypeSelector);

    if (!gameType) {
        return <Navigate to="/" />; // Vercel не работает если не указать "/", до этого было "/home"
    }
    return children;
};

export const Routing = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/game"
                    element={
                        <Guard>
                            <GamePage />
                        </Guard>
                    }
                />
            </Route>
        </Routes>
    );
};
