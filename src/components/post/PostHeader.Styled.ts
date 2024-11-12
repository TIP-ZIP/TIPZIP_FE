import styled from 'styled-components';

export const HeaderContainer = styled.header`
    width: 100%;
    height: 44px;
    padding: 14px 14px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(40px);
`;

export const Title = styled.h1`
    color: ${({ theme }) => theme.colors.TZ_Monochrome[900]};
    ${({ theme }) => theme.fontStyles.Body2};
    text-align: center;
`;

export const BackButton = styled.button`
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    cursor: pointer;
`;
