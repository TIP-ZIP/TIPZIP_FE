import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PostHeader from '@components/post/PostHeader';
import TagSelector from '@components/post/TagSelector';
import PostEditor from '@components/post/PostEditor';
import PostTitle from '@components/post/PostTitle';
import PostLink from '@components/post/PostLink';

import * as S from './Post.styled';

interface Post {
  title: string;
  content: string;
  tags: string[];
  category: string;
  imageUrl?: string;
  videoUrl?: string;
  linkUrl?: string;
}

const Post: React.FC = () => {
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

    const postData: Post = {
      title: title.trim(),
      content: content.trim(),
      tags,
      category,
      imageUrl: imageUrl || undefined,
      videoUrl: videoUrl || undefined,
      linkUrl: linkUrl.trim() || undefined,
    };

    try {
      // 폼 제출(게시글 등록) 로직
      const response = await axios.post('/api/posts', postData, {
        headers: {
          'Content-Type': 'application/json',
          // 필요한 경우 인증 토큰 추가
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        // 또는 200
        alert('게시글이 성공적으로 등록되었습니다.');
        navigate('/'); // 홈으로 이동
      }
    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCategorySelect = (cat: string) => {
    setTags([]);
    setCategory(cat);
    setShowTags(true);
  };

  const handleTagSelect = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  // 필수 항목들이 모두 입력되었는지 확인하는 함수 추가
  const isFormValid = () => {
    return title.trim() !== '' && category !== '' && tags.length > 0 && content.trim() !== '';
  };

  return (
    <S.Container>
      <PostHeader title='글 작성' onBackClick={() => navigate('/home')} />

      <PostTitle title={title} onChange={setTitle} />

      <TagSelector
        category={category}
        tags={tags}
        showTags={showTags}
        onCategorySelect={handleCategorySelect}
        onTagSelect={handleTagSelect}
      />

      <S.Form onSubmit={handleSubmit}>
        <PostEditor content={content} onContentChange={setContent} />

        <PostLink linkUrl={linkUrl} onChange={setLinkUrl} />

        <S.ButtonContainer>
          <S.StyledSubmitButton
            type='submit'
            $isValid={isFormValid()} // prop 전달
          >
            등록하기
          </S.StyledSubmitButton>
        </S.ButtonContainer>
      </S.Form>
    </S.Container>
  );
};

export default Post;
