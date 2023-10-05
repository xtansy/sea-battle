import css from "./HomePage.module.css";

import { EnterName, RemoveName } from "features/user";
import { useSelector } from "react-redux";
import { userNameSelector } from "entities/user";
import { Button } from "shared/ui";

export const HomePage = () => {
    const name = useSelector(userNameSelector);
    return (
        <div className={css.page}>
            <div className={css.content}>
                <h1 className={css.title}>Морской бой</h1>
                {name ? (
                    <div>
                        <div>Ваше имя: {name}</div>
                        <RemoveName />
                    </div>
                ) : (
                    <EnterName />
                )}
                <div className={css.buttons}>
                    <Button>Играть</Button>
                </div>
            </div>
        </div>
    );
};
