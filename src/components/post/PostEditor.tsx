import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as S from './PostEditor.styled';
import axiosInstance from '@api/axios';
import axios from 'axios';

interface PostEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onImageUpload: (imageUrl: string) => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ content, onContentChange, onImageUpload }) => {
  const quillRef = React.useRef<ReactQuill>(null);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'color',
    'background',
    'link',
    'image',
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      console.log('업로드 시도하는 파일:', {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        type: file.type,
      });

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('파일 크기는 10MB 이하여야 합니다.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      console.log('FormData 내용:', {
        hasFile: formData.has('file'),
        fileName: file.name,
      });

      try {
        console.log('이미지 업로드 요청 시작');
        const response = await axiosInstance.post('/S3/uploadImageFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('이미지 업로드 성공:', response.data);

        // Quill 에디터에 이미지 삽입
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection() || { index: quill.getLength(), length: 0 };
          quill.insertEmbed(range.index, 'image', response.data.S3url);
          quill.setSelection(range.index + 1, 0);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('이미지 업로드 실패 상세:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers,
          });

          if (error.response?.status === 413) {
            alert('파일 크기가 너무 큽니다. 더 작은 이미지를 선택해주세요.');
          } else {
            alert('이미지 업로드에 실패했습니다.');
          }
        }
      }
    }
  };

  const handleChange = (value: string) => {
    console.log('에디터 내용:', value);
    onContentChange(value);
  };

  return (
    <S.ContentSection>
      <S.ContentLabel>본문 내용</S.ContentLabel>
      <S.QuillWrapper>
        <ReactQuill
          ref={quillRef}
          theme='snow'
          value={content}
          onChange={handleChange}
          modules={quillModules}
          formats={quillFormats}
          placeholder={`전달하고자 하는 내용 핵심 위주로 작성해주세요\n(썸네일 미등록 시 이미지를 꼭 첨부해주세요)`}
        />
      </S.QuillWrapper>
      <S.MediaButtons>
        <S.MediaButton type='button'>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id='imageUpload'
          />
          <label htmlFor='imageUpload'>
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
