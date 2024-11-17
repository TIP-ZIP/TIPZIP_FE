import React from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  CategorySelector,
  CategoryChip,
  TagContainer,
  TagList,
  TagChip
} from './TagSelector.styled';

interface TagSelectorProps {
  category: string;
  tags: string[];
  showTags: boolean;
  onCategorySelect: (category: string) => void;
  onTagSelect: (tag: string) => void;
}

const CATEGORIES = [
  '정리/공간 활용',
  '주방',
  '청소',
  '건강',
  'IT',
  '뷰티&패션',
  '로컬',
  '여가&휴식',
  '기타',
];

const CATEGORY_TAGS: { [key: string]: string[] } = {
  '정리/공간 활용': ['#못질', '#서랍 정돈', '#신발 활용', '#가구', '#수납', '#방', '#원칙', '#케이블 정리', '#제활용'],
  '주방': ['#키친 소품', '#재료 보관', '#냉장고', '#조리대 도구', '#생활고', '#주방 가구', '#주방 정돈', '#간단 요리'],
  '청소': ['#욕실', '#청리', '#곰팡이', '#배수구', '#방지', '#부분청소', '#청소기', '#세탁/건조기'],
  '건강': ['#운동', '#병원', '#다이어트', '#휴식', '#수면', '#피부', '#생활패턴', '#응급상황'],
  'IT': ['#아이폰', '#안드로이드', '#윈도우', '#맥북', '#알고리즘', '#애플/프로그램', '#인터넷', '#컴퓨터', '#앱개발'],
  '뷰티&패션': ['#피부', '#메이크업', '#패션', '#베이직한', '#향수', '#코디', '#악세서리', '#화장대', '#쇼핑 정보'],
  '여가&휴식': ['#DIY', '#취미', '#운동', '#독서', '#홈 가드닝', '#영화', '#OTT', '#자기계발'],
  '로컬': ['#동네 맛집', '#맛집 리뷰', '#로드맛집', '#맛집 명소', '#서울맛', '#지역 맛집'],
  '기타': ['#라이프', '#운동']
};

const TagSelector: React.FC<TagSelectorProps> = ({
  category,
  tags,
  showTags,
  onCategorySelect,
  onTagSelect
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
      <CategorySelector $showTags={showTags} $category={category}>
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat}
            $active={category === cat}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </CategoryChip>
        ))}
      </CategorySelector>
      
      <AnimatePresence mode="wait">
        {showTags && category && (
          <TagContainer
            key={category}
            initial={{ opacity: 0, y: -20 }}  // y값 추가
            animate={{ opacity: 1, y: 0 }}    // height 대신 y 사용
            exit={{ opacity: 0, y: -20 }}     // 슬라이드 업 효과
            transition={{ 
              duration: 0.2,                  // 전체 duration 단순화
              ease: "easeInOut"              // 부드러운 이징 적용
            }}
          >
            <TagList>
              {CATEGORY_TAGS[category]?.map((tag) => (
                <TagChip
                  key={tag}
                  $active={tags.includes(tag)}
                  onClick={() => onTagSelect(tag)}
                >
                  {tag}
                </TagChip>
              ))}
            </TagList>
          </TagContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default TagSelector;