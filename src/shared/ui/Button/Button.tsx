import css from "./Button.module.css";

import { ComponentProps } from "react";
import cn from "classnames";

interface ButtonProps extends ComponentProps<"button"> {
    variant?: "standart";
}

export const Button: React.FC<ButtonProps> = ({
    variant = "standart",
    children,
    className,
    ...props
}) => {
    const clazz = cn(css.button, css[`button_${variant}`], className);
    return (
        <button {...props} className={clazz}>
            {children}
        </button>
    );
};
