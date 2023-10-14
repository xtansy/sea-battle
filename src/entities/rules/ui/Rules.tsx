import css from "./Rules.module.css";

import { GameType } from "entities/game/@x/rules";
import { generalRules, inTurnRules, beforeTheMissRules } from "../lib/rules";

interface RulesProps {
    gameType: GameType;
}

const BeforeTheMissRules = () => {
    return (
        <div className={css.rulesContent}>
            {beforeTheMissRules.map((item) => (
                <p>{item}</p>
            ))}
        </div>
    );
};

export const InTurnRules = () => {
    return (
        <div className={css.rulesContent}>
            {inTurnRules.map((item) => (
                <p>{item}</p>
            ))}
        </div>
    );
};

export const Rules: React.FC<RulesProps> = ({ gameType }) => {
    return (
        <div className={css.rules}>
            <h3>Тип игры: {gameType}</h3>
            <div className={css.rulesHeader}>
                {generalRules.map((item) => (
                    <p>{item}</p>
                ))}
            </div>
            {gameType === GameType.before_the_miss && <BeforeTheMissRules />}
            {gameType === GameType.in_turn && <InTurnRules />}
        </div>
    );
};
