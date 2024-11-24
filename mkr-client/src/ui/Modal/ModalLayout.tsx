import React, { FC, PropsWithChildren } from "react";
import Portal from "src/common/Portal";
import { ModalProps } from "src/hooks/useModal";

interface ModalLayoutProps extends PropsWithChildren<ModalProps> {}

const ModalLayout: FC<ModalLayoutProps> = ({
  children,
  open,
  onClose,
  animation,
}) => {
  if (!open) return null;
  return (
    <Portal target="modal">
      <div
        onClick={onClose}
        className={`h-screen top-0 left-0 z-50 w-full bg-black/30 fixed flex justify-center items-center
          ${animation === "out" ? "animate-fade-out" : "animate-fade-in"}
        `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded shadow-xl max-w-xl w-full p-5 "
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default ModalLayout;
