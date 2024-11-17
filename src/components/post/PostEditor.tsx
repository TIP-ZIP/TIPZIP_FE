import React from 'react';
import {
    ContentSection,
    ContentLabel,
    ContentTextarea,
    MediaButtons,
    MediaButton,
    CameraIcon,
    VideoIcon
} from './PostEditor.styled';

interface PostEditorProps {
    content: string;
    onContentChange: (content: string) => void;
}

const PostEditor: React.FC<PostEditorProps> = ({
    content,
    onContentChange,
}) => {
    return (
        <ContentSection>
            <ContentLabel>본문 내용</ContentLabel>
            <ContentTextarea
                placeholder="~하게 작성하세요"
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
            />
            <MediaButtons>
                <MediaButton>
                    <CameraIcon />
                    사진 선택
                </MediaButton>
                <MediaButton>
                    <VideoIcon />
                    동영상 선택
                </MediaButton>
            </MediaButtons>
        </ContentSection>
    );
};

export default PostEditor;
