import React from 'react';
import { Modal } from './Modal';

export const LoginModal: React.FC<{
  showModal: boolean;
  onClose: () => void;
  onLogin: () => void;
}> = ({ showModal, onClose, onLogin }) => {
  return (
    <Modal
      showModal={showModal}
      onClose={onClose}
      onAction={onLogin}
      title='로그인이 필요한 서비스입니다'
      buttonText1='그냥 볼게요'
      buttonText2='로그인하기'
      buttonPadding1='1.2rem 1.8rem'
      buttonPadding2='1.2rem 5.2rem'
    />
  );
};
