import React from 'react';
import { LoginModal } from '@components/modal/LoginModal';

interface LoginModalContainerProps {
  showModal: boolean;
  handleClose: () => void;
  handleLogin: () => void;
}

const LoginModalContainer: React.FC<LoginModalContainerProps> = ({
  showModal,
  handleClose,
  handleLogin,
}) => {
  return <LoginModal showModal={showModal} onClose={handleClose} onLogin={handleLogin} />;
};

export default LoginModalContainer;
