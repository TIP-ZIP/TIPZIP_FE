import styled from 'styled-components';

export const Form = styled.form`
    padding: 0 22px;
`;

export const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

export const Label = styled.label`
    display: block;
    color: ${({ theme }) => theme.colors.TZ_Monochrome[900]};
    ${({ theme }) => theme.fontStyles.Caption2};
    margin-bottom: 0.5rem;
`;

export const Input = styled.input`
    width: 100%;
    height: 44px;
    background: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    border: none;
    padding: 0 1rem;
    ${({ theme }) => theme.fontStyles.Body2};

    &::placeholder {
        color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
    }

    &:focus {
        outline: none;
        background: ${({ theme }) => theme.colors.TZ_Signature[50]};
    }
`;

export const LabelWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const OptionalText = styled.span`
    color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
    ${({ theme }) => theme.fontStyles.Caption2};
    margin-left: 8px;
    margin-bottom: 0.5rem;
`;

export const SubmitButton = styled.button`
    width: 100%;
    height: 44px;
    background: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    border: none;
    color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
    ${({ theme }) => theme.fontStyles.Body1};
    cursor: pointer;
    margin: 1rem 0;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const MediaButtonsContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    margin-top: 0.5rem;
`;