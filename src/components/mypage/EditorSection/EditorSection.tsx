import React, { useRef, useEffect } from 'react';
import Editor from '@components/mypage/Editor/Editor';
import axiosInstance from '@api/axios';
import * as S from './EditorSection.Styled';

interface EditorSectionProps {
  showEditor: boolean;
  editorType: 'username' | 'message';
  username: string;
  message: string;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 수정된 핸들러 이름
  handleMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 수정된 핸들러 이름
  closeEditor: () => void;
  onUpdate: (updatedValue: { username?: string; message?: string }) => void; // 추가
}

const EditorSection: React.FC<EditorSectionProps> = ({
  showEditor,
  editorType,
  username,
  message,
  handleUsernameChange,
  handleMessageChange,
  closeEditor,
  onUpdate,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

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
        await axiosInstance.patch(
          '/mypage/username',
          { username },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        onUpdate({ username });
      } else if (editorType === 'message') {
        await axiosInstance.patch(
          '/mypage/message',
          { message },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        onUpdate({ message });
      }
      closeEditor();
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
                  value={username || ''} // 상태 값 바인딩
                  onChange={handleUsernameChange}
                  maxLength={12}
                  placeholder={username ? username : '닉네임을 작성해주세요.'}
                />
                <S.CharCount>{username?.length}/12</S.CharCount>
              </S.InputBox>
            ) : (
              <S.InputBox>
                <S.EditorInput
                  type='text'
                  value={message || ''}
                  onChange={handleMessageChange}
                  maxLength={20}
                  placeholder={message ? message : '프로필에 자기 소개를 작성해주세요.'}
                />
                <S.CharCount>{message?.length}/20</S.CharCount>
              </S.InputBox>
            )}
          </S.EditorContainer>
        </Editor>
      </div>
    )
  );
};

export default EditorSection;
