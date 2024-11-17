import React from 'react';
import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

interface PostTitleProps {
  title: string;
  onChange: (value: string) => void;
}

const PostTitle: React.FC<PostTitleProps> = ({ title, onChange }) => {
  return (
    <TitleSection>
      <TitleLabel>제목</TitleLabel>
      <TitleInput
        placeholder="22자 이내로 간단하게 적어주세요"
        value={title}
        onChange={(e) => onChange(e.target.value)}
        maxLength={22}
      />
    </TitleSection>
  );
};

export default PostTitle;

const TitleSection = styled.div`
  margin-bottom: 1.2rem;
`;

const TitleLabel = styled.label`
  ${({ theme }) => theme.fontStyles.Body4};
  display: block;
  margin-bottom: 1rem;
  color: ${colors.TZ_Monochrome[1000]};
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 1.3rem 1.6rem;
  border: none;
  border-radius: 8px;
  background-color: ${colors.TZ_Monochrome[100]};
  font-size: ${({ theme }) => theme.fontStyles.Caption9};
  outline: none;

  &:focus {
    background-color: ${colors.TZ_Signature[50]};
  }

  &::placeholder {
    color: ${colors.TZ_Monochrome[300]};
  }
`; 