import * as yup from "yup";
import { GameType } from "entities/game";

export interface InitSchema {
    name: string;
    gameType: GameType;
}

export const schema = yup
    .object()
    .shape({
        name: yup
            .string()
            .min(5, "Имя должно быть больше 5 символов")
            .max(20, "Имя должно быть меньше 20 символов")
            .required("Введите имя"),
        gameType: yup
            .string()
            .oneOf(Object.values(GameType), "Выберите тип игры")
            .required("Выбор обязателен"),
    })
    .required();
