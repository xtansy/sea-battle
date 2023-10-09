import css from "./GameHeader.module.css";

import { Profile } from "entities/user";
import { Icon } from "shared/ui";

interface GameHeaderProps {
    myName: string;
    myWinsCount: number;

    enemyName: string;
    enemyWinsCount: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
    myName,
    myWinsCount,
    enemyName,
    enemyWinsCount,
}) => {
    return (
        <div className={css.block}>
            <div className={css.infoBlock}>
                <Profile name={myName} icon={<Icon type="user" />} />
                <h2 className={css.wins}>{myWinsCount}</h2>
            </div>
            <p className={css.vs}>VS</p>
            <div className={css.infoBlock}>
                <h2 className={css.defeats}>{enemyWinsCount}</h2>
                <Profile name={enemyName} icon={<Icon type="robot" />} />
            </div>
        </div>
    );
};
