import React, { useState } from 'react';
import * as S from './MyScrap.Styled';
import PersonalScrapFolder from '@assets/svgs/personalScrapFolder.svg'
import ColoredBookmark from '@assets/svgs/ColoredBookmark.svg'
import ScrapOption from '@assets/svgs/scrapOption.svg'
import ScrapOptionDropdown from '@assets/svgs/scrapOptionDropdown.svg'
import DeleteWhite from '@assets/svgs/DeleteWhite.svg'
import EditWhite from '@assets/svgs/EditWhite.svg'
import ScrapDelete from '@assets/svgs/ScrapDelete.svg'

const dummyCategories = [
    { name: '갓생 살기', count: '13' },
    { name: '아기 사자의 하루', count: '13' },
    { name: '멋쟁이 사자처럼!', count: '13' },
];

const MyScrap: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <S.Container>
            <S.OptionHeaderContainer>
                <S.ScrapOption onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <S.ScrapOptionIcon src={ScrapOption} alt="scrapOption" />
                    {isDropdownOpen && (
                        <S.DropdownMenu>
                            <S.DropdownIcon src={ScrapOptionDropdown} alt="dropdown" />
                            <S.IconLeft>
                                <S.IconButton>
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
            
            <S.PersonalContainer>
                {dummyCategories.map((category, index) => (
                    <S.CategoryCard
                    key={index}
                    onClick={() => setSelectedCategory(index)}
                    >
                    <S.DeleteIcon src={ScrapDelete} alt="delete" />
                    <S.CardBackground src={PersonalScrapFolder} alt="folder" />
                    <S.CategoryName>{category.name}</S.CategoryName>
                    <S.Badge>
                        <S.BadgeIcon src={ColoredBookmark} alt="badge" />
                        <S.BadgeText>{category.count}</S.BadgeText>
                    </S.Badge>
                    </S.CategoryCard>
                ))}
            </S.PersonalContainer>
        </S.Container>
    );
};

export default MyScrap; 