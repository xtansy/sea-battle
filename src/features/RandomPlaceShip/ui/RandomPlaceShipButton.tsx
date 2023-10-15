import { useDispatch } from "react-redux";

import { randomPlaceMyShip } from "entities/game";
import { Button } from "shared/ui";

export const RandomPlaceShipButton = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(randomPlaceMyShip());
    };

    return <Button onClick={onClick}>Расставить мои корабли случайно</Button>;
};
