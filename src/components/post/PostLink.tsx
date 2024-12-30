import React from 'react';
import * as S from './postlink.styled';

interface PostLinkProps {
    linkUrl: string;
    onChange: (value: string) => void;
}

const PostLink: React.FC<PostLinkProps> = ({ linkUrl, onChange }) => {
    return (
        <S.LinkSection>
            <S.LinkLabel>링크 첨부</S.LinkLabel>
            <S.LinkHint>(선택)</S.LinkHint>
            <S.LinkInput
                placeholder="다른 서비스에 올려놓은 글이 있다면 링크를 첨부해보세요!"
                value={linkUrl}
                onChange={(e) => onChange(e.target.value)}
            />
        </S.LinkSection>
    );
};

export default PostLink; 