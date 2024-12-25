// ScrapPostView.Styled.ts

import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
`;

export const HeaderContainer = styled.div`
    width: 100%;
    overflow: hidden;
`;

export const HeaderImageWrapper = styled.div`
    position: relative;
    width: 18.7rem;
    display: flex;
    align-items: center;
    top: 0.1rem;
`;

export const HeaderCategoryBar = styled.div`
    width: 100%;
    min-width: 375px;
    max-width: 768px;
    position: absolute;
    padding: 17px 15px;
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.15);
`;

export const ContentContainer = styled.div`
    width: 100%;
    flex: 1;
    overflow-y: auto;
    padding: 0 2rem;
`;

// 헤더 배경
export const HeaderBackground = styled.img`
    
    width: 18.7rem;
    height: 4.156rem;
    object-fit: cover;
`;

// 헤더 텍스트
export const HeaderText = styled.div`
    position: absolute;
    right: 5.1rem;
    z-index: 1;
    color: white;
    ${({ theme }) => theme.fontStyles.Body2};
    word-wrap: break-word;
`;

export const BackIconWrapper = styled.div`
    position: absolute;
    left: 0.9rem;
    top: 1rem;
    z-index: 1;
    width: 2.2rem;
    height: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;
