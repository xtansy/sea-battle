import css from "./Cell.module.css";

import classNames from "classnames";

import { CellStatus, type ICell } from "entities/game";

interface CellProps {
    cell: ICell;
    onClick?: () => void;
    enemy?: boolean;
    className?: string;
}

export const Cell: React.FC<CellProps> = ({
    cell,
    onClick,
    enemy,
    className,
}) => {
    const modifier = css[`cell_${cell.status}`];

    const clazz = classNames(css.cell, {
        //          ↓ not visualize ship if cell is an enemy
        [modifier]: !(enemy && cell.status === CellStatus.with_ship),
        [css["cell_pointer"]]: onClick,
        [className ? css[className] : ""]: !!className,
    });

    return <div onClick={onClick} className={clazz}></div>;
};
