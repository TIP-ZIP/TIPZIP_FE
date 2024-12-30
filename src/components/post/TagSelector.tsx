import React from 'react';
import { AnimatePresence } from 'framer-motion';
import * as S from './tagselector.styled';
import { CATEGORIES } from '@constants/TagData';
import { CATEGORY_TAGS } from '@constants/TagData';

interface TagSelectorProps {
  category: string;
  tags: string[];
  showTags: boolean;
  onCategorySelect: (category: string) => void;
  onTagSelect: (tag: string) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  category,
  tags,
  showTags,
  onCategorySelect,
  onTagSelect,
}) => {
  const handleCategoryClick = (selectedCategory: string) => {
    if (category === selectedCategory) {
      // 같은 카테고리를 클릭하면 토글
      onCategorySelect('');
    } else {
      // 다른 카테고리를 클릭하면 해당 카테고리로 변경
      onCategorySelect(selectedCategory);
    }
  };

  return (
    <>
      <S.CategorySelector $showTags={showTags} $category={category}>
        {CATEGORIES.map((cat) => (
          <S.CategoryChip
            key={cat}
            $active={category === cat}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </S.CategoryChip>
        ))}
      </S.CategorySelector>

      <AnimatePresence mode='wait'>
        {showTags && category && (
          <S.TagContainer
            key={category}
            initial={{ opacity: 0, y: -20 }} // y값 추가
            animate={{ opacity: 1, y: 0 }} // height 대신 y 사용
            exit={{ opacity: 0, y: -20 }} // 슬라이드 업 효과
            transition={{
              duration: 0.2, // 전체 duration 단순화
              ease: 'easeInOut', // 부드러운 이징 적용
            }}
          >
            <S.TagList>
              {CATEGORY_TAGS[category]?.map((tag) => (
                <S.TagChip key={tag} $active={tags.includes(tag)} onClick={() => onTagSelect(tag)}>
                  {tag}
                </S.TagChip>
              ))}
            </S.TagList>
          </S.TagContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default TagSelector;
