import { forwardRef } from 'react';

import * as S from './PostMangeDropdown.styled';

const PostManageDropdown = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <S.DropdownContainer ref={ref}>
      <S.OptionsContainer>
        <S.OptionsContainer>
          <span>글 수정</span>
          <S.EditIcon />
        </S.OptionsContainer>
      </S.OptionsContainer>
      <S.OptionsContainer>
        <span>삭제하기</span>
        <S.DeleteIcon />
      </S.OptionsContainer>
    </S.DropdownContainer>
  );
});

export default PostManageDropdown;
