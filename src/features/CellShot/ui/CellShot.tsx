import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { type ICell, Cell, canShootSelector, shoot } from "entities/game";

interface CellShopProps {
    cell: ICell;
}

// CellShot have only enemy

export const CellShot: React.FC<CellShopProps> = ({ cell }) => {
    const dispatch = useDispatch();
    const canShoot = useSelector(canShootSelector);

    const onClick = useCallback(() => {
        dispatch(shoot({ x: cell.x, y: cell.y }));
    }, []);

    return <Cell enemy cell={cell} onClick={canShoot ? onClick : undefined} />;
};
