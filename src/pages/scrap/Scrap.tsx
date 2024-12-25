import React from 'react';
import * as Styled from './Scrap.Styled';
import ScrapFolderView from './ScrapFolderView';

const categoryDummyData = [
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

const personalDummyData = [
  { name: '갓생 살기', count: '13' },
  { name: '아기 사자의 하루', count: '13' },
  { name: '멋쟁이 사자처럼!', count: '13' },
];

const Scrap: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'category' | 'personal'>('category');

  return (
    <Styled.Container>
      <Styled.Header isPersonal={activeTab === 'personal'}>
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
      
      <ScrapFolderView 
        type={activeTab}
        categories={activeTab === 'category' ? categoryDummyData : personalDummyData}
      />
    </Styled.Container>
  );
};

export default Scrap;
