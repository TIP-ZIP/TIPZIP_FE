import React, { useState, useEffect } from 'react';
import * as S from './PostThumbnail.Styled';
import axiosInstance from '@api/axios';
import { AxiosError } from 'axios';

interface PostThumbnailProps {
  images: string[];
  thumbnail_url: string;
  onThumbnailSelect: (url: string) => void;
}

const PostThumbnail: React.FC<PostThumbnailProps> = ({
  images,
  thumbnail_url,
  onThumbnailSelect,
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  // images 배열에서 첫 번째 이미지를 자동으로 프리뷰에 넣기
  useEffect(() => {
    if (images.length > 0 && !thumbnail_url) {
      setImagePreviewUrl(images[0]); // 첫 번째 이미지를 프리뷰로 설정
      onThumbnailSelect(images[0]); // 썸네일로 첫 번째 이미지 선택
    }
  }, [images, thumbnail_url, onThumbnailSelect]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('파일 크기는 10MB 이하여야 합니다.');
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl); // 선택된 이미지의 미리보기 URL로 설정
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axiosInstance.post('/S3/uploadImageFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedImageUrl = response.data.S3url;
        onThumbnailSelect(uploadedImageUrl); // 업로드된 이미지의 URL을 썸네일로 설정
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 413) {
            alert('파일 크기가 너무 큽니다. 더 작은 이미지를 선택해주세요.');
          } else {
            alert('이미지 업로드에 실패했습니다.');
          }
        } else {
          alert('알 수 없는 오류가 발생했습니다.');
        }
      }
    }
  };
  const previewUrl = imagePreviewUrl || thumbnail_url;
  return (
    <S.Section>
      <S.TitleSection>
        <S.ThumbnailLabel>썸네일 등록</S.ThumbnailLabel>
        <S.ThumbnailHint>(선택)</S.ThumbnailHint>
      </S.TitleSection>
      <S.ViewSection>
        <S.Preview
          style={{
            backgroundImage: previewUrl ? `url(${previewUrl})` : 'none',
          }}
        />
        <S.MediaButton type='button'>
          <input
            type='file'
            accept='image/*'
            onChange={handleUpload}
            style={{ display: 'none' }}
            id='ImageUpload'
          />
          <label htmlFor='ImageUpload'>
            <S.CameraIcon />
            사진 선택
          </label>
        </S.MediaButton>
      </S.ViewSection>
    </S.Section>
  );
};

export default PostThumbnail;
