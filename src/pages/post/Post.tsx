import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PostHeader from '@components/post/PostHeader';
import TagSelector from '@components/post/TagSelector';
import PostEditor from '@components/post/PostEditor';
import PostTitle from '@components/post/PostTitle';
import PostLink from '@components/post/PostLink';

import * as S from './Post.styled';

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
    <S.Container>
      <PostHeader 
        title="글 작성" 
        onBackClick={() => navigate('/')} 
      />

      <S.Form onSubmit={handleSubmit}>
        <PostTitle 
          title={title}
          onChange={setTitle}
        />

        <TagSelector
          category={category}
          tags={tags}
          showTags={showTags}
          onCategorySelect={handleCategorySelect}
          onTagSelect={handleTagSelect}
        />

        <PostEditor
          content={content}
          onContentChange={setContent}
        />

        <PostLink 
          linkUrl={linkUrl}
          onChange={setLinkUrl}
        />

        <S.ButtonContainer>
          <S.StyledSubmitButton type="submit">등록하기</S.StyledSubmitButton>
        </S.ButtonContainer>
      </S.Form>
    </S.Container>
  );
};

export default Post;
