import LoginForm from "@/app/forms/login.form";
import CustomModal from "../common/modal";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title="Вход в аккаунт"
    >
      <LoginForm onClose={onClose} />
    </CustomModal>
  );
};

export default LoginModal;
