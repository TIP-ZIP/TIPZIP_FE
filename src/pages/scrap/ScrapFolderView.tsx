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

interface ScrapFolderViewProps {
  type: 'category' | 'personal';
  categories: Array<{ name: string; count: string }>;
}

const ScrapFolderView: React.FC<ScrapFolderViewProps> = ({ type, categories: initialCategories }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [isNewFolderHovered, setIsNewFolderHovered] = useState(false);

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
    navigate(`/scrap/${type}/${categories[index].name}`);
  };

  const handleCreateNewFolder = () => {
    console.log('Create new folder');
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
            onClick={handleCreateNewFolder}
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
    </S.Container>
  );
};

export default ScrapFolderView; 