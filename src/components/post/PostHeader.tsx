import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, BackButton, Title } from './PostHeader.styled';

interface PostHeaderProps {
    title: string;
    onBackClick?: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ title, onBackClick }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        if (onBackClick) {
            onBackClick();
        } else {
            navigate(-1);
        }
    };

    return (
        <Header>
            <BackButton onClick={handleBackClick} />
            <Title>{title}</Title>
        </Header>
    );
};

export default PostHeader;
