import css from "./RemoveShip.module.css";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { getLetterByIndex } from "shared/lib";
import { Button } from "shared/ui";
import { removeShip, BOARD_SIZE } from "entities/game";

const NUMBERS: number[] = Array(BOARD_SIZE).fill(null);

export const RemoveShip = () => {
    const [coords, setCoords] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const dispatch = useDispatch();

    const onClickRemove = () => {
        dispatch(removeShip({ ...coords }));
    };

    const onChangeY = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = +e.target.value;
        setCoords((old) => ({ ...old, y: value }));
    };

    const onChangeX = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = +e.target.value;
        setCoords((old) => ({ ...old, x: value }));
    };

    return (
        <div className={css.removeShip}>
            <div className={css.selectBlock}>
                <div className={css.text}>
                    <label className={css.label}>Координаты ячейки</label>
                    <p className={css.descr}>
                        Удалит весь корабль по данным одной его ячейки
                    </p>
                </div>
                <select
                    onChange={onChangeX}
                    className={css.select}
                    value={coords.x}
                >
                    {NUMBERS.map((_, i) => (
                        <option key={i} value={i}>
                            {getLetterByIndex(i + 1)}
                        </option>
                    ))}
                </select>
                <select
                    onChange={onChangeY}
                    value={coords.y}
                    className={css.select}
                >
                    {NUMBERS.map((_, i) => (
                        <option key={i} value={i}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>
            <Button onClick={onClickRemove}>Удалить</Button>
        </div>
    );
};
