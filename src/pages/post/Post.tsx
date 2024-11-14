import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PostHeader from '@components/header/PostHeader';
import { colors } from '@styles/theme/colors';

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

  const handleTagClick = () => {
    navigate('/tag', { state: { selectedCategory: category } });
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
            placeholder="50자 이내로 간단하게 적어주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
          />
        </TitleSection>
        <CategorySelector>
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              $active={category === cat}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </CategoryChip>
          ))}
        </CategorySelector>
        <TagHeaderButton onClick={handleTagClick}>
          <TagLabelGroup>
            <TagLabel>태그 등록</TagLabel>
            <TagHint>1개 이상 선택해주세요</TagHint>
          </TagLabelGroup>
          <RightArrow />
        </TagHeaderButton>
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
        <StyledSubmitButton type="submit">등록하기</StyledSubmitButton>
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
  margin: 0 auto;
  padding: 1rem 1rem;
  background-color: ${colors.TZ_Monochrome[0]};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TitleSection = styled.div`
  margin-bottom: 0.25rem;
`;

const TitleLabel = styled.label`
  ${({ theme }) => theme.fontStyles.Body4};
  display: block;
  margin-bottom: 1rem;
  color: ${colors.TZ_Monochrome[1000]};
`;

const TitleInput = styled.input`
  width: 100%;
  height: 2.75rem;
  padding: 0.75rem 1rem;
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

const CategorySelector = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0;
  overflow-x: auto;
  margin-bottom: 1rem;
  
  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const CategoryChip = styled.div<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: ${({ $active }) => ($active ? colors.TZ_Signature[500] : colors.TZ_Monochrome[100])};
  color: ${({ $active }) => ($active ? colors.TZ_Monochrome[0] : colors.TZ_Monochrome[500])};
  font-size: ${({ theme }) => theme.fontStyles.Caption8};
  white-space: nowrap;
  cursor: pointer;
`;

const TagHeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const TagLabelGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TagLabel = styled.label`
  font-size: ${({ theme }) => theme.fontStyles.Body4};
  margin-right: 0.25rem;
`;

const TagHint = styled.div`
  font-size: ${({ theme }) => theme.fontStyles.Caption7};
  color: ${colors.TZ_Monochrome[300]};
`;

const RightArrow = styled.img.attrs({
  src: '/src/assets/svgs/rightarrow.svg',
  alt: 'Right Arrow',
})`
  width: 1.25rem;
  height: 1.25rem;
`;

const ContentSection = styled.section`
  margin-bottom: 1.5rem;
`;

const ContentLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontStyles.Body4};
  color: ${colors.TZ_Monochrome[1000]};
  margin-bottom: 1rem;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background-color: ${colors.TZ_Monochrome[100]};
  font-size: ${({ theme }) => theme.fontStyles.Caption9};
  line-height: 1.6;
  outline: none;
  resize: vertical;

  &:focus {
    background-color: ${colors.TZ_Signature[50]};
  }

  &::placeholder {
    color: ${colors.TZ_Monochrome[300]};
  }
`;

const MediaButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const MediaButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 0.6px solid #dddddd;
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
  src: '/src/assets/svgs/camera.svg',
  alt: 'Camera',
})`
  width: 1rem;
  height: 1rem;
`;

const VideoIcon = styled.img.attrs({
  src: '/src/assets/svgs/video.svg',
  alt: 'Video',
})`
  width: 1rem;
  height: 1rem;
`;

const LinkSection = styled.section`
  margin-bottom: 2.5rem;
`;

const LinkLabel = styled.label`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontStyles.Body4};
  color: ${colors.TZ_Monochrome[1000]};
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const LinkHint = styled.span`
  font-size: ${({ theme }) => theme.fontStyles.Caption7};
  color: ${colors.TZ_Monochrome[300]};
  margin-left: 0.5rem;
`;

const LinkInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: ${colors.TZ_Monochrome[100]};
  font-size: ${({ theme }) => theme.fontStyles.Caption9};
  outline: none;
  margin-top: 0.5rem;

  &:focus {
    background-color: ${colors.TZ_Signature[50]};
  }

  &::placeholder {
    color: ${colors.TZ_Monochrome[300]};
  }
`;

const StyledSubmitButton = styled.button`
  height: 2.75rem;
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