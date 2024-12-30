import React, { useState, useEffect } from 'react';
import * as S from './ScrapFolderView.Styled';
import ScrapOption from '@assets/svgs/scrapOption.svg';
import ScrapOptionDropdown from '@assets/svgs/scrapOptionDropdown.svg';
import DeleteWhite from '@assets/svgs/DeleteWhite.svg';
import EditWhite from '@assets/svgs/EditWhite.svg';
import ScrapCard from '../../components/scrap/ScrapFolder';
import { useNavigate } from 'react-router-dom';
import newScrapFolder from '@assets/svgs/newScrapFolder.svg';
import plusSign from '@assets/pngs/plusSign.png';
import NewScrapFolderSelected from '@assets/svgs/newScrapFolderSelected.svg';
import axiosInstance from '@api/axios';
import Editor from '@components/mypage/Editor/Editor';

interface ScrapFolderViewProps {
  type: 'category' | 'personal';
  categories: Array<{ name: string; count: string; id?: number }>;
}

interface MyPostDTO {
  post_id: number;
  title: string;
  scrap: boolean;
  scrapCount: number;
  thumbnail_url: string;
}

const ScrapFolderView: React.FC<ScrapFolderViewProps> = ({
  type,
  categories: initialCategories,
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [isNewFolderHovered, setIsNewFolderHovered] = useState(false);
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [editFolderName, setEditFolderName] = useState<string>('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const handleDeleteClick = () => {
    if (isDeleteMode) {
      setIsDeleteMode(false);
    } else {
      setIsDeleteMode(true);
    }
    setIsDropdownOpen(false);
  };

  const handleFolderDelete = async (indexToDelete: number) => {
    try {
      const folderToDelete = categories[indexToDelete];

      if (!folderToDelete.id) {
        console.error('폴더 ID가 없습니다.');
        return;
      }

      // DELETE 요청 보내기
      await axiosInstance.delete(`/folder/${folderToDelete.id}`);

      // 성공적으로 삭제되면 로컬 상태 업데이트
      setCategories((prevCategories) =>
        prevCategories.filter((_, index) => index !== indexToDelete),
      );
      setIsDeleteMode(false);
    } catch (error) {
      console.error('폴더 삭제 실패:', error);
      alert('폴더 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleFolderClick = async (index: number) => {
    setSelectedCategory(index);
    const category = categories[index];

    try {
      let response;

      if (type === 'category') {
        // 카테고리 ID 매핑 사용
        const categoryId = CATEGORY_IDS[category.name as keyof typeof CATEGORY_IDS];
        const encodedCategoryName = encodeURIComponent(category.name);

        // 카테고리 폴더 조회
        response = await axiosInstance.get<MyPostDTO[]>(`/scrap/category/${categoryId}`);
        navigate(`/scrap/category/${encodedCategoryName}`, {
          state: {
            type,
            originalName: category.name,
            categoryId: categoryId,
            posts: response.data,
          },
        });
      } else {
        // 나만의 폴더 조회 시 폴더 이름 로깅
        console.log('요청하는 폴더 이름:', category.name);

        response = await axiosInstance.post<MyPostDTO[]>('/scrap/folder', {
          folder_name: category.name,
        });

        navigate(`/scrap/folder/${category.name}`, {
          state: {
            type,
            originalName: category.name,
            folderId: category.id,
            posts: response.data,
          },
        });
      }
    } catch (error) {
      console.error('폴더 내용 조회 실패:', error);
    }
  };

  const handleCreateNewFolder = async () => {
    try {
      const response = await axiosInstance.post('/folder', {
        folder_name: newFolderName,
      });

      const newFolder = {
        name: response.data.folderName,
        count: '0',
        id: response.data.id,
      };

      setCategories((prev) => [...prev, newFolder]);
      setNewFolderName('');
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('폴더 생성 실패:', error);
      alert('폴더 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setIsDropdownOpen(false);
  };

  const openEditModal = (folderId: number, currentName: string) => {
    setSelectedFolderId(folderId);
    setEditFolderName(currentName);
    setIsEditModalOpen(true);
  };

  const handleEditFolder = async () => {
    if (!selectedFolderId) {
      console.log('선택된 폴더 ID가 없습니다.');
      return;
    }

    if (!editFolderName) {
      console.log('수정할 폴더 이름이 비어있습니다.');
      return;
    }

    try {
      const response = await axiosInstance.put(`/folder/${selectedFolderId}`, {
        folder_name: editFolderName,
      });

      console.log('서버 응답:', response);

      // 로컬 상태 업데이트
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === selectedFolderId
            ? { ...category, name: response.data.folder_name }
            : category,
        ),
      );

      setIsEditModalOpen(false);
      setEditFolderName('');
      setSelectedFolderId(null);
      setIsEditMode(false);
    } catch (error) {
      console.error('폴더 이름 변경 실패:', error);
      alert('폴더 이름 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 카테고리 ID 매핑
  const CATEGORY_IDS = {
    '정리/공간 활용': 1,
    주방: 2,
    청소: 3,
    건강: 4,
    IT: 5,
    '뷰티&패션': 6,
    '여가&휴식': 7,
    로컬: 8,
    기타: 9,
  } as const;

  return (
    <S.Container>
      {type === 'personal' && (
        <S.OptionHeaderContainer>
          <S.ScrapOption onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <S.ScrapOptionIcon src={ScrapOption} alt='scrapOption' />
            {isDropdownOpen && (
              <S.DropdownMenu>
                <S.DropdownIcon src={ScrapOptionDropdown} alt='dropdown' />
                <S.IconLeft>
                  <S.IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick();
                    }}
                  >
                    <S.Icon src={DeleteWhite} alt='delete' />
                  </S.IconButton>
                </S.IconLeft>
                <S.IconRight>
                  <S.IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick();
                    }}
                  >
                    <S.Icon src={EditWhite} alt='edit' />
                  </S.IconButton>
                </S.IconRight>
              </S.DropdownMenu>
            )}
          </S.ScrapOption>
        </S.OptionHeaderContainer>
      )}

      <S.FoldersContainer type={type}>
        {categories.map((category, index) => (
          <ScrapCard
            key={index}
            name={category.name}
            count={category.count}
            type={type}
            onClick={() =>
              isEditMode ? openEditModal(category.id!, category.name) : handleFolderClick(index)
            }
            isDeleteMode={isDeleteMode}
            onDelete={() => handleFolderDelete(index)}
          />
        ))}
        {type === 'personal' && (
          <S.NewFolderCard
            onClick={openCreateModal}
            onMouseEnter={() => setIsNewFolderHovered(true)}
            onMouseLeave={() => setIsNewFolderHovered(false)}
          >
            <S.NewFolderBackground
              src={isNewFolderHovered ? NewScrapFolderSelected : newScrapFolder}
              alt='new folder'
            />
            <S.PlusIcon src={plusSign} alt='create new folder' />
          </S.NewFolderCard>
        )}
      </S.FoldersContainer>

      {isEditModalOpen && (
        <Editor title='서랍 이름 바꾸기' onClose={() => setIsEditModalOpen(false)}>
          <S.EditorBar />
          <S.EditorContainer>
            <S.InputBox>
              <S.EditorInput
                type='text'
                value={editFolderName}
                onChange={(e) => setEditFolderName(e.target.value)}
                maxLength={130}
                placeholder='새로운 이름을 입력하세요'
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleEditFolder();
                  }
                }}
              />
              <S.CharCount>{editFolderName.length}/130</S.CharCount>
            </S.InputBox>
          </S.EditorContainer>
        </Editor>
      )}

      {isCreateModalOpen && (
        <Editor title='새 서랍 생성하기' onClose={() => setIsCreateModalOpen(false)}>
          <S.EditorBar />
          <S.EditorContainer>
            <S.InputBox>
              <S.EditorInput
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
              <S.CharCount>{newFolderName.length}/130</S.CharCount>
            </S.InputBox>
          </S.EditorContainer>
        </Editor>
      )}
    </S.Container>
  );
};

export default ScrapFolderView;
