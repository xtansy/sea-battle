import css from "./Board.module.css";

import { Cell } from "../Cell/Cell";
import { type ICell } from "entities/game";
import React from "react";

interface BoardProps {
    board: ICell[][];
    renderCell?: (cell: ICell) => React.ReactNode;
}

export const Board: React.FC<BoardProps> = ({ board, renderCell }) => {
    return (
        <div className={css.board}>
            {board.map((cells, i) => (
                <div className={css.cells} key={i}>
                    {cells.map((cell, j) =>
                        renderCell ? (
                            <React.Fragment key={j}>
                                {renderCell(cell)}
                            </React.Fragment>
                        ) : (
                            <Cell cell={cell} key={j} />
                        )
                    )}
                </div>
            ))}
        </div>
    );
};
