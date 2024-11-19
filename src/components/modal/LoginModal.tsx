import React from 'react';
import * as S from './LoginModal.Styled';

export const LoginModal: React.FC<{
  showModal: boolean;
  onClose: () => void;
  onLogin: () => void;
}> = ({ showModal, onClose, onLogin }) => {
  if (!showModal) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose} />
        <S.ModalTitle>로그인이 필요한 서비스입니다</S.ModalTitle>
        <S.ButtonContainer>
          <S.ModalButton onClick={onClose}>그냥 볼게요</S.ModalButton>
          <S.ModalButton1 onClick={onLogin}>로그인하기</S.ModalButton1>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};
