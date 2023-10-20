import { useAppDispatch } from "shared/lib";

import { Button } from "shared/ui";
import { toPreparation } from "entities/game";

export const ToPreparationButton = () => {
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(toPreparation());
    };

    return <Button onClick={onClick}>К подготовке</Button>;
};
