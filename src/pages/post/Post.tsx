import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from './Post.Styled';
import PostHeader from '@components/post/PostHeader';
import PostForm from '@components/post/PostForm';

const Post: React.FC = () => {
  const { id } = useParams();
  
  console.log('Post ID:', id);

  return (
    <Container>
      <PostHeader />
      <PostForm />
    </Container>
  );
};

export default Post;