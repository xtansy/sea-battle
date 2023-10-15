import { GameHeader } from "widgets/GameHeader";
import { GameContent } from "widgets/GameContent";
import { GameFooter } from "widgets/GameFooter";

import { useRobot } from "features/Robot";
import { useGameStories } from "features/IncDecGameStories";

export const GamePage = () => {
    useRobot();
    useGameStories();
    return (
        <>
            <GameHeader />
            <GameContent />
            <GameFooter />
        </>
    );
};
