import { GameHeader } from "widgets/GameHeader";
import { GameContent } from "widgets/GameContent";
import { GameFooter } from "widgets/GameFooter";

export const GamePage = () => {
    return (
        <div>
            <GameHeader />
            <GameContent />
            <GameFooter />
        </div>
    );
};
