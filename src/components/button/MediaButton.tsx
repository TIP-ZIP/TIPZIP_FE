import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 8px 12px;
    border: 0.6px solid ${({ theme }) => theme.colors.TZ_Monochrome[500]};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    background: none;
    color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
    font-size: 0.625rem;
    cursor: pointer;
`;


interface MediaButtonProps {
    icon: string;
    label: string;
    onClick: () => void;
}

const MediaButton: React.FC<MediaButtonProps> = ({ icon, label, onClick }) => {
    return (
        <Button onClick={onClick}>
        <span>{icon}</span>
        {label}
        </Button>
    );
};

export default MediaButton;
