import css from "./ToggleDevMode.module.css";

import { useSelector, useDispatch } from "react-redux";
import { toggleDevMode, devModeSelector } from "entities/game";

export const ToggleDevMode = () => {
    const dispatch = useDispatch();
    const devMode = useSelector(devModeSelector);

    const onChangeToggle = () => {
        dispatch(toggleDevMode());
    };
    return (
        <div className={css.toggleBlock}>
            <div>
                <div className={css.title}>Режим разработчика</div>
                <p className={css.descr}>для наглядности работы</p>
            </div>
            <div>
                <input
                    onChange={onChangeToggle}
                    checked={!devMode}
                    className={css.input}
                    type="checkbox"
                    id="switch"
                />
                <label className={css.label} htmlFor="switch">
                    Toggle
                </label>
                <div className={css.dummy}></div>
            </div>
        </div>
    );
};
