import css from "./Profile.module.css";

interface ProfileProps {
    name: string;
    icon?: React.ReactNode;
}

export const Profile: React.FC<ProfileProps> = ({ name, icon }) => {
    return (
        <div className={css.profile}>
            {icon && icon}
            <h1 className={css.name}>{name}</h1>
        </div>
    );
};
