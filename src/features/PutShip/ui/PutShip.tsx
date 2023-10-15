import css from "./PutShip.module.css";

import { useState } from "react";

import { getLetterByIndex, useAppDispatch } from "shared/lib";
import { type ShipLength, BOARD_SIZE, addShip } from "entities/game";
import { Button } from "shared/ui";

const SHIP_LENGTHS: ShipLength[] = [4, 3, 2, 1];
const NUMBERS: number[] = Array(BOARD_SIZE).fill(null);

export const PutShip = () => {
    const dispatch = useAppDispatch();
    const [len, setLen] = useState<number>(4);
    const [start, setStart] = useState({ startY: 1, startX: 1 });
    const [end, setEnd] = useState({ endY: 1, endX: 1 });

    const onSelectLen = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLen(+e.target.value);
    };

    const onSelectStartY = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = +e.target.value;
        setStart((old) => ({ ...old, startY: value }));
        if (len === 1) {
            setEnd((old) => ({ ...old, endY: value }));
        }
    };
    const onSelectStartX = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = +e.target.value;
        setStart((old) => ({ ...old, startX: value }));
        if (len === 1) {
            setEnd((old) => ({ ...old, endX: value }));
        }
    };

    const onSelectEndY = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = +e.target.value;
        setEnd((old) => ({ ...old, endY: value }));
    };
    const onSelectEndX = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = +e.target.value;
        setEnd((old) => ({ ...old, endX: value }));
    };

    const onClickPut = () => {
        dispatch(
            addShip({
                shipType: len,
                startX: start.startX,
                startY: start.startY,
                endX: end.endX,
                endY: end.endY,
            })
        );
    };

    return (
        <div className={css.putShip}>
            <div className={css.selectBlock}>
                <label>Выберите размер корабля</label>
                <select
                    className={css.select}
                    value={len}
                    onChange={onSelectLen}
                >
                    {SHIP_LENGTHS.map((len, i) => {
                        return (
                            <option value={len} key={i}>
                                {len}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className={css.selectBlock}>
                <label className={css.label}>Координаты начала</label>
                <select
                    onChange={onSelectStartY}
                    className={css.select}
                    value={start.startY}
                >
                    {NUMBERS.map((_, i) => (
                        <option key={i} value={i}>
                            {getLetterByIndex(i + 1)}
                        </option>
                    ))}
                </select>
                <select
                    onChange={onSelectStartX}
                    className={css.select}
                    value={start.startX}
                >
                    {NUMBERS.map((_, i) => (
                        <option key={i} value={i}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>
            {len !== 1 && (
                <div className={css.selectBlock}>
                    <label className={css.label}>Координаты конца</label>
                    <select
                        onChange={onSelectEndY}
                        className={css.select}
                        value={end.endY}
                    >
                        {NUMBERS.map((_, i) => (
                            <option key={i} value={i}>
                                {getLetterByIndex(i + 1)}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={onSelectEndX}
                        value={end.endX}
                        className={css.select}
                    >
                        {NUMBERS.map((_, i) => (
                            <option key={i} value={i}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <Button onClick={onClickPut}>Добавить корабль</Button>
        </div>
    );
};
