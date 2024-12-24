import React, { useRef, useEffect } from 'react';
import Editor from '@components/mypage/Editor/Editor';
import { axiosInstance } from '@api/axios';
import * as S from './EditorSection.Styled';

interface EditorSectionProps {
  showEditor: boolean;
  editorType: 'nickname' | 'introduction';
  nickname: string;
  introduction: string;
  handleNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIntroductionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  closeEditor: () => void;
}

const EditorSection: React.FC<EditorSectionProps> = ({
  showEditor,
  editorType,
  nickname,
  introduction,
  handleNicknameChange,
  handleIntroductionChange,
  closeEditor,
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
    try {
      if (editorType === 'nickname') {
        // 닉네임 저장 API 호출
        await axiosInstance.patch('/mypage/username', {
          nickname,
        });
      } else if (editorType === 'introduction') {
        // 자기소개 저장 API 호출
        await axiosInstance.patch('/mypage/message', {
          introduction,
        });
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
          title={editorType === 'nickname' ? '닉네임 바꾸기' : '자기소개 작성'}
          onClose={closeEditor}
        >
          <S.EditorBar />
          <S.EditorContainer>
            {editorType === 'nickname' ? (
              <S.InputBox>
                <S.EditorInput
                  type='text'
                  value={nickname}
                  onChange={handleNicknameChange}
                  maxLength={12}
                />
                <S.CharCount>{nickname.length}/12</S.CharCount>
              </S.InputBox>
            ) : (
              <S.InputBox>
                <S.EditorInput
                  type='text'
                  value={introduction}
                  onChange={handleIntroductionChange}
                  maxLength={20}
                  placeholder='프로필에 자기 소개를 작성해주세요.'
                />
                <S.CharCount>{introduction.length}/20</S.CharCount>
              </S.InputBox>
            )}
          </S.EditorContainer>
        </Editor>
      </div>
    )
  );
};

export default EditorSection;
