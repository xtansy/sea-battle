import { useDispatch, useSelector } from "react-redux";

import { Button } from "shared/ui";
import { startGame, shipsCountSelector, MAX_SHIPS } from "entities/game";

interface StartGameButtonProps {
    children: React.ReactNode;
}

export const StartGameButton: React.FC<StartGameButtonProps> = ({
    children,
}) => {
    const dispatch = useDispatch();
    const shipsCount = useSelector(shipsCountSelector);
    const disabled = shipsCount !== MAX_SHIPS;
    return (
        <Button
            disabled={disabled}
            onClick={!disabled ? () => dispatch(startGame()) : undefined}
        >
            {children}
        </Button>
    );
};
