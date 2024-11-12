import React from 'react';
import * as S from '@pages/home/Home.Styled';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string[];
  handleCategoryClick: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  handleCategoryClick,
}) => {
  return (
    <S.CategoryList>
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
