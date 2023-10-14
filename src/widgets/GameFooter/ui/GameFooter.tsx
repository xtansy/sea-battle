import css from "./GameFooter.module.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "shared/ui";
import { gameTypeSelector } from "entities/game";
import { Rules } from "entities/rules";
import { useAlertModal } from "shared/lib";

export const GameFooter = () => {
    const gameType = useSelector(gameTypeSelector);

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

    return (
        <div className={css.gameFooter}>
            <div className={css.textBlock}>
                <p className={css.gameType}>
                    Выбранный тип: <span>{gameType?.toLocaleLowerCase()}</span>
                </p>
            </div>
            <div className={css.buttons}>
                <Button onClick={onClickRules} className={css.button}>
                    Посмотреть правила
                </Button>
                <Button className={css.button} onClick={onClickGoHome}>
                    ← Назад
                </Button>
            </div>
        </div>
    );
};
