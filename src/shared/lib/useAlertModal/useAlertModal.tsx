import css from "./useAlertModal.module.css";

import { useModal, create as createModal } from "@ebay/nice-modal-react";
import { Button, Modal } from "../../ui";

interface AlertModalPresenterProps {
    title: string;
    content?: React.ReactNode;
    onButtonClick: () => void;
    buttonText?: string;
}

const AlertModalPresenter: React.FC<AlertModalPresenterProps> = ({
    title,
    onButtonClick,
    content,
    buttonText = "Понятно!",
}) => {
    return (
        <Modal>
            <h1 className={css.title}>{title}</h1>
            <div className={css.content}>{content}</div>
            <Button onClick={onButtonClick}>{buttonText}</Button>
        </Modal>
    );
};

export const AlertModal = createModal(AlertModalPresenter);

export const useAlertModal = () => {
    return useModal(AlertModal);
};
