import { FC, PropsWithChildren } from "react";
import ModalLayout from "./ModalLayout";
import { ModalProps } from "src/hooks/useModal";

interface ModalComponentProps extends PropsWithChildren<ModalProps> {}

const Modal: FC<ModalComponentProps> = ({ children, ...modalProps }) => {
  return <ModalLayout {...modalProps}>{children}</ModalLayout>;
};

export default Modal;
