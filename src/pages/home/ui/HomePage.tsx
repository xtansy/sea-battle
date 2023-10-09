import css from "./HomePage.module.css";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { type GameType } from "entities/game";
import { userNameSelector, enterName } from "entities/user";
import { gameTypeSelector, enterGameType } from "entities/game";
import { InitForm } from "widgets/InitForm";

export const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const existName = useSelector(userNameSelector);
    const existGameType = useSelector(gameTypeSelector);

    const onSuccess = (name: string, gameType: GameType) => {
        dispatch(enterName(name));
        dispatch(enterGameType(gameType));
        navigate("/game");
    };

    return (
        <div className={css.page}>
            <div className={css.content}>
                <h1 className={css.title}>Морской бой</h1>
                <InitForm
                    onSuccess={onSuccess}
                    existName={existName ? existName : undefined}
                    existGameType={existGameType ? existGameType : undefined}
                />
            </div>
        </div>
    );
};
