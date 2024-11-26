import React from 'react';
import * as S from '../../pages/scrap/ScrapFolder.Styled';
import PersonalScrapFolderImage from '@assets/svgs/personalScrapFolder.svg';
import ScrapFolderImage from '@assets/svgs/scrapFolder.svg';
import ColoredBookmark from '@assets/svgs/ColoredBookmark.svg';
import ScrapDelete from '@assets/svgs/ScrapDelete.svg';

interface ScrapFolderProps {
  name: string;
  count: string;
  type: 'personal' | 'category';
  onClick: () => void;
}

const ScrapFolder: React.FC<ScrapFolderProps> = ({ name, count, type, onClick }) => {
  return (
    <S.CategoryFolder onClick={onClick}>
      {type === 'personal' && (
        <S.DeleteIcon src={ScrapDelete} alt="delete" />
      )}
      <S.FolderBackground 
        src={type === 'personal' ? PersonalScrapFolderImage : ScrapFolderImage} 
        alt="folder" 
      />
      <S.FolderName>{name}</S.FolderName>
      <S.Badge>
        <S.BadgeIcon src={ColoredBookmark} alt="badge" />
        <S.BadgeText>{count}</S.BadgeText>
      </S.Badge>
    </S.CategoryFolder>
  );
};

export default ScrapFolder; 