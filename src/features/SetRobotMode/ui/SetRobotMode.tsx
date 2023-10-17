import css from "./SetRobotMode.module.css";

import { useSelector, useDispatch } from "react-redux";

import { RobotMode, robotModeSelector, setRobotMode } from "entities/game";
import { robotModes } from "../model/robotModes";

export const SetRobotMode = () => {
    const mode = useSelector(robotModeSelector);
    const dispatch = useDispatch();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as RobotMode;

        dispatch(setRobotMode(value));
    };

    return (
        <div className={css.setRobotModeBlock}>
            <label className={css.label}>Уровень сложности</label>
            <select className={css.select} value={mode} onChange={onChange}>
                {robotModes.map((setting, i) => (
                    <option key={i} value={setting.value}>
                        {setting.text}
                    </option>
                ))}
            </select>
        </div>
    );
};
