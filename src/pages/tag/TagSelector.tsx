import React from 'react';
import styled from 'styled-components';
import { colors } from '@styles/theme/colors';
import PostHeader from '@components/header/PostHeader';
import { useNavigate, useLocation } from 'react-router-dom';


    interface TagProps {
    selected?: boolean;
    selectable?: boolean;
    }

    interface CategoryTitleProps {
        selectable?: boolean;
    }

    const Container = styled.div`
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    padding: 1rem 1rem;
    background-color: ${colors.TZ_Monochrome[0]};
    `;

    const CategoryTitle = styled.h2<CategoryTitleProps>`
    font-size: ${({ theme }) => theme.fontStyles.Body4};
    font-weight: 500;
    color: ${props => 
        props.selectable ? 
        colors.TZ_Monochrome[1000] : 
        colors.TZ_Monochrome[300]
    };
    margin: 1.5rem 0 0.75rem;
    `;

    const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    `;

    const Form = styled.form`
    display: flex;
    flex-direction: column;
    `;

    const Tag = styled.div<TagProps>`
    
    padding: 0.5rem 0.625rem;
    border-radius: 4px;
    background-color: ${props => 
        props.selected ? '#FF4B4B' : 
        !props.selectable ? colors.TZ_Monochrome[0] :
        colors.TZ_Monochrome[0]
    };
    color: ${props => 
        props.selected ? colors.TZ_Monochrome[0] : 
        !props.selectable ? colors.TZ_Monochrome[300] :
        colors.TZ_Signature[500]
    };
    border: 0.6px solid ${props => 
        props.selected ? 'none' : 
        !props.selectable ? colors.TZ_Monochrome[300] :
        colors.TZ_Signature[500]
    };
    font-size: ${({ theme }) => theme.fontStyles.Caption8};
    display: flex;
    align-items: center;
    cursor: ${props => props.selectable ? 'pointer' : 'default'};
    opacity: ${props => props.selectable ? 1 : 0.5};
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
        background-color: ${props => props.selected ? '#FF4B4B' : '#f8f8f8'};
    }
    `;

    const TagSelector: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = location.state?.selectedCategory;
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

    // 카테고리별 태그 매핑
    const categoryTags: { [key: string]: string[] } = {
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

    const handleTagClick = (tag: string) => {
        // 선택된 카테고리의 태그인 경우에만 선택 가능
        if (selectedCategory && !categoryTags[selectedCategory].includes(tag)) {
            return;
        }

        const isSelected = selectedTags.includes(tag);
        if (isSelected) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    // 태그가 선택 가능한지 확인하는 함수
    const isTagSelectable = (tag: string) => {
        if (!selectedCategory) return true;
        return categoryTags[selectedCategory].includes(tag);
    };

    const handleSave = () => {
        // 선택된 태그 저장 로직 구현
        console.log('Selected Tags:', selectedTags);
    };

    // 카테고리가 선택 가능한지 확인하는 함수
    const isCategorySelectable = (category: string) => {
        if (!selectedCategory) return true;
        return category === selectedCategory;
    };

    const renderTags = (category: string) => {
        return categoryTags[category].map((tag) => (
            <Tag
                key={tag}
                selected={selectedTags.includes(tag)}
                selectable={isTagSelectable(tag)}
                onClick={() => handleTagClick(tag)}
            >
                {tag}
            </Tag>
        ));
    };

    return (
        <Container>
            <PostHeader 
                title="태그 선택" 
                onBackClick={() => navigate('/post/new')} 
            />
            <Form>
                {Object.keys(categoryTags).map((category) => (
                    <section key={category}>
                        <CategoryTitle selectable={isCategorySelectable(category)}>
                            {category}
                        </CategoryTitle>
                        <TagList>
                            {renderTags(category)}
                        </TagList>
                    </section>
                ))}
                <StyledSubmitButton onClick={handleSave}>저장</StyledSubmitButton>
            </Form>
        </Container>
    );
};

const StyledSubmitButton = styled.button`
    height: 2.75rem;
    border: none;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.TZ_Monochrome[300]};
    color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
    font-size: ${({ theme }) => theme.fontStyles.Body1};
    cursor: pointer;
    margin: 2rem 0;

    &:active {
        opacity: 0.8;
    }
`;

export default TagSelector;