import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TagSectionContainer,
    TagLabel,
    TagHelperText,
    ArrowIcon,
} from './TagSection.Styled';

    interface TagSectionProps {
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
    }

    const TagSection: React.FC<TagSectionProps> = () => {
    const navigate = useNavigate();

    const handleTagSectionClick = () => {
        navigate('/tag-selector');
    };

    return (
        <TagSectionContainer onClick={handleTagSectionClick}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <TagLabel>태그 등록</TagLabel>
            <TagHelperText>1개 이상 선택해주세요</TagHelperText>
        </div>
        <ArrowIcon>→</ArrowIcon>
        </TagSectionContainer>
    );
};

export default TagSection;
