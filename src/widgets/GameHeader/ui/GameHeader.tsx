import css from "./GameHeader.module.css";

import { useSelector } from "react-redux";

import { Icon } from "shared/ui";
import {
    defeatCountSelector,
    userNameSelector,
    winsCountSelector,
    Profile,
} from "entities/user";

export const GameHeader = () => {
    const name = useSelector(userNameSelector);
    const winsCount = useSelector(winsCountSelector);
    const defeatCount = useSelector(defeatCountSelector);

    if (!name) {
        return null;
    }

    return (
        <div className={css.block}>
            <div className={css.infoBlock}>
                <Profile name={name} icon={<Icon type="user" />} />
                <h2 className={css.wins}>{winsCount}</h2>
            </div>
            <p className={css.vs}>VS</p>
            <div className={css.infoBlock}>
                <h2 className={css.defeats}>{defeatCount}</h2>
                <Profile name={"ИИ"} icon={<Icon type="robot" />} />
            </div>
        </div>
    );
};
