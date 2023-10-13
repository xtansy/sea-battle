import { GameHeader } from "widgets/GameHeader";
import { GameContent } from "widgets/GameContent";
import { GameFooter } from "widgets/GameFooter";
import { useRobot } from "shared/lib/useRobot";

export const GamePage = () => {
    useRobot();
    return (
        <div>
            <GameHeader />
            <GameContent />
            <GameFooter />
        </div>
    );
};
