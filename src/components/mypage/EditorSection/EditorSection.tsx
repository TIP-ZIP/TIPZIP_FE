import React from 'react';
import Editor from '@components/mypage/Editor/Editor';
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
}) =>
  showEditor && (
    <Editor
      title={editorType === 'nickname' ? '닉네임 바꾸기' : '자기소개 작성'}
      onClose={closeEditor}
    >
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
            maxLength={13}
            placeholder='프로필에 자기 소개를 작성해주세요.'
          />
          <S.CharCount>{introduction.length}/13</S.CharCount>
        </S.InputBox>
      )}
    </Editor>
  );

export default EditorSection;
