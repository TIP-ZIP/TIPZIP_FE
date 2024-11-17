import React from 'react';
import { LinkSection, LinkLabel, LinkHint, LinkInput } from './PostLink.styled';

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