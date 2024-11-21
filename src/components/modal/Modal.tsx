import React from 'react';
import * as S from './Modal.Styled';

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  onAction: () => void; //로그인 또는 로그아웃
  title: string;
  buttonText1: string;
  buttonText2: string;
  buttonPadding1?: string;
  buttonPadding2?: string;
}

export const Modal: React.FC<ModalProps> = ({
  showModal,
  onClose,
  onAction,
  title,
  buttonText1,
  buttonText2,
  buttonPadding1 = 'auto',
  buttonPadding2 = 'auto',
}) => {
  if (!showModal) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose} />
        <S.ModalTitle>{title}</S.ModalTitle>
        <S.ButtonContainer>
          <S.ModalButton style={{ padding: buttonPadding1 }} onClick={onClose}>
            {buttonText1}
          </S.ModalButton>
          <S.ModalButton1 style={{ padding: buttonPadding2 }} onClick={onAction}>
            {buttonText2}
          </S.ModalButton1>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};
