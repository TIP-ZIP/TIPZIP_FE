import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModalContainer from '@components/home/LoginModalContainer';

import PostHeader from '@components/post/PostHeader';
import TagSelector from '@components/post/TagSelector';
import PostEditor from '@components/post/PostEditor';
import PostTitle from '@components/post/PostTitle';
import PostLink from '@components/post/PostLink';
import PostThumbnail from '@components/post/PostThumbnail';

import * as S from './Post.styled';
import axiosInstance from '@api/axios';

interface Post {
  title: string;
  category: string;
  tag: string[];
  content: string;
  link_url?: string;
  thumbnail_url?: string;
}

const Post: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [showTags, setShowTags] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [thumbnail_url, setThumbnailUrl] = useState<string>('');
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      setShowLoginModal(false);
      return;
    }

    if (!token) {
      console.log('로그인 모달 표시 이유: 토큰 없음');
      setShowLoginModal(true);
    }
  }, []);

  const handleImageUpload = (imageUrl: string) => {
    setImages((prev) => {
      const updatedImages = [...prev, imageUrl];
      if (updatedImages.length === 1) {
        setThumbnailUrl(imageUrl); // Automatically set the first image as the thumbnail when it is the first image.
      }
      return updatedImages;
    });

    setContent((prev) => `${prev}\n<img src="${imageUrl}" alt="uploaded" />\n`);
  };

  const handleThumbnailSelect = (url: string) => {
    setThumbnailUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    const processedTags = tags.map((tag) => tag.replace('#', ''));

    const postData: Post = {
      title: title.trim(),
      category,
      tag: processedTags,
      content: content.trim(),
      link_url: linkUrl.trim() || undefined,
      thumbnail_url: thumbnail_url || images[0] || undefined, // Use the thumbnail_url if set, otherwise use the first image
    };

    try {
      // 요청 데이터 로깅
      console.log('Sending post data:', postData);

      const response = await axiosInstance.post('/posts', postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert('게시글이 성공적으로 등록되었습니다.');
        navigate('/home');
      }
    } catch (error: any) {
      console.error('게시글 등록 실패:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      }
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
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

  const isFormValid = () => {
    return title.trim() !== '' && category !== '' && tags.length > 0 && content.trim() !== '';
  };

  return (
    <>
      {showLoginModal ? (
        <LoginModalContainer
          showModal={showLoginModal}
          handleClose={() => {
            setShowLoginModal(false);
            navigate(-1);
          }}
          handleLogin={() => {
            setShowLoginModal(false);
            navigate('/login');
          }}
        />
      ) : (
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
            <PostEditor
              content={content}
              onContentChange={setContent}
              onImageUpload={handleImageUpload}
            />
            <PostThumbnail
              images={images}
              thumbnail_url={thumbnail_url}
              onThumbnailSelect={handleThumbnailSelect}
            />
            <PostLink linkUrl={linkUrl} onChange={setLinkUrl} />
            <S.ButtonContainer>
              <S.StyledSubmitButton type='submit' $isValid={Boolean(isFormValid())}>
                등록하기
              </S.StyledSubmitButton>
            </S.ButtonContainer>
          </S.Form>
        </S.Container>
      )}
    </>
  );
};

export default Post;
