import styled from 'styled-components';
import close from '@assets/svgs/closemodal.svg';

export const EditorContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-top: 1.8rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px 30px 0px 0px;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  box-shadow: 0px -6px 4px 0px rgba(0, 0, 0, 0.1);
`;
export const EditorTitle = styled.div`
  color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
  ${({ theme }) => theme.fontStyles.Body2}
  padding-bottom: 1.5rem;
`;

export const EditorHeader = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  width: 100%;
`;

export const CloseBtn = styled.div`
  background: url(${close});
  background-repeat: no-repeat;
  background-size: contain;
  width: 1.6rem;
  top: 1.9rem;
  cursor: pointer;
  left: 2.5rem;
  position: absolute;
  height: 1.6rem;
`;

export const EditorBody = styled.div`
  width: 100%;
`;
