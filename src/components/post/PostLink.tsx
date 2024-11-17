import React from 'react';
import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

interface PostLinkProps {
  linkUrl: string;
  onChange: (value: string) => void;
}

const PostLink: React.FC<PostLinkProps> = ({ linkUrl, onChange }) => {
  return (
    <LinkSection>
      <LinkLabel>링크 첨부</LinkLabel>
      <LinkHint>(선택)</LinkHint>
      <LinkInput
        placeholder="다른 서비스에 올려놓은 글이 있다면 링크를 첨부해보세요!"
        value={linkUrl}
        onChange={(e) => onChange(e.target.value)}
      />
    </LinkSection>
  );
};

export default PostLink;

const LinkSection = styled.section`
  position: relative;
  margin-bottom: 2.5rem;
`;

const LinkLabel = styled.label`  
  display: inline-block;
  font-size: ${({ theme }) => theme.fontStyles.Body4};
  color: ${colors.TZ_Monochrome[1000]};
  font-weight: 500;
  margin-bottom: 1.2rem;
`;

const LinkHint = styled.span`
  position: absolute;
  top: 0.2rem;
  font-size: ${({ theme }) => theme.fontStyles.Caption7};
  color: ${colors.TZ_Monochrome[300]};
  margin-left: 0.8rem;
`;

const LinkInput = styled.input`
  width: 100%;
  padding: 1.1rem 1.6rem;
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