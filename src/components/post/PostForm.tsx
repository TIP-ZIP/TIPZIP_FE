import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    LabelWrapper,
    OptionalText,
    SubmitButton,
    MediaButtonsContainer,
} from './PostForm.Styled';
import TagSection from './TagSection';
import ContentEditor from './ContentEditor';
import MediaButton from '@components/button/MediaButton';
import * as S from '@pages/home/Home.Styled';

interface WriteFormData {
    title: string;
    content: string;
    categories: string[];
    tags: string[];
    images: File[];
    videos: File[];
    link?: string;
}

const PostForm: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<WriteFormData>({
    title: '',
    content: '',
    categories: [],
    tags: [],
    images: [],
    videos: [],
    link: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit 로직 아직 구현 안됨
    };

    const handleImageSelect = () => {
        // 이미지 선택 로직 구현 필요
        setFormData(prev => ({ ...prev, images: [] }));
    };

    const handleVideoSelect = () => {
        // 비디오 선택 로직 구현 필요
        setFormData(prev => ({ ...prev, videos: [] }));
    };

    const categories = ['일상', '취미', '여행', '음식', '문화', '기타'];

    const handleCategoryClick = (category: string) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    return (
    <Form onSubmit={handleSubmit}>
        <FormGroup>
        <Label htmlFor="title">제목</Label>
        <Input
            id="title"
            placeholder="n자 이내로 간단하게 적어주세요"
            value={formData.title}
            onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
        />
        </FormGroup>

        <FormGroup>
            <Label>카테고리</Label>
            <S.CategoryList>
                {categories.map((category, index) => (
                    <S.CategoryItem
                        key={index}
                        $selectedtag={formData.categories.includes(category)}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </S.CategoryItem>
                ))}
            </S.CategoryList>
        </FormGroup>

        <FormGroup>
            <TagSection
            selectedTags={formData.tags}
            setSelectedTags={(tags) => setFormData((prev) => ({ ...prev, tags }))}
            />
        </FormGroup>

        <FormGroup>
            <Label htmlFor="content">본문 내용</Label>
            <ContentEditor
            content={formData.content}
            setContent={(content) =>
                setFormData((prev) => ({ ...prev, content }))
                }
                />
            </FormGroup>

            <MediaButtonsContainer>
                <MediaButton 
                    icon="📷" 
                    label="사진 선택" 
                    onClick={handleImageSelect} 
                />
                <MediaButton 
                    icon="🎥" 
                    label="동영상 선택" 
                    onClick={handleVideoSelect} 
                />
            </MediaButtonsContainer>

            <FormGroup>
                <LabelWrapper>
                <Label htmlFor="link">링크 첨부</Label>
                <OptionalText>(선택)</OptionalText>
                </LabelWrapper>
                <Input
                id="link"
                placeholder="다른 서비스에 올려놓은 글이 있다면 링크를 첨부해보세요!"
                value={formData.link}
                onChange={(e) =>
                    setFormData((prev) => ({ ...prev, link: e.target.value }))
                }
                />
            </FormGroup>

        <SubmitButton
            type="submit"
            disabled={
            !formData.title || !formData.content || formData.categories.length === 0
            }
        >
            등록하기
        </SubmitButton>
        </Form>
    );
};

export default PostForm;
