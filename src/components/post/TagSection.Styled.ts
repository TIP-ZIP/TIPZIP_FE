import styled from 'styled-components';

export const TagSectionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

export const TagLabel = styled.span`
    color: ${({ theme }) => theme.colors.TZ_Monochrome[900]};
    ${({ theme }) => theme.fontStyles.Caption2};
`;

export const TagHelperText = styled.span`
    color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
    ${({ theme }) => theme.fontStyles.Caption2};
    margin-left: 8px;
`;

export const ArrowIcon = styled.span`
    color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
`;
