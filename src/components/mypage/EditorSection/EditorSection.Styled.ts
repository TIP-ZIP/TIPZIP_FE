import styled from 'styled-components';

export const EditorContainer = styled.div`
  position: relative;
`;

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
  box-sizing: border-box;
`;

export const CharCount = styled.div`
  ${({ theme }) => theme.fontStyles.Caption4}
  position: absolute;
  bottom: 4.6rem;
  right: 2.7rem;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
`;

export const ScrapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 9.8rem;
  padding: 0 2.8rem;
  gap: 1.7rem;
  margin-bottom: 2.3rem;
  box-sizing: border-box;
`;

export const ZipContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
  height: 100%;
  max-height: 36.4rem;
`;

export const GrayBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.2rem;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
`;

export const EditorBar = styled(GrayBar)`
  width: 100%;
  height: 0.3rem;
`;

export const ScrapMessage = styled.div`
  ${({ theme }) => theme.fontStyles.Body1}
  font-family: 'Pretendard';
  color: ${({ theme }) => theme.colors.TZ_Monochrome[1000]};
`;

export const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1.6rem;
`;

export const Thumbnail = styled.img`
  width: 7.6rem;
  height: 7.6rem;
  border-radius: 0.6rem;
`;

export const CategoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Category = styled.span`
  color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
  ${({ theme }) => theme.fontStyles.Body5}
`;

export const Message = styled.p`
  font-size: 16px;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
`;
