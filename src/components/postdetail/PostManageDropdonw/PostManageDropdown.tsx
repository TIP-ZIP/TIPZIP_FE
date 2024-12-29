import { forwardRef, useState } from 'react';
import axiosInstance from '@api/axios';

import PostDeleteModal from '@components/modal/PostDeleteModal';

import * as S from './PostMangeDropdown.styled';

type DropdownProps = {
  postId: number | null;
};

const PostManageDropdown = forwardRef<HTMLDivElement, DropdownProps>(({ postId }, ref) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const deletePost = async (): Promise<number | undefined> => {
    try {
      const response = await axiosInstance.delete(`posts/${postId}`);
      console.log(response);

      return response.status;
    } catch (error) {
      console.error('게시물 삭제 Error:', error);
    }
  };

  const handleDeletePost = async (): Promise<void> => {
    const responseStatus = await deletePost();

    if (responseStatus === 200) {
      setIsDeleteModalOpen(false);
      window.location.href = '/mypage';
    }
  };

  const handleOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = (): void => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <S.DropdownContainer ref={ref}>
        <S.OptionsContainer>
          <S.OptionsContainer>
            <span>글 수정</span>
            <S.EditIcon />
          </S.OptionsContainer>
        </S.OptionsContainer>
        <S.OptionsContainer onClick={handleOpenDeleteModal}>
          <span>삭제하기</span>
          <S.DeleteIcon />
        </S.OptionsContainer>
      </S.DropdownContainer>

      <PostDeleteModal
        showModal={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeletePost}
      />
    </>
  );
});

export default PostManageDropdown;
