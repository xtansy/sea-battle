import * as yup from "yup";

export interface EnterNameSchema {
    name: string;
}
export const enterNameSchema = yup
    .object({
        name: yup
            .string()
            .min(5, "Имя должно быть больше 5 символов")
            .max(20, "Имя должно быть меньше 20 символов")
            .required("Поле обязательно"),
    })
    .required();
