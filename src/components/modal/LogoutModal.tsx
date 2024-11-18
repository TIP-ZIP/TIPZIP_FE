import React from 'react';
import * as S from './LoginModal.Styled';

export const LogoutModal: React.FC<{
  showModal: boolean;
  onClose: () => void;
  onLogout: () => void;
}> = ({ showModal, onClose, onLogout }) => {
  if (!showModal) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose} />
        <S.ModalTitle>정말 로그아웃하시겠습니까?</S.ModalTitle>
        <S.ButtonContainer>
          <S.ModalButton onClick={onClose}>취소</S.ModalButton>
          <S.ModalButton1 onClick={onLogout}>네</S.ModalButton1>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};
