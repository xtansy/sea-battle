import css from "./GameFooter.module.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "shared/ui";
import { gameTypeSelector } from "entities/game";
import { useAlertModal } from "shared/lib";

export const GameFooter = () => {
    const modal = useAlertModal();
    const navigate = useNavigate();
    const gameType = useSelector(gameTypeSelector);

    const onClickGoHome = () => {
        navigate("/home");
    };

    const onClickRules = () => {
        modal.show({
            title: "Правила игры",
            content: <div>КОНТЕНТ</div>,
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
