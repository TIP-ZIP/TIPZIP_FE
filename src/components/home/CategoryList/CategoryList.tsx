import React from 'react';
import * as S from './CategoryList.Styled';

interface CategoryListProps {
  $maxWidth?: string;
  categories: string[];
  selectedCategory: string[];
  handleCategoryClick: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  handleCategoryClick,
  $maxWidth,
}) => {
  return (
    <S.CategoryList $maxWidth={$maxWidth}>
      {categories.map((category, index) => (
        <S.CategoryItem
          key={index}
          $selectedtag={selectedCategory.includes(category)}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </S.CategoryItem>
      ))}
    </S.CategoryList>
  );
};

export default CategoryList;
