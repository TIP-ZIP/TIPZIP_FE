import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0rem 2rem;
  background-color: ${colors.TZ_Monochrome[0]};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const StyledSubmitButton = styled.button<{ $isValid?: boolean }>`
  width: 100%;
  height: 4.4rem;
  border: none;
  border-radius: 10px;
  background-color: ${
    ({ theme, $isValid }) =>
      $isValid
        ? theme.colors.TZ_Monochrome[1000] // 활성화 상태일 때의 색상
        : theme.colors.TZ_Monochrome[300] // 비활성화 상태일 때의 색상
  };
  color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  ${({ theme }) => theme.fontStyles.Body1};
  cursor: ${({ $isValid }) => ($isValid ? 'pointer' : 'default')};
  transition: background-color 0.2s ease-in-out;

  &:active {
    opacity: ${({ $isValid }) => ($isValid ? 0.8 : 1)};
  }
`;

export const ButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${colors.TZ_Monochrome[0]};
  padding: 1.6rem 0;
  outline: none;
  border: none;
`;
