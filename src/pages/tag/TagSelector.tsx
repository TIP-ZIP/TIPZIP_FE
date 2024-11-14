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

    return (
        <Container>
            <PostHeader 
                title="태그 선택" 
                onBackClick={() => navigate('/post/new')} 
            />

            <Form>
                <section>
                    <CategoryTitle selectable={isCategorySelectable('정리/공간 활용')}>
                        정리/공간 활용
                    </CategoryTitle>
                    <TagList>
                        <Tag 
                            selected={selectedTags.includes('#못질')}
                            selectable={isTagSelectable('#못질')}
                            onClick={() => handleTagClick('#못질')}
                        >
                            #못질
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#서랍 정돈')}
                            selectable={isTagSelectable('#서랍 정돈')}
                            onClick={() => handleTagClick('#서랍 정돈')}
                        >
                            #서랍 정돈
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#신발 활용')}
                            selectable={isTagSelectable('#신발 활용')}
                            onClick={() => handleTagClick('#신발 활용')}
                        >
                            #신발 활용
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#가구')}
                            selectable={isTagSelectable('#가구')}
                            onClick={() => handleTagClick('#가구')}
                        >
                            #가구
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#수납')}
                            selectable={isTagSelectable('#수납')}
                            onClick={() => handleTagClick('#수납')}
                        >
                            #수납
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#방')}
                            selectable={isTagSelectable('#방')}
                            onClick={() => handleTagClick('#방')}
                        >
                            #방
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#원칙')}
                            selectable={isTagSelectable('#원칙')}
                            onClick={() => handleTagClick('#원칙')}
                        >
                            #원칙
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#케이블 정리')}
                            selectable={isTagSelectable('#케이블 정리')}
                            onClick={() => handleTagClick('#케이블 정리')}
                        >
                            #케이블 정리
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#제활용')}
                            selectable={isTagSelectable('#제활용')}
                            onClick={() => handleTagClick('#제활용')}
                        >
                            #제활용
                        </Tag>
                    </TagList>
                </section>

                <section>
                    <CategoryTitle selectable={isCategorySelectable('주방')}>
                        주방
                    </CategoryTitle>
                    <TagList>
                        <Tag 
                            selected={selectedTags.includes('#키친 소품')}
                            selectable={isTagSelectable('#키친 소품')}
                            onClick={() => handleTagClick('#키친 소품')}
                        >
                            #키친 소품
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#재료 보관')}
                            selectable={isTagSelectable('#재료 보관')}
                            onClick={() => handleTagClick('#재료 보관')}
                        >
                            #재료 보관
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#냉장고')}
                            selectable={isTagSelectable('#냉장고')}
                            onClick={() => handleTagClick('#냉장고')}
                        >
                            #냉장고
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#조리대 도구')}
                            selectable={isTagSelectable('#조리대 도구')}
                            onClick={() => handleTagClick('#조리대 도구')}
                        >
                            #조리대 도구
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#생활고')}
                            selectable={isTagSelectable('#생활고')}
                            onClick={() => handleTagClick('#생활고')}
                        >
                            #생활고
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#주방 가구')}
                            selectable={isTagSelectable('#주방 가구')}
                            onClick={() => handleTagClick('#주방 가구')}
                        >
                            #주방 가구
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#주방 정돈')}
                            selectable={isTagSelectable('#주방 정돈')}
                            onClick={() => handleTagClick('#주방 정돈')}
                        >
                            #주방 정돈
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#간단 요리')}
                            selectable={isTagSelectable('#간단 요리')}
                            onClick={() => handleTagClick('#간단 요리')}
                        >
                            #간단 요리
                        </Tag>
                    </TagList>
                </section>

                <section>
                    <CategoryTitle selectable={isCategorySelectable('청소')}>
                        청소
                    </CategoryTitle>
                    <TagList>
                        <Tag 
                            selected={selectedTags.includes('#욕실')}
                            selectable={isTagSelectable('#욕실')}
                            onClick={() => handleTagClick('#욕실')}
                        >
                            #욕실
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#청리')}
                            selectable={isTagSelectable('#청리')}
                            onClick={() => handleTagClick('#청리')}
                        >
                            #청리
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#곰팡이')}
                            selectable={isTagSelectable('#곰팡이')}
                            onClick={() => handleTagClick('#곰팡이')}
                        >
                            #곰팡이
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#배수구')}
                            selectable={isTagSelectable('#배수구')}
                            onClick={() => handleTagClick('#배수구')}
                        >
                            #배수구
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#방지')}
                            selectable={isTagSelectable('#방지')}
                            onClick={() => handleTagClick('#방지')}
                        >
                            #방지
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#부분청소')}
                            selectable={isTagSelectable('#부분청소')}
                            onClick={() => handleTagClick('#부분청소')}
                        >
                            #부분청소
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#청소기')}
                            selectable={isTagSelectable('#청소기')}
                            onClick={() => handleTagClick('#청소기')}
                        >
                            #청소기
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#세탁/건조기')}
                            selectable={isTagSelectable('#세탁/건조기')}
                            onClick={() => handleTagClick('#세탁/건조기')}
                        >
                            #세탁/건조기
                        </Tag>
                    </TagList>
                </section>

                <section>
                    <CategoryTitle selectable={isCategorySelectable('건강')}>
                        건강
                    </CategoryTitle>
                    <TagList>
                        <Tag 
                            selected={selectedTags.includes('#운동')}
                            selectable={isTagSelectable('#운동')}
                            onClick={() => handleTagClick('#운동')}
                        >
                            #운동
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#병원')}
                            selectable={isTagSelectable('#병원')}
                            onClick={() => handleTagClick('#병원')}
                        >
                            #병원
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#다이어트')}
                            selectable={isTagSelectable('#다이어트')}
                            onClick={() => handleTagClick('#다이어트')}
                        >
                            #다이어트
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#휴식')}
                            selectable={isTagSelectable('#휴식')}
                            onClick={() => handleTagClick('#휴식')}
                        >
                            #휴식
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#수면')}
                            selectable={isTagSelectable('#수면')}
                            onClick={() => handleTagClick('#수면')}
                        >
                            #수면
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#피부')}
                            selectable={isTagSelectable('#피부')}
                            onClick={() => handleTagClick('#피부')}
                        >
                            #피부
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#생활패턴')}
                            selectable={isTagSelectable('#생활패턴')}
                            onClick={() => handleTagClick('#생활패턴')}
                        >
                            #생활패턴
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#응급상황')}
                            selectable={isTagSelectable('#응급상황')}
                            onClick={() => handleTagClick('#응급상황')}
                        >
                            #응급상황
                        </Tag>
                    </TagList>
                </section>

                <section>
                    <CategoryTitle selectable={isCategorySelectable('IT')}>
                        IT
                    </CategoryTitle>
                    <TagList>
                        <Tag 
                            selected={selectedTags.includes('#아이폰')}
                            selectable={isTagSelectable('#아이폰')}
                            onClick={() => handleTagClick('#아이폰')}
                        >
                            #아이폰
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#안드로이드')}
                            selectable={isTagSelectable('#안드로이드')}
                            onClick={() => handleTagClick('#안드로이드')}
                        >
                            #안드로이드
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#윈도우')}
                            selectable={isTagSelectable('#윈도우')}
                            onClick={() => handleTagClick('#윈도우')}
                        >
                            #윈도우
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#맥북')}
                            selectable={isTagSelectable('#맥북')}
                            onClick={() => handleTagClick('#맥북')}
                        >
                            #맥북
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#알고리즘')}
                            selectable={isTagSelectable('#알고리즘')}
                            onClick={() => handleTagClick('#알고리즘')}
                        >
                            #알고리즘
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#애플/프로그램')}
                            selectable={isTagSelectable('#애플/프로그램')}
                            onClick={() => handleTagClick('#애플/프로그램')}
                        >
                            #애플/프로그램
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#인터넷')}
                            selectable={isTagSelectable('#인터넷')}
                            onClick={() => handleTagClick('#인터넷')}
                        >
                            #인터넷
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#컴퓨터')}
                            selectable={isTagSelectable('#컴퓨터')}
                            onClick={() => handleTagClick('#컴퓨터')}
                        >
                            #컴퓨터
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#앱개발')}
                            selectable={isTagSelectable('#앱개발')}
                            onClick={() => handleTagClick('#앱개발')}
                        >
                            #앱개발
                        </Tag>
                    </TagList>
                </section>

                <section>
                    <CategoryTitle selectable={isCategorySelectable('뷰티&패션')}>
                        뷰티&패션
                    </CategoryTitle>
                    <TagList>
                        <Tag 
                            selected={selectedTags.includes('#스킨케어')}
                            selectable={isTagSelectable('#스킨케어')}
                            onClick={() => handleTagClick('#스킨케어')}
                        >
                            #스킨케어
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#메이크업')}
                            selectable={isTagSelectable('#메이크업')}
                            onClick={() => handleTagClick('#메이크업')}
                        >
                            #메이크업
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#패션')}
                            selectable={isTagSelectable('#패션')}
                            onClick={() => handleTagClick('#패션')}
                        >
                            #패션
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#베이직한')}
                            selectable={isTagSelectable('#베이직한')}
                            onClick={() => handleTagClick('#베이직한')}
                        >
                            #베이직한
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#향수')}
                            selectable={isTagSelectable('#향수')}
                            onClick={() => handleTagClick('#향수')}
                        >
                            #향수
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#코디')}
                            selectable={isTagSelectable('#코디')}
                            onClick={() => handleTagClick('#코디')}
                        >
                            #코디
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#악세서리')}
                            selectable={isTagSelectable('#악세서리')}
                            onClick={() => handleTagClick('#악세서리')}
                        >
                            #악세서리
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#화장대')}
                            selectable={isTagSelectable('#화장대')}
                            onClick={() => handleTagClick('#화장대')}
                        >
                            #화장대
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#쇼핑 정보')}
                            selectable={isTagSelectable('#쇼핑 정보')}
                            onClick={() => handleTagClick('#쇼핑 정보')}
                        >
                            #쇼핑 정보
                        </Tag>
                    </TagList>
                </section>

                <section>
                    <CategoryTitle selectable={isCategorySelectable('여가&휴식')}>
                        여가&휴식
                    </CategoryTitle>
                    <TagList>
                        <Tag 
                            selected={selectedTags.includes('#DIY')}
                            selectable={isTagSelectable('#DIY')}
                            onClick={() => handleTagClick('#DIY')}
                        >
                            #DIY
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#취미')}
                            selectable={isTagSelectable('#취미')}
                            onClick={() => handleTagClick('#취미')}
                        >
                            #취미
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#웨이트')}
                            selectable={isTagSelectable('#웨이트')}
                            onClick={() => handleTagClick('#웨이트')}
                        >
                            #웨이트
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#독서')}
                            selectable={isTagSelectable('#독서')}
                            onClick={() => handleTagClick('#독서')}
                        >
                            #독서
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#홈 가드닝')}
                            selectable={isTagSelectable('#홈 가드닝')}
                            onClick={() => handleTagClick('#홈 가드닝')}
                        >
                            #홈 가드닝
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#영화')}
                            selectable={isTagSelectable('#영화')}
                            onClick={() => handleTagClick('#영화')}
                        >
                            #영화
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#OTT')}
                            selectable={isTagSelectable('#OTT')}
                            onClick={() => handleTagClick('#OTT')}
                        >
                            #OTT
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#자기계발')}
                            selectable={isTagSelectable('#자기계발')}
                            onClick={() => handleTagClick('#자기계발')}
                        >
                            #자기계발
                        </Tag>
                    </TagList>
                </section>

                <section>
                    <CategoryTitle selectable={isCategorySelectable('로컬')}>
                        로컬
                    </CategoryTitle>
                    <TagList>
                        <Tag 
                            selected={selectedTags.includes('#동네 맛집')}
                            selectable={isTagSelectable('#동네 맛집')}
                            onClick={() => handleTagClick('#동네 맛집')}
                        >
                            #동네 맛집
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#맛집 리뷰')}
                            selectable={isTagSelectable('#맛집 리뷰')}
                            onClick={() => handleTagClick('#맛집 리뷰')}
                        >
                            #맛집 리뷰
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#로드맛집')}
                            selectable={isTagSelectable('#로드맛집')}
                            onClick={() => handleTagClick('#로드맛집')}
                        >
                            #로드맛집
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#맛집 명소')}
                            selectable={isTagSelectable('#맛집 명소')}
                            onClick={() => handleTagClick('#맛집 명소')}
                        >
                            #맛집 명소
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#서울맛')}
                            selectable={isTagSelectable('#서울맛')}
                            onClick={() => handleTagClick('#서울맛')}
                        >
                            #서울맛
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#지역 맛집')}
                            selectable={isTagSelectable('#지역 맛집')}
                            onClick={() => handleTagClick('#지역 맛집')}
                        >
                            #지역 맛집
                        </Tag>
                    </TagList>
                </section>

                <section>
                    <CategoryTitle selectable={isCategorySelectable('기타')}>
                        기타
                    </CategoryTitle>
                    <TagList>
                        <Tag 
                            selected={selectedTags.includes('#라이프')}
                            selectable={isTagSelectable('#라이프')}
                            onClick={() => handleTagClick('#라이프')}
                        >
                            #라이프
                        </Tag>
                        <Tag 
                            selected={selectedTags.includes('#일상')}
                            selectable={isTagSelectable('#일상')}
                            onClick={() => handleTagClick('#일상')}
                        >
                            #일상
                        </Tag>
                    </TagList>
                </section>

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