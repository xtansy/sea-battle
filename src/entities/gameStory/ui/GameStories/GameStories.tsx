import css from "./GameStories.module.css";

import { type GameInfo } from "entities/user/@x/gameStory";

import { GameStory } from "..";

interface GameStoriesProps {
    gameStories: GameInfo[];
}

export const GameStories: React.FC<GameStoriesProps> = ({ gameStories }) => {
    if (gameStories.length === 0) return <p>У вас пока что не было игр</p>;

    return (
        <div className={css.stories}>
            {gameStories.map((story, i) => (
                <GameStory key={i} gameInfo={story} />
            ))}
        </div>
    );
};
