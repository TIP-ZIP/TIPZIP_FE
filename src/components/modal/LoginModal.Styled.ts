import { fontStyles } from '@styles/theme/typography';
import styled from 'styled-components';
import deleteIcon from '@assets/svgs/DeleteModal.svg';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  border-radius: 1rem;
  padding: 2.4rem;
  padding-top: 3.2rem;
  width: 29rem;
  text-align: center;
  gap: 2.8rem;
`;

export const ModalTitle = styled.span`
  ${fontStyles.Body4}
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
`;

export const ModalButton = styled.button`
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[300]};
  color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.6rem;
  padding: 1.2rem 1.8rem;
  ${fontStyles.Caption2}
  cursor: pointer;
`;

export const ModalButton1 = styled.button`
  border: none;
  display: flex;
  background-color: ${({ theme }) => theme.colors.TZ_Signature[500]};
  padding: 1.2rem 5.2rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  ${fontStyles.Caption2}
  color:  ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  cursor: pointer;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 0.8rem;
  height: 0.8rem;
  background: url(${deleteIcon});
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  cursor: pointer;
`;
