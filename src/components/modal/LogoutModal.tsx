import React from 'react';
import { Modal } from './Modal';

export const LogoutModal: React.FC<{
  showModal: boolean;
  onClose: () => void;
  onLogout: () => void;
}> = ({ showModal, onClose, onLogout }) => {
  if (!showModal) return null;
  return (
    <Modal
      showModal={showModal}
      onClose={onClose}
      onAction={onLogout}
      title='정말 로그아웃하시겠습니까?'
      buttonText1='취소'
      buttonText2='네'
      buttonPadding1='1.2rem 5.1rem'
      buttonPadding2='1.2rem 5.1rem'
    />
  );
};
