import styled from 'styled-components';

export const InputBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-self: baseline;
`;

export const EditorInput = styled.input`
  ${({ theme }) => theme.fontStyles.Caption1}
  height: 10.2rem;
  width: 100%;
  padding-left: 2.8rem;
  text-align: left;
  outline: none;
  border: none;
  padding-bottom: 1.1rem;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[1000]};
`;

export const CharCount = styled.div`
  ${({ theme }) => theme.fontStyles.Caption4}
  position: absolute;
  bottom: 4.6rem;
  right: 2.7rem;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
`;
