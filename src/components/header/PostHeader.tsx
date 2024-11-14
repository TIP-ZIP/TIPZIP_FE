import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const Header = styled.header`
    position: relative;
    display: flex;
    align-items: center;    
    margin-bottom: 1.5rem;
`;

const BackButton = styled.button`
    position: absolute;
    left: -0.5rem;
    width: 1.5rem;    
    height: 1.5rem;
    margin-right: 1rem;
    background: url('/src/assets/svgs/leftarrow.svg') center/contain no-repeat;
    border: none;
    cursor: pointer;
`;

const Title = styled.h2`
    margin: 0 auto;
    font-size: ${({ theme }) => theme.fontStyles.Header2};
    font-weight: 500;
    text-align: center;
    color: ${({ theme }) => theme.colors.TZ_Monochrome[1000]};
`;
