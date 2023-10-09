import css from "./Cell.module.css";

import { type ICell } from "entities/game";

interface CellProps {
    cell: ICell;
}

export const Cell: React.FC<CellProps> = ({ cell }) => {
    return <div className={css.cell}></div>;
};
