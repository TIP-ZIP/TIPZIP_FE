import React, { useRef, useEffect } from 'react';
import Editor from '@components/mypage/Editor/Editor';
import axiosInstance from '@api/axios';
import * as S from './EditorSection.Styled';

interface EditorSectionProps {
  showEditor: boolean;
  editorType: 'username' | 'introduction';
  username: string;
  message: string;
  handleusernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIntroductionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  closeEditor: () => void;
  onUpdate: (updatedValue: { username?: string; message?: string }) => void; // 추가
}

const EditorSection: React.FC<EditorSectionProps> = ({
  showEditor,
  editorType,
  username,
  message,
  handleusernameChange,
  handleIntroductionChange,
  closeEditor,
  onUpdate, // 추가
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  console.log(username);
  console.log(message);

  useEffect(() => {
    const handleClickOutside = async (e: PointerEvent) => {
      if (editorRef.current && !editorRef.current.contains(e.target as Node)) {
        await handleClose(); // 외부 클릭 시 저장 후 닫기
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [closeEditor]);

  const handleSave = async () => {
    const token = localStorage.getItem('accessToken'); // 토큰 가져오기

    try {
      if (editorType === 'username') {
        // 닉네임 저장 API 호출
        await axiosInstance.patch(
          '/mypage/username',
          { username },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        onUpdate({ username }); // 부모 상태 업데이트
      } else if (editorType === 'introduction') {
        // 자기소개 저장 API 호출
        await axiosInstance.patch(
          '/mypage/message',
          { message },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        onUpdate({ message }); // 부모 상태 업데이트
      }
      closeEditor(); // 저장 후 에디터 닫기
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleClose = async () => {
    await handleSave(); // 저장 호출
    closeEditor(); // 에디터 닫기
  };

  return (
    showEditor && (
      <div ref={editorRef}>
        <Editor
          title={editorType === 'username' ? '닉네임 바꾸기' : '자기소개 작성'}
          onClose={handleClose}
        >
          <S.EditorBar />
          <S.EditorContainer>
            {editorType === 'username' ? (
              <S.InputBox>
                <S.EditorInput
                  type='text'
                  value={username}
                  onChange={handleusernameChange}
                  maxLength={12}
                  placeholder={username ? username : '닉네임을 작성해주세요.'}
                />
                <S.CharCount>{username.length}/12</S.CharCount>
              </S.InputBox>
            ) : (
              <S.InputBox>
                <S.EditorInput
                  type='text'
                  value={message}
                  onChange={handleIntroductionChange}
                  maxLength={20}
                  placeholder={message ? message : '프로필에 자기 소개를 작성해주세요.'}
                />
                <S.CharCount>{message.length}/20</S.CharCount>
              </S.InputBox>
            )}
          </S.EditorContainer>
        </Editor>
      </div>
    )
  );
};

export default EditorSection;
