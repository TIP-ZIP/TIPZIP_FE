import styled from 'styled-components';

export const QuillWrapper = styled.div`
    .ql-container {
        height: 299px;
        background: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
        border-radius: ${({ theme }) => theme.borderRadius.medium};
        border: none;
        ${({ theme }) => theme.fontStyles.Body2};
    }

    .ql-toolbar {
        border: none;
        border-bottom: 1px solid ${({ theme }) => theme.colors.TZ_Monochrome[100]};
        background: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
        border-radius: ${({ theme }) => theme.borderRadius.medium};
    }

    .ql-editor {
        &::placeholder {
            color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
        }

        &:focus {
            background: ${({ theme }) => theme.colors.TZ_Signature[50]};
        }
    }
`;
