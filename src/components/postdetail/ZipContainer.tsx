import React, { useEffect, useState } from 'react';
import * as S from './ZipContainer.Styled';
import axiosInstance from '@api/axios'; // Make sure axios is correctly configured

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
      try {
        // Fetch the folder data from the API
        const response = await axiosInstance.get('/folder?is_my=true');
        const folderData = response.data.map(
          (folder: { folderName: string; count: number }, index: number) => ({
            id: index + 1, // Assuming the API doesn't provide an ID; adjust as needed
            name: folder.folderName,
            postCount: folder.count,
            isScrapped: false, // Default isScrapped state
          }),
        );
        setFolders(folderData);
      } catch (error) {
        console.error('Error fetching folder data', error);
      }
    };

    fetchFolders();
  }, []);

  const handleScrapClick = async (folderId: number, folderName: string) => {
    try {
      // Send post data to the /scrap API endpoint
      const response = await axiosInstance.post('/scrap', {
        post_id: postId,
        folder: folderName,
      });

      if (response.status === 200) {
        // Update folder state if scrap action is successful
        setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.id === folderId
              ? {
                  ...folder,
                  isScrapped: !folder.isScrapped, // Toggle scrap status
                  postCount: folder.isScrapped ? folder.postCount - 1 : folder.postCount + 1, // Adjust post count
                }
              : folder,
          ),
        );
      }
    } catch (error) {
      console.error('Error during scrap action', error);
    }
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

            {/* Scrap button */}
            <S.ScrapButton
              onClick={() => handleScrapClick(folder.id, folder.name)}
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
