import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './PostHeader.styled';

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
        <S.Header>
            <S.BackButton onClick={handleBackClick} />
            <S.Title>{title}</S.Title>
        </S.Header>
    );
};

export default PostHeader;
