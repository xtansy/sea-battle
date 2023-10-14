import css from "./GameStory.module.css";

import classNames from "classnames";

import { GameInfo, GameResult } from "entities/user/@x/gameStory";
import { formatTimestamp } from "shared/lib";
import { Icon } from "shared/ui";

interface GameStoryProps {
    gameInfo: GameInfo;
}

export const GameStory: React.FC<GameStoryProps> = ({ gameInfo }) => {
    const winModifier = css[`gameResult_win`];
    const loseModifier = css[`gameResult_lose`];

    const clazz = classNames(css.gameResult, {
        [winModifier]: gameInfo.result === GameResult.wictory,
        [loseModifier]: gameInfo.result === GameResult.defeat,
    });

    return (
        <div className={css.gameStory}>
            <Icon className={css.avatar} type="user" />
            <div className={css.info}>
                <p className={clazz}>{gameInfo.result}</p>
                <p className={css.gameType}>{gameInfo.gameType}</p>
                <p className={css.timestamp}>
                    {formatTimestamp(gameInfo.timestamp)}
                </p>
            </div>
        </div>
    );
};
