import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

export const Container = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  padding: 0 2.2rem;
  padding-top: 4.8rem;
  padding-bottom: 1.6rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const InputSection = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  padding-left: 0.6rem;
  margin-bottom: 2.4rem;

  ${({ theme }) => theme.fontStyles.Header1}
  color: ${colors.TZ_Monochrome[1000]};
`;

export const NicknameInputBox = styled.div`
  width: 100%;
  height: 5.2rem;

  position: relative;
`;

export const NicknameInput = styled.input.attrs({ spellCheck: false })`
  width: 100%;
  height: 5.2rem;
  padding: 0 1.6rem;
  padding-right: 3.6rem;
  border-radius: 10px;

  position: relative;

  display: flex;
  align-items: center;

  background-color: ${colors.TZ_Monochrome[100]};
  border: none;
  outline: none;

  ${({ theme }) => theme.fontStyles.Body2}
  color: ${colors.TZ_Monochrome[1000]};

  &:focus {
    color: ${colors.TZ_Signature[500]};
    background-color: ${colors.TZ_Signature[50]};
    caret-color: ${colors.TZ_Monochrome[1000]};
  }

  &::selection {
    color: ${colors.TZ_Monochrome[0]};
    background-color: ${colors.TZ_Monochrome[1000]};
  }

  transition:
    color 0.12s ease,
    background-color 0.12s ease;
`;

export const NicknameLength = styled.span`
  ${({ theme }) => theme.fontStyles.Body4}
  color: ${colors.TZ_Monochrome[500]};

  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 1.2rem;
`;

export const TotalCheckContainer = styled.div`
  width: 100%;
  padding: 0 0.6rem;
  margin-top: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const InvalidCheckContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const DuplicateCheckButton = styled.button`
  width: fit-content;
  padding: 0;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid ${colors.TZ_Monochrome[700]};

  white-space: nowrap;

  ${({ theme }) => theme.fontStyles.Body4}
  color: ${colors.TZ_Monochrome[700]};

  &:disabled {
    opacity: 50%;
  }

  transition: opacity 0.12s;
`;

export const InvalidNotice = styled.p`
  color: ${colors.TZ_Signature[500]};
  ${({ theme }) => theme.fontStyles.Caption1}
`;

export const Restriction = styled.div`
  width: 100%;

  ${({ theme }) => theme.fontStyles.Caption1}
  font-weight: 400;
  line-height: 160%;
  color: ${colors.TZ_Monochrome[500]};
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 4.8rem;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fontStyles.Body2}
  color: ${colors.TZ_Monochrome[0]};
  background-color: ${colors.TZ_Monochrome[1000]};

  transition: background-color 0.12s;

  &:disabled {
    background-color: ${colors.TZ_Monochrome[300]};
    pointer-events: none;
  }
`;
