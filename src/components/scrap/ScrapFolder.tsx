import React, { useState } from 'react';
import * as S from './ScrapFolder.Styled';
import PersonalScrapFolderImage from '@assets/svgs/personalScrapFolder.svg';
import ScrapFolderImage from '@assets/svgs/scrapFolder.svg';
import ColoredBookmark from '@assets/svgs/ColoredBookmark.svg';
import ScrapDelete from '@assets/svgs/ScrapDelete.svg';
import PersonalScrapFolderSelected from '@assets/svgs/personalScrapFolderSelected.svg';
import ScrapFolderSelected from '@assets/svgs/scrapFolderSelected.svg';
import NewScrapFolderSelected from '@assets/svgs/newScrapFolderSelected.svg';

interface ScrapFolderProps {
  name: string;
  count: string;
  type: 'personal' | 'category';
  onClick: () => void;
  isDeleteMode?: boolean;
  onDelete?: () => void;
}

const ScrapFolder: React.FC<ScrapFolderProps> = ({
  name,
  count,
  type,
  onClick,
  isDeleteMode = false,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getFolderImage = () => {
    if (type === 'personal') {
      return isHovered ? PersonalScrapFolderSelected : PersonalScrapFolderImage;
    }
    return isHovered ? ScrapFolderSelected : ScrapFolderImage;
  };

  return (
    <S.CategoryFolder
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {type === 'personal' && isDeleteMode && (
        <S.DeleteIcon
          src={ScrapDelete}
          alt='delete'
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        />
      )}
      <S.FolderBackground src={getFolderImage()} alt='folder' />
      <S.FolderName>{name}</S.FolderName>
      <S.Badge>
        <S.BadgeIcon src={ColoredBookmark} alt='badge' />
        <S.BadgeText>{count}</S.BadgeText>
      </S.Badge>
    </S.CategoryFolder>
  );
};

export default ScrapFolder;
