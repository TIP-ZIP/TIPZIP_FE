import React from 'react';
import { Modal } from './Modal';

const PostDeleteModal: React.FC<{
  showModal: boolean;
  onClose: () => void;
  onDelete: () => void;
}> = ({ showModal, onClose, onDelete }) => {
  if (!showModal) return null;
  return (
    <Modal
      showModal={showModal}
      onClose={onClose}
      onAction={onDelete}
      title='정말 삭제하시겠습니까?'
      buttonText1='취소'
      buttonText2='네'
      buttonPadding1='1.2rem 5.1rem'
      buttonPadding2='1.2rem 5.1rem'
    />
  );
};

export default PostDeleteModal;
