import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    position: relative;
    background: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
    
    margin: 0 auto;
    overflow-x: hidden;
`;
