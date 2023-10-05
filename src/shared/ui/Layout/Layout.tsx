import { Outlet } from "react-router-dom";
import css from "./Layout.module.css";

export const Layout: React.FC = () => {
    return (
        <div className={css.root}>
            <Outlet />
        </div>
    );
};
