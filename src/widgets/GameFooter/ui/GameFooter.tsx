import css from "./GameFooter.module.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "shared/ui";
import {
    gameTypeSelector,
    gameStatusSelector,
    GameStatus,
} from "entities/game";
import { GameStories } from "entities/gameStory";
import { gameStoriesSelector } from "entities/user";
import { Rules } from "entities/rules";
import { useAlertModal } from "shared/lib";

export const GameFooter = () => {
    const gameType = useSelector(gameTypeSelector);
    const gameStatus = useSelector(gameStatusSelector);
    const gameStories = useSelector(gameStoriesSelector);

    const modal = useAlertModal();
    const navigate = useNavigate();

    if (!gameType) return null;

    const onClickGoHome = () => {
        navigate("/home");
    };

    const onClickRules = () => {
        modal.show({
            title: "Правила игры",
            content: <Rules gameType={gameType} />,
            onButtonClick: () => modal.remove(),
        });
    };

    const onClickGameStories = () => {
        modal.show({
            title: "История игр",
            content: <GameStories gameStories={[...gameStories].reverse()} />,
            onButtonClick: () => modal.remove(),
        });
    };

    return (
        <div className={css.gameFooter}>
            <div className={css.textBlock}>
                <p className={css.gameType}>
                    Выбранный тип: <span>{gameType?.toLocaleLowerCase()}</span>
                </p>
            </div>
            <div className={css.buttons}>
                <Button
                    disabled={gameStatus === GameStatus.in_the_game}
                    className={css.button}
                    onClick={onClickGoHome}
                >
                    ← Назад
                </Button>
                <Button onClick={onClickGameStories} className={css.button}>
                    История моих игр
                </Button>
                <Button onClick={onClickRules} className={css.button}>
                    Посмотреть правила
                </Button>
            </div>
        </div>
    );
};
