import styled from 'styled-components';
import folder from '@assets/svgs/EmptyFolder.svg?react';
import bookmark from '@assets/svgs/EmptyGrayBookmark.svg?react';
import filledbookmark from '@assets/svgs/FilledGrayBookmark.svg?react';

export const ZipContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
  height: 100%;
  max-height: 36.4rem;
  padding-bottom: 3.1rem;
  box-sizing: border-box;
  overflow-y: auto;
`;

export const ZipBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.3rem 2.2rem 2.3rem 2.8rem;
`;

export const FolderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2.3rem;
  gap: 1.6rem;
`;

export const FolderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FolderBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export const FolderInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FolderIcon = styled(folder)`
  width: 9.1rem;
  height: 6.8rem;

  display: flex;
  align-items: center;

  position: relative;
`;

export const FolderBar = styled.div`
  height: 0.05rem;
  width: 100%;
  margin-bottom: 1.6rem;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[300]};
`;

export const FolderName = styled.span`
  position: absolute;
  top: 3.6rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.TZ_Signature[500]};
  ${({ theme }) => theme.fontStyles.Caption5}
`;

export const FolderInfo = styled.span`
  ${({ theme }) => theme.fontStyles.Caption8}
  height: 1.2rem;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
  font-weight: 300;
`;

export const ScrapButton = styled(bookmark)<{ $isScrap: boolean }>`
  content: ${(props) => (props.$isScrap ? `url(${filledbookmark})` : `url(${bookmark})`)};
  width: 2.8rem;
  height: 2.8rem;
  cursor: pointer;
`;

export const ZipMessage = styled.span`
  ${({ theme }) => theme.fontStyles.Body3}
  font-family: 'Pretendard';
  color: ${({ theme }) => theme.colors.TZ_Monochrome[1000]};
`;

export const Addbtn = styled.span`
  ${({ theme }) => theme.fontStyles.Body4}
  cursor: pointer;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
`;

export const NameInfo = styled(ZipMessage)`
  min-height: 2rem;
  height: 100%;
`;
