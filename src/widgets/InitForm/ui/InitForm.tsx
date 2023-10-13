import css from "./InitForm.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { schema, InitSchema } from "../model/schema";
import { Button } from "shared/ui";
import { GameType } from "entities/game";

interface InitFormProps {
    existName?: string;
    existGameType?: GameType;
    onSuccess: (name: string, gameType: GameType) => void;
}

export const InitForm: React.FC<InitFormProps> = ({
    existName,
    existGameType,
    onSuccess,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InitSchema>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: existName,
            gameType: existGameType,
        },
    });

    const onSubmit = (data: InitSchema) => {
        onSuccess(data.name, data.gameType);
    };
    return (
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={css.inputBlock}>
                <label htmlFor="name">Введите имя</label>
                <input
                    {...register("name")}
                    id="name"
                    type="text"
                    className={css.input}
                />
                <p className={css.error}>{errors.name?.message}</p>
            </div>
            <div className={css.selectBlock}>
                <label htmlFor="gameType">Выберите тип игры</label>
                <select
                    className={css.select}
                    id="gameType"
                    {...register("gameType")}
                >
                    <option value="">Не выбрано</option>
                    <option value={GameType.before_the_miss}>До промаха</option>
                    <option value={GameType.in_turn}>По очереди</option>
                </select>
                <p className={css.error}>{errors.gameType?.message}</p>
            </div>
            <Button className={css.button} type="submit">
                Играть!
            </Button>
        </form>
    );
};
