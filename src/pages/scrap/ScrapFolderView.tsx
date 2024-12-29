import React, { useState, useEffect } from 'react';
import * as S from './ScrapFolderView.Styled';
import ScrapOption from '@assets/svgs/scrapOption.svg'
import ScrapOptionDropdown from '@assets/svgs/scrapOptionDropdown.svg'
import DeleteWhite from '@assets/svgs/DeleteWhite.svg'
import EditWhite from '@assets/svgs/EditWhite.svg'
import ScrapCard from '../../components/scrap/ScrapFolder';
import { useNavigate } from 'react-router-dom';
import newScrapFolder from '@assets/svgs/newScrapFolder.svg'
import plusSign from '@assets/pngs/plusSign.png'
import NewScrapFolderSelected from '@assets/svgs/newScrapFolderSelected.svg';
import axiosInstance from '@api/axios';
import Editor from '@components/mypage/Editor/Editor';

interface ScrapFolderViewProps {
  type: 'category' | 'personal';
  categories: Array<{ name: string; count: string; id?: number }>;
}

const ScrapFolderView: React.FC<ScrapFolderViewProps> = ({ type, categories: initialCategories }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [isNewFolderHovered, setIsNewFolderHovered] = useState(false);
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const handleFolderDelete = (indexToDelete: number) => {
    setCategories(prevCategories => 
      prevCategories.filter((_, index) => index !== indexToDelete)
    );
    setIsDeleteMode(false);
  };

  const handleFolderClick = (index: number) => {
    setSelectedCategory(index);
    const category = categories[index];
    const normalizedName = category.name.replace(/ /g, '');
    const encodedName = encodeURIComponent(normalizedName);
    
    console.log('폴더 클릭:', {
      index,
      category,
      normalizedName,
      encodedName,
      type,
      categoryId: category.id
    });
    
    navigate(`/scrap/${type}/${encodedName}`, { 
      state: { 
        type,
        originalName: category.name,
        categoryId: category.id
      }
    });
  };

  const handleCreateNewFolder = async () => {
    try {
      const response = await axiosInstance.post('/folder', {
        folder_name: newFolderName
      });

      const newFolder = {
        name: response.data.folderName,
        count: '0',
        id: response.data.id
      };

      setCategories(prev => [...prev, newFolder]);
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

  return (
    <S.Container>
      {type === 'personal' && (
        <S.OptionHeaderContainer>
          <S.ScrapOption onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <S.ScrapOptionIcon src={ScrapOption} alt="scrapOption" />
            {isDropdownOpen && (
              <S.DropdownMenu>
                <S.DropdownIcon src={ScrapOptionDropdown} alt="dropdown" />
                <S.IconLeft>
                  <S.IconButton onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick();
                  }}>
                    <S.Icon src={DeleteWhite} alt="delete" />
                  </S.IconButton>
                </S.IconLeft>
                <S.IconRight>
                  <S.IconButton>
                    <S.Icon src={EditWhite} alt="edit" />
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
            onClick={() => handleFolderClick(index)}
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
              alt="new folder" 
            />
            <S.PlusIcon src={plusSign} alt="create new folder" />
          </S.NewFolderCard>
        )}
      </S.FoldersContainer>
      
      {isCreateModalOpen && (
        <Editor title="새 서랍 생성하기" onClose={() => setIsCreateModalOpen(false)}>
          <S.EditorBar />
          <S.EditorContainer>
            <S.InputBox>
              <S.EditorInput
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                maxLength={12}
                placeholder="제목을 입력하세요"
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