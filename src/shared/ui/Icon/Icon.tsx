import css from "./Icon.module.css";

export type IconType = "robot" | "user";

interface IconProps {
    type: IconType;
}

export const Icon: React.FC<IconProps> = ({ type }) => {
    return <img className={css.icon} src={`/icons/${type}.png`} alt="icon" />;
};
