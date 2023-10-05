import css from "./EnterName.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    enterNameSchema,
    type EnterNameSchema,
} from "../../model/enterNameSchema";
import { Button } from "shared/ui";
import { useDispatch } from "react-redux";
import { enterName } from "entities/user";

export const EnterName = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EnterNameSchema>({
        resolver: yupResolver(enterNameSchema),
    });

    const onSubmit = (data: EnterNameSchema) => {
        dispatch(enterName(data.name));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={css.inputBlock}>
                    <label htmlFor="name">Введите имя</label>
                    <input
                        {...register("name")}
                        id="login"
                        type="text"
                        className={css.input}
                    />
                </div>
                <p className={css.error}>{errors.name?.message}</p>
                <Button type="submit">Запомнить!</Button>
            </form>
        </div>
    );
};
