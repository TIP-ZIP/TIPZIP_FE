// Spinner.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  border: 4px solid #f3f3f3; /* Light background */
  border-radius: 50%;
  border-top: 3px solid ${({ theme }) => theme.colors.TZ_Signature[500]};
  width: 40px;
  height: 40px;
  animation: ${spin} 1.5s linear infinite;
`;

const SpinnerBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Spinner: React.FC = () => {
  return (
    <SpinnerBackground>
      <SpinnerWrapper />
    </SpinnerBackground>
  );
};

export default Spinner;
