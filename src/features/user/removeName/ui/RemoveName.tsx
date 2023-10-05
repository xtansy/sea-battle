import css from "./RemoveName.module.css";
import { useDispatch } from "react-redux";
import { removeName } from "entities/user";

export const RemoveName = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(removeName());
    };

    return (
        <p onClick={onClick} className={css.changeName}>
            Изменить имя
        </p>
    );
};
