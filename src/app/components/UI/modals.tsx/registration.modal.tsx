import RegistrationForm from "@/app/forms/registration.form";
import CustomModal from "../common/modal";

type RegistrationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} size="md">
      <RegistrationForm onClose={onClose} />
    </CustomModal>
  );
};

export default RegistrationModal;
