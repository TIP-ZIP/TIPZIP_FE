import React from 'react';
import * as S from './PostEditor.styled';
import axiosInstance from '@api/axios';

interface PostEditorProps {
    content: string;
    onContentChange: (content: string) => void;
    onImageUpload: (imageUrl: string) => void;
}

const PostEditor: React.FC<PostEditorProps> = ({
    content,
    onContentChange,
    onImageUpload,
}) => {
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);

            try {
                const response = await axiosInstance.post('/S3/uploadImageFile/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                onImageUpload(response.data.S3url);
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
                alert('이미지 업로드에 실패했습니다.');
            }
        }
    };

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
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="imageUpload"
                    />
                    <label htmlFor="imageUpload">
                        <S.CameraIcon />
                        사진 선택
                    </label>
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
