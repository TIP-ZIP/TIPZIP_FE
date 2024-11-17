import React from 'react';
import { TitleSection, TitleLabel, TitleInput } from './PostTitle.styled';

interface PostTitleProps {
    title: string;
    onChange: (value: string) => void;
}

const PostTitle: React.FC<PostTitleProps> = ({ title, onChange }) => {
    return (
        <TitleSection>
        <TitleLabel>제목</TitleLabel>
        <TitleInput
            placeholder="22자 이내로 간단하게 적어주세요"
            value={title}
            onChange={(e) => onChange(e.target.value)}
            maxLength={22}
        />
        </TitleSection>
    );
};

export default PostTitle; 