import css from "./Board.module.css";

import { Fragment } from "react";

import { Cell } from "../Cell/Cell";
import { CellStatus, type ICell } from "entities/game";
import { generateRussianAlphabet } from "shared/lib";

interface BoardProps {
    board: ICell[][];
    renderCell?: (cell: ICell) => React.ReactNode;
}

export const Board: React.FC<BoardProps> = ({ board, renderCell }) => {
    const russianAlphabet = generateRussianAlphabet(board[0].length);

    const generateLetters = () => (
        <div className={css.letters}>
            {russianAlphabet.map((item, i) => (
                <p key={i} className={css.index}>
                    {item}
                </p>
            ))}
        </div>
    );

    const generateCell = (cell: ICell, j: number) => {
        const clickable =
            cell.status === CellStatus.empty ||
            cell.status === CellStatus.with_ship;
        return (
            <Fragment key={j}>
                {renderCell && clickable ? (
                    renderCell(cell)
                ) : (
                    <Cell cell={cell} />
                )}
            </Fragment>
        );
    };

    return (
        <div className={css.board}>
            {generateLetters()}
            {board.map((cells, i) => (
                <div key={i} className={css.rowsBlock}>
                    <p className={css.index}>{i + 1}</p>
                    <div className={css.cells}>{cells.map(generateCell)}</div>
                </div>
            ))}
        </div>
    );
};
