import React from 'react';
import * as Styled from './Scrap.Styled';
import ScrapFolder from '../../assets/svgs/scrapFolder.svg';
import ColoredBookmark from '../../assets/svgs/ColoredBookmark.svg';

const categories = [
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

const Scrap: React.FC = () => {
  return (
    <Styled.Container>
      {/* Header */}
      <Styled.Header>
        <Styled.Title>스크랩 ZIP</Styled.Title>
        <Styled.TabContainer>
          <Styled.TabBackground />
          <Styled.ActiveTab />
          <Styled.TabTextActive>카테고리 스크랩</Styled.TabTextActive>
          <Styled.TabTextInactive>나만의 스크랩</Styled.TabTextInactive>
        </Styled.TabContainer>
      </Styled.Header>

      {/* Categories */}
      <Styled.CategoriesContainer>
        {categories.map((category, index) => (
          <Styled.CategoryCard key={index}>
            <Styled.CardBackground src={ScrapFolder} alt="folder" />
            <Styled.CategoryName>{category.name}</Styled.CategoryName>
            <Styled.Badge>
              <Styled.BadgeIcon src={ColoredBookmark} alt="badge" />
              <Styled.BadgeText>{category.count}</Styled.BadgeText>
            </Styled.Badge>
          </Styled.CategoryCard>
        ))}
      </Styled.CategoriesContainer>
    </Styled.Container>
  );
};

export default Scrap;
