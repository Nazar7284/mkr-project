import React, { useEffect, useState } from "react";

export interface ModalProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  animation: ModalAnimation;
}

type ModalAnimation = "in" | "out";

const useModal = (): ModalProps => {
  const [open, setOpen] = useState(false);
  const [animation, setAnimation] = useState<ModalAnimation>("in");

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setAnimation("out");
    setTimeout(() => setOpen(false), 200);
  };

  useEffect(() => {
    if (open) {
      setAnimation("in");
    }
    document.body.style.paddingRight = open ? "17px" : ""; //scrollbar
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    open,
    onOpen: handleOpenModal,
    onClose: handleCloseModal,
    animation,
  };
};

export default useModal;
