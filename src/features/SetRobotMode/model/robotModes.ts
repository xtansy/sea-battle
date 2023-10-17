import { RobotMode } from "entities/game";

type RobotModeSetting = { text: string; value: RobotMode };

export const robotModes: RobotModeSetting[] = [
    {
        text: "легкий",
        value: "easy",
    },
    {
        text: "средний",
        value: "medium",
    },
    {
        text: "тяжелый",
        value: "hard",
    },
];
