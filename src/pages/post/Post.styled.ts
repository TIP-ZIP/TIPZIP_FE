import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

export const Container = styled.div`
    width: 100%;
    max-width: 375px;
    padding: 0rem 2rem;
    background-color: ${colors.TZ_Monochrome[0]};
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const StyledSubmitButton = styled.button`
    width: 100%;
    height: 4.4rem;
    border: none;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.TZ_Monochrome[300]};
    color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
    font-size: ${({ theme }) => theme.fontStyles.Body1};
    cursor: pointer;

    &:active {
        opacity: 0.8;
    }
`;

export const ButtonContainer = styled.div`
    position: sticky;
    bottom: 0;
    background-color: ${colors.TZ_Monochrome[0]};
    padding: 1.6rem 0;
`; 