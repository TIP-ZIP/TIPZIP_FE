import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderContainer, BackButton, Title } from './PostHeader.Styled';

const PostHeader: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
    navigate(-1);
    };

    return (
    <HeaderContainer>
        <BackButton aria-label="뒤로 가기" onClick={handleBack}>
        ←
        </BackButton>
        <Title>글 작성</Title>
        <div style={{ width: 24 }} />
    </HeaderContainer>
    );
};

export default PostHeader;
