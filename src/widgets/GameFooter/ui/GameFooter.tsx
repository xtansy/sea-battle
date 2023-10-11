import css from "./GameFooter.module.css";
import { useSelector } from "react-redux";
import { gameTypeSelector } from "entities/game";

export const GameFooter = () => {
    const gameType = useSelector(gameTypeSelector);
    return (
        <div className={css.gameFooter}>
            <div>Выбранный тип: {gameType}</div>
            <div>Правила игры</div>
        </div>
    );
};
