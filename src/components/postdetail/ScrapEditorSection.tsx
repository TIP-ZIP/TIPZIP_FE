import React, { useRef, useEffect } from 'react';
import Editor from '@components/mypage/editor/Editor';
import * as S from '@components/mypage/editorsection/editorsection.styled';
import ZipContainer from './ZipContainer';

interface ScrapEditorSectionProps {
  showEditor: boolean;
  closeEditor: () => void;
  thumbnail?: string;
  category?: number;
  postid?: number;
}

const ScrapEditorSection: React.FC<ScrapEditorSectionProps> = ({
  showEditor,
  closeEditor,
  thumbnail,
  category,
  postid,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (editorRef.current && !editorRef.current.contains(e.target as Node)) {
        closeEditor();
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [closeEditor]);

  useEffect(() => {
    if (showEditor) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showEditor]);

  return (
    showEditor && (
      <S.EditorWrapper ref={editorRef} $showEditor={showEditor}>
        <Editor onClose={closeEditor}>
          <S.EditorContainer>
            <S.ScrapContainer>
              <S.GrayBar />
              <S.CategoryContainer>
                <S.Thumbnail src={thumbnail} alt='Thumbnail' />
                <S.CategoryInfo>
                  <S.ScrapMessage>저장됨</S.ScrapMessage>
                  <S.Category>{category} 에 저장됨</S.Category>
                </S.CategoryInfo>
              </S.CategoryContainer>
            </S.ScrapContainer>
            <ZipContainer postId={postid} />
          </S.EditorContainer>
        </Editor>
      </S.EditorWrapper>
    )
  );
};

export default ScrapEditorSection;
