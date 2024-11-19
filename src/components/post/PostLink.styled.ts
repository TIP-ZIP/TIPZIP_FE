import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

export const LinkSection = styled.section`
    position: relative;
    margin-bottom: 2.5rem;
`;

export const LinkLabel = styled.label`  
    display: inline-block;
    ${({ theme }) => theme.fontStyles.Body4};
    color: ${colors.TZ_Monochrome[1000]};
    font-weight: 500;
    margin-bottom: 1.2rem;
`;

export const LinkHint = styled.span`
    position: absolute;
    top: 0.2rem;
    ${({ theme }) => theme.fontStyles.Caption7};
    color: ${colors.TZ_Monochrome[300]};
    margin-left: 0.8rem;
`;

export const LinkInput = styled.input`
    width: 100%;
    padding: 1.1rem 1.6rem;
    border: none;
    border-radius: 8px;
    background-color: ${colors.TZ_Monochrome[100]};
    ${({ theme }) => theme.fontStyles.Caption9};
    outline: none;
    
    &:focus {
        background-color: ${colors.TZ_Signature[50]};
    }

    &::placeholder {
        color: ${colors.TZ_Monochrome[300]};
    }
`; 