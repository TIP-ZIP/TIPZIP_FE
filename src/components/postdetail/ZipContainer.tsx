import React, { useEffect, useState } from 'react';
import * as S from './ZipContainer.Styled';

interface Folder {
  id: number;
  name: string;
  postCount: number;
  isScrapped: boolean;
}

interface ZipContainerProps {
  postId: number | undefined;
}

const ZipContainer: React.FC<ZipContainerProps> = ({ postId }) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      // 추후 수정
      const folderData = [
        { id: 1, name: '갓생 살기', postCount: 3, isScrapped: false },
        { id: 2, name: '아기 사자의 하루', postCount: 5, isScrapped: false },
        { id: 3, name: '멋쟁이사자처럼', postCount: 2, isScrapped: false },
      ];
      setFolders(folderData);
    };
    fetchFolders();
  }, []);

  const handleScrapClick = (folderId: number) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              isScrapped: !folder.isScrapped, // 스크랩 상태 토글
              postCount: folder.isScrapped ? folder.postCount - 1 : folder.postCount + 1, // 게시물 수 증가/감소
            }
          : folder,
      ),
    );
  };

  return (
    <S.ZipContainer>
      <S.ZipBar>
        <S.ZipMessage>스크랩 ZIP</S.ZipMessage>
        <S.Addbtn>추가하기</S.Addbtn>
      </S.ZipBar>

      {folders.map((folder, index) => (
        <S.FolderContainer key={folder.id}>
          <S.FolderItem>
            <S.FolderBox>
              <S.FolderIcon>
                <S.FolderName>{folder.name}</S.FolderName>
              </S.FolderIcon>

              <S.FolderInfoBox>
                <S.NameInfo>{folder.name}</S.NameInfo>
                <S.FolderInfo>게시물 {folder.postCount}개</S.FolderInfo>
              </S.FolderInfoBox>
            </S.FolderBox>

            {/* 스크랩 버튼 */}
            <S.ScrapButton
              onClick={() => handleScrapClick(folder.id)}
              $isScrap={folder.isScrapped}
            />
          </S.FolderItem>
          {index !== folders.length - 1 && <S.FolderBar />}
        </S.FolderContainer>
      ))}
    </S.ZipContainer>
  );
};

export default ZipContainer;
