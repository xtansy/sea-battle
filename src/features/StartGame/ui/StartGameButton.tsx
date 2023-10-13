import { useDispatch } from "react-redux";

import { Button } from "shared/ui";
import { startGame } from "entities/game";

interface StartGameButtonProps {
    children: React.ReactNode;
}

export const StartGameButton: React.FC<StartGameButtonProps> = ({
    children,
}) => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(startGame());
    };

    return <Button onClick={onClick}>{children}</Button>;
};
