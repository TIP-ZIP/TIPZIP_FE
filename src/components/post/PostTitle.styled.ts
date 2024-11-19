import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

export const TitleSection = styled.div`
    margin-bottom: 1.2rem;
`;

export const TitleLabel = styled.label`
    ${({ theme }) => theme.fontStyles.Body4};
    display: block;
    margin-bottom: 1rem;
    color: ${colors.TZ_Monochrome[1000]};
`;

export const TitleInput = styled.input`
    width: 100%;
    padding: 1.3rem 1.6rem;
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