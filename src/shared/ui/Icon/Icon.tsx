import css from "./Icon.module.css";

import classNames from "classnames";

export type IconType = "robot" | "user" | "x";

interface IconProps {
    type: IconType;
    className?: string;
    onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({ type, onClick, className }) => {
    const clazz = classNames(
        css.icon,
        { [css.icon_clickable]: Boolean(onClick) },
        className
    );
    return (
        <img
            onClick={onClick}
            className={clazz}
            src={`/icons/${type}.png`}
            alt="icon"
        />
    );
};
