import css from "./Modal.module.css";

import { useEffect } from "react";
import { useModal } from "@ebay/nice-modal-react";

import { Icon } from "shared/ui";

interface ModalProps {
    children: React.ReactNode;
}

const BODY_MODAL_IS_OPENED_CLASS = "modalIsOpened";

export const Modal: React.FC<ModalProps> = ({ children }) => {
    const modal = useModal();

    useEffect(() => {
        document.body.classList.add(BODY_MODAL_IS_OPENED_CLASS);
        return () => {
            document.body.classList.remove(BODY_MODAL_IS_OPENED_CLASS);
        };
    }, []);

    return (
        <div className={css.root}>
            <div onClick={() => modal.remove()} className={css.overlay}></div>
            <div className={css.modal}>
                <Icon
                    className={css.x}
                    type="x"
                    onClick={() => modal.remove()}
                />
                {children}
            </div>
        </div>
    );
};
