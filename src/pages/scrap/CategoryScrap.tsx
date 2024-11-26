import React from 'react';
import * as S from './CategoryScrap.Styled';
import ScrapCard from './ScrapFolder';

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
                <ScrapCard
                    key={index}
                    name={category.name}
                    count={category.count}
                    type="category"
                    onClick={() => setSelectedCategory(index)}
                />
            ))}
        </S.CategoriesContainer>
    );
};

export default CategoryScrap; 