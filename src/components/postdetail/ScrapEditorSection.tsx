import React, { useRef, useEffect } from 'react';
import Editor from '@components/mypage/Editor/Editor';
import * as S from '@components/mypage/EditorSection/EditorSection.Styled';
import ZipContainer from './ZipContainer';

interface ScrapEditorSectionProps {
  showEditor: boolean;
  closeEditor: () => void;
  thumbnail?: string;
  category?: string;
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

  return (
    showEditor && (
      <div ref={editorRef}>
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
      </div>
    )
  );
};

export default ScrapEditorSection;
