import React from 'react';
import * as S from './CategoryScrap.Styled';
import ScrapFolder from '../../assets/svgs/scrapFolder.svg';
import ColoredBookmark from '../../assets/svgs/ColoredBookmark.svg';

const dummyCategories = [
    { name: '로컬', count: '30' },
    { name: '주방', count: '31' },
    { name: '건강', count: '12' },
    { name: '건강', count: '41' },
    { name: '기타', count: '30' },
    { name: '정리 / 공간 활용', count: '13' },
    { name: '청소', count: '52' },
    { name: '청소', count: '40' },
    { name: '여가 & 휴식', count: '55' },
];

const CategoryScrap: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);

    return (
        <S.CategoriesContainer>
        {dummyCategories.map((category, index) => (
            <S.CategoryCard
            key={index}
            onClick={() => setSelectedCategory(index)}
            >
            <S.CardBackground src={ScrapFolder} alt="folder" />
            <S.CategoryName>{category.name}</S.CategoryName>
            <S.Badge>
                <S.BadgeIcon src={ColoredBookmark} alt="badge" />
                <S.BadgeText>{category.count}</S.BadgeText>
            </S.Badge>
            </S.CategoryCard>
        ))}
        </S.CategoriesContainer>
    );
};

export default CategoryScrap; 