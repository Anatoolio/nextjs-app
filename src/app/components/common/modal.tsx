"use client";

import { Modal } from "@heroui/react";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  size?: "sm" | "md" | "lg";
};

const CustomModal = ({
  isOpen,
  onClose,
  children,
  title,
  size = "sm",
}: CustomModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop variant="opaque">
        <Modal.Container size={size}>
          <Modal.Dialog className="bg-neutral-900 text-foreground">
            <Modal.CloseTrigger className="bg-neutral-800 hover:bg-neutral-600" />
            <Modal.Header>
              <Modal.Heading className="text-white">{title}</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="text-neutral-300">{children}</Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default CustomModal;
