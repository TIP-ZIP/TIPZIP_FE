import React from 'react';
import * as S from './PostTitle.styled';

interface PostTitleProps {
    title: string;
    onChange: (value: string) => void;
}

const PostTitle: React.FC<PostTitleProps> = ({ title, onChange }) => {
    return (
        <S.TitleSection>
        <S.TitleLabel>제목</S.TitleLabel>
        <S.TitleInput
            placeholder="22자 이내로 간단하게 적어주세요"
            value={title}
            onChange={(e) => onChange(e.target.value)}
            maxLength={22}
        />
        </S.TitleSection>
    );
};

export default PostTitle; 