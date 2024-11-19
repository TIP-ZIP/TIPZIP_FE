import React from 'react';
import * as S from './PostEditor.styled';

interface PostEditorProps {
    content: string;
    onContentChange: (content: string) => void;
}

const PostEditor: React.FC<PostEditorProps> = ({
    content,
    onContentChange,
}) => {
    return (
        <S.ContentSection>
            <S.ContentLabel>본문 내용</S.ContentLabel>
            <S.ContentTextarea
                placeholder="~하게 작성하세요"
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
            />
            <S.MediaButtons>
                <S.MediaButton>
                    <S.CameraIcon />
                    사진 선택
                </S.MediaButton>
                <S.MediaButton>
                    <S.VideoIcon />
                    동영상 선택
                </S.MediaButton>
            </S.MediaButtons>
        </S.ContentSection>
    );
};

export default PostEditor;
