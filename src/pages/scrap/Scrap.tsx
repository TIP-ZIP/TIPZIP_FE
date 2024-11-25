import React from 'react';
import * as Styled from './Scrap.Styled';
import CategoryScrap from './CategoryScrap';
import MyScrap from './MyScrap';

const Scrap: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'category' | 'personal'>('category');

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>스크랩 ZIP</Styled.Title>
        <Styled.TabContainer>
          <Styled.TabBackground />
          <Styled.ActiveTab isPersonal={activeTab === 'personal'} />
          <Styled.TabTextActive
            onClick={() => setActiveTab('category')}
            isActive={activeTab === 'category'}
          >
            카테고리 스크랩
          </Styled.TabTextActive>
          <Styled.TabTextInactive
            onClick={() => setActiveTab('personal')}
            isActive={activeTab === 'personal'}
          >
            나만의 스크랩
          </Styled.TabTextInactive>
        </Styled.TabContainer>
      </Styled.Header>
      
      {activeTab === 'category' ? <CategoryScrap /> : <MyScrap />}
    </Styled.Container>
  );
};

export default Scrap;
