import React from 'react';
import * as S from './PostTitle.styled';

const MAX_TITLE_LENGTH = 22;

interface PostTitleProps {
    title: string;
    onChange: (value: string) => void;
}

const PostTitle: React.FC<PostTitleProps> = ({ title, onChange }) => {
    return (
        <S.TitleSection>
        <S.TitleLabel>제목</S.TitleLabel>
        <S.TitleInput
            placeholder={`${MAX_TITLE_LENGTH}자 이내로 간단하게 적어주세요`}
            value={title}
            onChange={(e) => onChange(e.target.value)}
            maxLength={MAX_TITLE_LENGTH}
        />
        </S.TitleSection>
    );
};

export default PostTitle; 