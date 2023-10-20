import { Cell, CellStatus } from "entities/game";
import css from "./Ship.module.css";

interface ShipProps {
    shipLen: number;
}

const CELL = { x: 0, y: 0, status: CellStatus.with_ship };

export const Ship: React.FC<ShipProps> = ({ shipLen }) => {
    return (
        <div className={css.ship}>
            {Array(shipLen)
                .fill(null)
                .map((_, i) => (
                    <Cell key={i} cell={CELL} />
                ))}
        </div>
    );
};
