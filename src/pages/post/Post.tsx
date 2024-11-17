import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PostHeader from '@components/header/PostHeader';
import { colors } from '@styles/theme/colors';
import { AnimatePresence, motion } from 'framer-motion';
import videoIcon from '@assets/svgs/video.svg';
import cameraIcon from '@assets/svgs/camera.svg';

interface PostFormProps {
  onSubmit: (post: Post) => void;
}

interface Post {
  title: string;
  content: string;
  tags: string[];
  category: string;
  imageUrl?: string;
  videoUrl?: string;
  linkUrl?: string;
}

const Post: React.FC<PostFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [showTags, setShowTags] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!category) {
      alert('카테고리를 선택해주세요.');
      return;
    }
    if (tags.length === 0) {
      alert('태그를 1개 이상 선택해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('본문 내용을 입력해주세요.');
      return;
    }

    const post: Post = {
      title: title.trim(),
      content: content.trim(),
      tags,
      category,
      imageUrl: imageUrl || undefined,
      videoUrl: videoUrl || undefined,
      linkUrl: linkUrl.trim() || undefined,
    };
    
    onSubmit(post);
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    setShowTags(true);
  };

  const handleTagSelect = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  return (
    <Container>
      <PostHeader 
        title="글 작성" 
        onBackClick={() => navigate('/')} 
      />

      <Form onSubmit={handleSubmit}>

        <TitleSection>
          <TitleLabel>제목</TitleLabel>
          <TitleInput
            placeholder="22자 이내로 간단하게 적어주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={22}
          />
        </TitleSection>

        <CategorySelector $showTags={showTags}>
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              $active={category === cat}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </CategoryChip>
          ))}
        </CategorySelector>
        
        <AnimatePresence>
          {showTags && category && (
            <TagContainer
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TagList>
                {categoryTags[category]?.map((tag) => (
                  <TagChip
                    key={tag}
                    $active={tags.includes(tag)}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </TagChip>
                ))}
              </TagList>
            </TagContainer>
          )}
        </AnimatePresence>
 
        <ContentSection>
          <ContentLabel>본문 내용</ContentLabel>
          <ContentTextarea
            placeholder="~하게 작성하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <MediaButtons>
            <MediaButton>
              <CameraIcon />
              사진 선택
            </MediaButton>
            <MediaButton>
              <VideoIcon />
              동영상 선택
            </MediaButton>
          </MediaButtons>
        </ContentSection>

        <LinkSection>
          <LinkLabel>링크 첨부</LinkLabel>
          <LinkHint>(선택)</LinkHint>
          <LinkInput
            placeholder="다른 서비스에 올려놓은 글이 있다면 링크를 첨부해보세요!"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </LinkSection>

        <ButtonContainer>
          <StyledSubmitButton type="submit">등록하기</StyledSubmitButton>
        </ButtonContainer>

      </Form>
    </Container>
  );
};

export default Post;

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

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  padding: 0rem 2rem;
  background-color: ${colors.TZ_Monochrome[0]};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TitleSection = styled.div`
  margin-bottom: 1.2rem;
`;

const TitleLabel = styled.label`
  ${({ theme }) => theme.fontStyles.Body4};
  display: block;
  margin-bottom: 1rem;
  color: ${colors.TZ_Monochrome[1000]};
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 1.3rem 1.6rem;
  border: none;
  border-radius: 8px;
  background-color: ${colors.TZ_Monochrome[100]};
  font-size: ${({ theme }) => theme.fontStyles.Caption9};
  outline: none;

  &:focus {
    background-color: ${colors.TZ_Signature[50]};
  }

  &::placeholder {
    color: ${colors.TZ_Monochrome[300]};
  }
`;

const CategorySelector = styled.div<{ $showTags: boolean }>`
  display: flex;
  gap: 0.8rem;
  overflow-x: auto;
  margin-bottom: ${({ $showTags }) => $showTags ? '1.2rem' : '3.2rem'}; // 태그가 보일 때는 마진을 줄임
  
  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const CategoryChip = styled.div<{ $active?: boolean }>`
  padding: 0.8rem 1rem;
  border-radius: 4px;
  background-color: ${({ $active }) => ($active ? colors.TZ_Signature[500] : colors.TZ_Monochrome[100])};
  color: ${({ $active }) => ($active ? colors.TZ_Monochrome[0] : colors.TZ_Monochrome[500])};
  font-size: ${({ theme }) => theme.fontStyles.Caption8};
  white-space: nowrap;
  cursor: pointer;
`;

const ContentSection = styled.section`
  margin-bottom: 3.2rem;
`;

const ContentLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontStyles.Body4};
  color: ${colors.TZ_Monochrome[1000]};
  margin-bottom: 1.2rem;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  min-height: 30rem;
  padding: 1.2rem 1.7rem;
  border: none;
  border-radius: 8px;
  background-color: ${colors.TZ_Monochrome[100]};
  font-size: ${({ theme }) => theme.fontStyles.Caption9};
  line-height: 1.6;
  outline: none;
  resize: vertical;
  margin-bottom: 1.0rem;

  &:focus {
    background-color: ${colors.TZ_Signature[50]};
  }

  &::placeholder {
    color: ${colors.TZ_Monochrome[300]};
  }
`;

const MediaButtons = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const MediaButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.2rem;
  border: 0.6px solid ${colors.TZ_Monochrome[500]};
  border-radius: 8px;
  background: none;
  font-size: ${({ theme }) => theme.fontStyles.Caption8};
  color: ${colors.TZ_Monochrome[500]};
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;

const CameraIcon = styled.img.attrs({
  src: cameraIcon,
  alt: 'Camera',
})`
  width: 1.2rem;
  height: 1.1rem;
`;

const VideoIcon = styled.img.attrs({
  src: videoIcon,
  alt: 'Video',
})`
  width: 1.2rem;
  height: 1.1rem;
`;

const LinkSection = styled.section`
position: relative;
  margin-bottom: 2.5rem;
`;

const LinkLabel = styled.label`  
  display: inline-block;
  font-size: ${({ theme }) => theme.fontStyles.Body4};
  color: ${colors.TZ_Monochrome[1000]};
  font-weight: 500;
  margin-bottom: 1.2rem;
`;

const LinkHint = styled.span`
  position: absolute;
  top: 0.2rem;
  font-size: ${({ theme }) => theme.fontStyles.Caption7};
  color: ${colors.TZ_Monochrome[300]};
  margin-left: 0.8rem;
`;

const LinkInput = styled.input`
  width: 100%;
  padding: 1.1rem 1.6rem;
  border: none;
  border-radius: 8px;
  background-color: ${colors.TZ_Monochrome[100]};
  font-size: ${({ theme }) => theme.fontStyles.Caption9};
  outline: none;
  &:focus {
    background-color: ${colors.TZ_Signature[50]};
  }

  &::placeholder {
    color: ${colors.TZ_Monochrome[300]};
  }
`;

const StyledSubmitButton = styled.button`
  width: 100%;
  height: 4.4rem;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[300]};
  color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  font-size: ${({ theme }) => theme.fontStyles.Body1};
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;

const ButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${colors.TZ_Monochrome[0]};
  padding: 1.6rem 0;
`;

const TagContainer = styled(motion.div)`
  margin-top: 0;
  margin-bottom: 3.2rem;
  overflow: hidden;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const TagChip = styled.div<{ $active?: boolean }>`
  padding: 0.8rem 1rem;
  border-radius: 4px;
  color: ${({ $active }) => 
    $active ? colors.TZ_Signature[500] : colors.TZ_Monochrome[300]};
  border: 0.6px solid ${({ $active }) => 
    $active ? colors.TZ_Signature[500] : colors.TZ_Monochrome[300]};
  font-size: ${({ theme }) => theme.fontStyles.Caption8};
  cursor: pointer;
  transition: all 0.2s ease;
`;