import css from "./Ship.module.css";

import { useDrag } from "react-dnd";
import { Cell } from "entities/game";

interface ShipProps {
    shipLen: number;
}

export const Ship: React.FC<ShipProps> = ({ shipLen }) => {
    const [{ isDragging }, ref] = useDrag({
        type: "SHIP",
        item: 4,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            className={css.ship}
            ref={ref}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: "move",
                width: "50px",
                height: "50px",
                backgroundColor: "blue",
            }}
        >
            {Array(shipLen).map((cell) => (
                <Cell cell={cell} />
            ))}
        </div>
    );
};
