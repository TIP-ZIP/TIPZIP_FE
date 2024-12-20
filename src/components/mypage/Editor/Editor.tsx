import React from 'react';
import * as S from './Editor.Styled';

interface EditorProps {
  title?: string | undefined;
  onClose: () => void;
  children: React.ReactNode;
}

const Editor: React.FC<EditorProps> = ({ title, onClose, children }) => (
  <S.EditorContainer>
    {title && (
      <S.EditorHeader>
        <S.CloseBtn onClick={onClose} />
        <S.EditorTitle>{title}</S.EditorTitle>
      </S.EditorHeader>
    )}
    <S.EditorBody>{children}</S.EditorBody>
  </S.EditorContainer>
);

export default Editor;
