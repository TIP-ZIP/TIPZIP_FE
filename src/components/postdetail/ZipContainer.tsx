import React, { useEffect, useState } from 'react';
import * as S from './zipcontainer.styled';
import axiosInstance from '@api/axios';
import Editor from '@components/mypage/editor/Editor';
import * as E from '@pages/scrap/scrapfolderview.styled';

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
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [showEditor, setShowEditor] = useState(false);

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

  const handleCreateNewFolder = async () => {
    try {
      const response = await axiosInstance.post('/folder', {
        folder_name: newFolderName,
      });

      const newFolder: Folder = {
        id: response.data.id,
        name: response.data.folderName,
        postCount: 0,
        isScrapped: false,
      };

      setFolders((prevFolders) => [...prevFolders, newFolder]);
      setNewFolderName('');
      setShowEditor(false);
    } catch (error) {
      console.error('폴더 생성 실패:', error);
      alert('폴더 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <S.ZipContainer>
        <S.ZipBar>
          <S.ZipMessage>스크랩 ZIP</S.ZipMessage>
          <S.Addbtn onClick={() => setShowEditor(true)}>추가하기</S.Addbtn>
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
      {showEditor && (
        <Editor
          title='새 서랍 생성하기'
          onClose={() => {
            handleCreateNewFolder(); // 폴더 생성 함수 호출
            setShowEditor(false); // 에디터 닫기
          }}
        >
          <E.EditorBar />
          <E.EditorContainer>
            <E.InputBox>
              <E.EditorInput
                type='text'
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                maxLength={130}
                placeholder='제목을 입력하세요'
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateNewFolder();
                  }
                }}
              />
              <E.CharCount>{newFolderName.length}/130</E.CharCount>
            </E.InputBox>
          </E.EditorContainer>
        </Editor>
      )}
    </>
  );
};

export default ZipContainer;
